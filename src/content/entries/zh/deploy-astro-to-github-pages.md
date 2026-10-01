---
title: 将 Astro 网站部署到 GitHub Pages
type: Guide
tags: [astro, github, typescript]
date: 2026-07-27
summary: 使用 GitHub Actions 构建静态 Astro 网站并发布到 GitHub Pages，无需服务器。
language: zh
translationKey: deploy-astro-to-github-pages
---

Astro 会将网站构建为纯 HTML、CSS 和 JavaScript，正好适合由 GitHub Pages 托管。本指南会设置一个工作流，在每次推送到 `main` 分支时重新构建并发布网站。

## 1. 设置网站 URL

在 `astro.config.mjs` 中将 `site` 设置为 GitHub Pages 的网址。如果仓库名称不是 `<user>.github.io`，还要将 `base` 设置为仓库名称。

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<user>.github.io',
});
```

## 2. 添加工作流

创建 `.github/workflows/deploy.yml`。[官方 `withastro/action`](https://github.com/withastro/action) 会安装依赖、构建网站并上传构建结果。

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

## 3. 启用 Pages

1. 打开仓库的 **Settings → Pages**。
2. 在 **Build and deployment** 下，将 **Source** 设置为 **GitHub Actions**。
3. 推送到 `main`，并在 **Actions** 标签页查看工作流运行情况。

> [!WARNING]
> 如果设置了 `base`，站内链接也必须包含它。使用 `import.meta.env.BASE_URL`，不要将 `/` 硬编码为路径前缀。