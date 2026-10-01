---
title: Deploy an Astro site to GitHub Pages
type: Guide
tags: [astro, github, typescript]
date: 2026-07-27
summary: Build a static Astro site and publish it with a GitHub Actions workflow. No server required.
---

Astro builds to plain HTML, CSS and JavaScript, which is exactly what GitHub Pages serves. This guide sets up a workflow that rebuilds and publishes the site on every push to `main`.

## 1. Set the site URL

In `astro.config.mjs`, set `site` to your Pages URL. If the repository is not named `<user>.github.io`, also set `base` to the repository name.

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<user>.github.io',
});
```

## 2. Add the workflow

Create `.github/workflows/deploy.yml`. The official [withastro/action](https://github.com/withastro/action) installs dependencies, builds the site and uploads the result.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: withastro/action@v6

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

## 3. Turn on Pages

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` and watch the workflow run in the **Actions** tab.

> [!WARNING]
> If you set `base`, internal links must include it. Use `import.meta.env.BASE_URL` instead of hard-coding `/`.
