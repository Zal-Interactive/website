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

Every `com.zalinteractive.*` directory with an `index.qmd` becomes a package. Directories without an `index.qmd` are treated as evidence-only folders and skipped. Nested `index.qmd` files become linked sample guides; underscore-prefixed QMD files are included by their parent documents. Titles come from YAML metadata. Adding a package or sample does not require editing the website.

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

## CI/CD documentation updates

The website repository includes `.github/workflows/rebuild-docs.yml`. It accepts a `unitypackages-docs-updated` `repository_dispatch` event, checks out the exact UnityPackages commit supplied in the payload, runs the documentation and website verification steps, and opens or updates a single PR for the generated `public/docs/` changes.

Add the following workflow to the UnityPackages repository as `.github/workflows/notify-website-docs.yml`:

```yaml
name: Notify website documentation build

on:
  push:
    branches: [master]
    paths:
      - Assets/Documentation/**
  workflow_dispatch:

permissions:
  contents: read

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Dispatch website documentation rebuild
        env:
          GH_TOKEN: ${{ secrets.WEBSITE_REPO_DISPATCH_TOKEN }}
          SOURCE_SHA: ${{ github.sha }}
        run: |
          payload=$(jq -n \
            --arg sha "$SOURCE_SHA" \
            '{event_type: "unitypackages-docs-updated", client_payload: {source_repository: "Zal-Interactive/UnityPackages", source_sha: $sha}}')
          printf '%s' "$payload" | gh api \
            --method POST \
            repos/Zal-Interactive/website/dispatches \
            --input -
```

Create `WEBSITE_REPO_DISPATCH_TOKEN` in UnityPackages as a fine-grained token limited to this website repository with `Contents: write` permission. If UnityPackages is private, also create a `UNITYPACKAGES_READ_TOKEN` secret in the website repository with read access to UnityPackages. If it is public, the website workflow can use its default workflow token for checkout.

In the website repository settings, allow GitHub Actions to create pull requests. Merge the generated PR to let the existing Vercel Git integration deploy the updated documentation.
