import { cp, mkdir, mkdtemp, open, readFile, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { parse, stringify } from "yaml";
import { load } from "cheerio";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const prefix = "com.zalinteractive.";
const encodePath = (value) => value.split("/").map(encodeURIComponent).join("/");
const exists = async (file) => stat(file).then(() => true, () => false);

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.sort((a, b) => a.name.localeCompare(b.name, "en")).map(async (entry) => {
    if (entry.name.startsWith(".") || entry.name.endsWith(".meta")) return [];
    const file = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Symbolic links are not supported: ${file}`);
    return entry.isDirectory() ? filesIn(file) : [file];
  }));
  return files.flat();
}

async function assertNoLfsPointers(directory) {
  for (const file of await filesIn(directory)) {
    if (!/\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(file)) continue;
    const handle = await open(file, "r");
    try {
      const prefix = Buffer.alloc(200);
      const { bytesRead } = await handle.read(prefix, 0, prefix.length, 0);
      if (prefix.subarray(0, bytesRead).toString("utf8").startsWith("version https://git-lfs.github.com/spec/v1\n")) {
        throw new Error(`Git LFS image was not downloaded: ${file}`);
      }
    } finally { await handle.close(); }
  }
}

async function titleOf(file) {
  const source = await readFile(file, "utf8");
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontmatter) throw new Error(`Missing Quarto metadata: ${file}`);
  const metadata = parse(frontmatter[1]);
  if (typeof metadata?.title !== "string" || !metadata.title.trim()) throw new Error(`Missing title: ${file}`);
  return metadata.title.trim();
}

export async function discoverPackages(source) {
  if (!(await exists(source))) throw new Error(`Documentation source not found: ${source}. Use --source <directory>.`);
  const packages = [];
  for (const directory of await readdir(source, { withFileTypes: true })) {
    if (!directory.isDirectory() || !directory.name.startsWith(prefix)) continue;
    const id = directory.name;
    const slug = id.slice(prefix.length);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid package directory: ${id}`);
    const packageRoot = path.join(source, id);
    const entry = path.join(packageRoot, "index.qmd");
    // Documentation folders can also contain evidence-only assets. Publish only
    // packages that expose a Quarto entrypoint; the remaining folders are not
    // documentation pages and should not make a docs refresh fail.
    if (!(await exists(entry))) continue;
    const samples = [];
    for (const file of await filesIn(packageRoot)) {
      if (path.basename(file) !== "index.qmd" || file === entry) continue;
      const relative = path.relative(packageRoot, file).split(path.sep).join("/");
      samples.push({ title: await titleOf(file), url: `/docs/${slug}/${encodePath(relative.replace(/\.qmd$/, ".html"))}`, input: `${id}/${relative}` });
    }
    packages.push({ id, slug, title: await titleOf(entry), url: `/docs/${slug}/index.html`, samples });
  }
  if (!packages.length) throw new Error(`No package documentation found in ${source}`);
  return packages.sort((a, b) => a.title.localeCompare(b.title, "en"));
}

function runQuarto(args) {
  const result = spawnSync("quarto", args, { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  if (result.error?.code === "ENOENT") throw new Error("Quarto is not installed. Install Quarto and retry npm run docs:build.");
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Quarto failed (${result.signal || result.status}):\n${result.stderr || result.stdout}`);
}

const siteHeader = `<header class="site-header"><div class="site-header-inner"><a class="site-brand" href="/" aria-label="Zal Interactive home"><img src="/zal-mark.png" alt="" width="32" height="32">Zal Interactive</a><nav aria-label="Main navigation"><a href="/unity-packages">Unity Packages</a><a href="mailto:hello@zalinteractive.com">Contact</a></nav></div></header>`;

function publicPath(value, packages) {
  for (const pkg of packages) {
    if (value.startsWith(`/${pkg.id}/`)) return `/${pkg.slug}/${value.slice(pkg.id.length + 2)}`;
  }
  return value;
}

async function decorate(output, packages) {
  for (const file of await filesIn(output)) {
    if (!file.endsWith(".html")) continue;
    const relative = path.relative(output, file).split(path.sep).join("/");
    const $ = load(await readFile(file, "utf8"));
    // Resolve Quarto's relative links before moving package directories to their public slugs.
    $("[href], [src]").each((_, element) => {
      for (const attribute of ["href", "src"]) {
        const value = $(element).attr(attribute);
        if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) continue;
        const url = new URL(value, `https://docs.invalid/${encodePath(relative)}`);
        const destination = publicPath(decodeURIComponent(url.pathname), packages).replace(/\.qmd$/, ".html");
        $(element).attr(attribute, `/docs${encodePath(destination)}${url.search}${url.hash}`);
      }
    });
    $("body").prepend(siteHeader);
    $("head").append('<link rel="icon" href="/zal-mark.png">');
    const pkg = packages.find((candidate) => relative.startsWith(`${candidate.id}/`));
    if (pkg) {
      const navigation = $('<nav class="package-navigation" aria-label="Breadcrumb"></nav>');
      navigation.append($('<a href="/unity-packages">Unity Packages</a>'));
      navigation.append(" / ");
      if (relative === `${pkg.id}/index.html`) navigation.append($("<span></span>").text(pkg.title));
      else navigation.append($("<a></a>").attr("href", pkg.url).text(pkg.title));
      $("main").prepend(navigation);
      if (relative === `${pkg.id}/index.html` && pkg.samples.length) {
        const section = $('<section class="sample-guides" aria-label="Sample guides"><h2>Sample guides</h2><ul></ul></section>');
        for (const sample of pkg.samples) section.find("ul").append($("<li></li>").append($("<a></a>").attr("href", sample.url).text(sample.title)));
        $("main").append(section);
      }
    }
    await writeFile(file, $.html());
  }
  for (const pkg of packages) await rename(path.join(output, pkg.id), path.join(output, pkg.slug));
}

