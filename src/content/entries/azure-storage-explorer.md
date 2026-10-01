---
title: Azure Storage Explorer
type: Tool
tags: [azure, devtools]
date: 2026-07-12
summary: A desktop app for browsing blobs, queues and tables when the portal feels slow.
cover: ./images/storage-explorer-cover.png
coverAlt: Azure Storage Explorer listing blob containers
---

[Azure Storage Explorer](https://azure.microsoft.com/products/storage/storage-explorer/) is Microsoft's free desktop app for working with storage accounts. It runs on Windows, macOS and Linux.

## What I use it for

- **Browsing blobs** and downloading a whole folder in one go.
- **Peeking at queue messages** while debugging an Azure Function.
- **Editing table rows** without writing a script.
- **Local development** against the Azurite emulator, using the same UI as production.

## Tips

1. Sign in once, then pin the storage accounts you use most.
2. Use the activity panel at the bottom to watch the progress of big uploads.

> [!TIP]
> Right-click a container and choose **Get Shared Access Signature** to share a time-limited link without handing out keys.
