# Zal Interactive website

Next.js website with generated Unity package documentation.

## Development

Run `npm ci`, then `npm run dev`. Use `npm run build` for a production build and `npm start` to serve it.

## Update Unity documentation

Install [Quarto](https://quarto.org/docs/get-started/) (tested with 1.10.18), install this repository's npm dependencies, and keep the UnityPackages checkout beside this repository. Then run:

```sh
npm run docs:build
```

The command reads the current local files in `../UnityPackages/Assets/Documentation`. To use another checkout:

```sh
npm run docs:build -- --source /path/to/Assets/Documentation
```

Every `com.zalinteractive.*` directory with an `index.qmd` becomes a package. Nested `index.qmd` files become linked sample guides; underscore-prefixed QMD files are included by their parent documents. Titles come from YAML metadata. Adding a package or sample does not require editing the website.

The script stages copies in a temporary directory, renders HTML, validates local links/assets/anchors, and replaces `public/docs/` only after successful validation. This directory, including `manifest.json`, is generated and owned by the script: do not edit it manually or store unrelated files there. Regeneration removes obsolete pages. The original documentation is never modified.

Review and commit the changes in `public/docs/` together. The package listing reads the generated manifest. Production builds and Vercel deployments use the committed files and do not need Quarto or the source checkout. Regeneration does not pull repositories or deploy the website.

Rendering preserves source content and adds website navigation and sample links. Theme changes belong in `scripts/docs/theme.css`; regenerate after editing it. Unity `.meta` and Quarto source files are not published. No source fonts are redistributed; the documentation uses the system sans-serif fallback.

## Verification

```sh
npm run docs:test
npm run build
npx tsc --noEmit
```

The documentation tests require Quarto. They use temporary fixtures to check discovery, sample links containing spaces, stale-page removal, and preservation of published output after invalid input or rendering failure.