export async function validateOutput(output) {
  const files = await filesIn(output);
  const ids = new Map();
  const references = [];
  for (const file of files) {
    if (file.endsWith(".qmd") || file.endsWith(".meta")) throw new Error(`Source file in published output: ${file}`);
    const relative = path.relative(output, file).split(path.sep).join("/");
    if (file.endsWith(".html")) {
      const $ = load(await readFile(file, "utf8"));
      ids.set(relative, new Set($("[id]").map((_, node) => $(node).attr("id")).get()));
      $("[href], [src]").each((_, node) => {
        for (const attr of ["href", "src"]) if ($(node).attr(attr)) references.push({ relative, value: $(node).attr(attr) });
      });
    } else if (file.endsWith(".css")) {
      for (const match of (await readFile(file, "utf8")).matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) references.push({ relative, value: match[1].trim() });
    }
  }
  for (const { relative, value } of references) {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) continue;
    const url = new URL(value, `https://docs.invalid/docs/${encodePath(relative)}`);
    const pathname = decodeURIComponent(url.pathname);
    if (["/", "/unity-packages", "/zal-mark.png"].includes(pathname)) continue;
    if (!pathname.startsWith("/docs/")) throw new Error(`Unexpected local reference in ${relative}: ${value}`);
    let target = pathname.slice("/docs/".length);
    if (target.endsWith("/")) target += "index.html";
    if (!(await exists(path.join(output, target)))) throw new Error(`Broken local reference in ${relative}: ${value}`);
    if (url.hash && ids.has(target) && !ids.get(target).has(decodeURIComponent(url.hash.slice(1)))) throw new Error(`Broken anchor in ${relative}: ${value}`);
  }
}

// The manifest lives inside the owned directory, so pages and navigation are replaced together.
async function publish(output, destination) {
  await mkdir(path.dirname(destination), { recursive: true });
  const transaction = await mkdtemp(path.join(path.dirname(destination), ".docs-build-"));
  const next = path.join(transaction, "next");
  const previous = path.join(transaction, "previous");
  let backedUp = false;
  try {
    await cp(output, next, { recursive: true });
    if (await exists(destination)) { await rename(destination, previous); backedUp = true; }
    try { await rename(next, destination); }
    catch (error) { if (backedUp) await rename(previous, destination); throw error; }
  } finally { await rm(transaction, { recursive: true, force: true }); }
}

export async function buildDocumentation({ source = path.resolve(root, "../UnityPackages/Assets/Documentation"), destination = path.join(root, "public/docs") } = {}) {
  const packages = await discoverPackages(source);
  await assertNoLfsPointers(source);
  runQuarto(["--version"]);
  const staging = await mkdtemp(path.join(tmpdir(), "zal-docs-"));
  try {
    for (const pkg of packages) await cp(path.join(source, pkg.id), path.join(staging, pkg.id), { recursive: true, filter: (file) => !path.basename(file).startsWith(".") && !file.endsWith(".meta") });
    await cp(path.join(root, "scripts/docs/theme.css"), path.join(staging, "theme.css"));
    const render = packages.flatMap((pkg) => [`${pkg.id}/index.qmd`, ...pkg.samples.map((sample) => sample.input)]);
    await writeFile(path.join(staging, "_quarto.yml"), stringify({ project: { type: "default", "output-dir": "_site", "lib-dir": "site_libs", render }, format: { html: { theme: "darkly", css: "theme.css", toc: false, "format-links": false, "anchor-sections": true, "code-copy": true, "highlight-style": "github-dark" } }, execute: { enabled: false } }));
    console.log(`Rendering ${packages.length} packages and ${render.length - packages.length} sample guides…`);
    runQuarto(["render", staging, "--to", "html", "--no-execute"]);
    const output = path.join(staging, "_site");
    await decorate(output, packages);
    await validateOutput(output);
    const manifest = { packages: packages.map(({ samples, ...pkg }) => ({ ...pkg, samples: samples.map(({ title, url }) => ({ title, url })) })) };
    await writeFile(path.join(output, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
    await publish(output, destination);
    console.log(`Published ${render.length} documentation pages to ${destination}`);
    return manifest;
  } finally { await rm(staging, { recursive: true, force: true }); }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 2 || args[0] !== "--source")) {
    console.error("Usage: npm run docs:build -- [--source <directory>]");
    process.exitCode = 1;
  } else {
    try { await buildDocumentation(args.length ? { source: path.resolve(args[1]) } : {}); }
    catch (error) { console.error(`Documentation build failed: ${error.message}`); process.exitCode = 1; }
  }
}
