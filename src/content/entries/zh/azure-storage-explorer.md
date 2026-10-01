---
title: Azure Storage Explorer
type: Tool
tags: [azure, devtools]
date: 2026-07-12
summary: 当 Azure 门户响应较慢时，用桌面应用浏览 Blob、队列和表。
language: zh
translationKey: azure-storage-explorer
cover: ../images/storage-explorer-cover.png
coverAlt: Azure Storage Explorer 中的 Blob 容器列表
---

[Azure Storage Explorer](https://azure.microsoft.com/products/storage/storage-explorer/) 是 Microsoft 提供的免费桌面应用，可用于管理存储帐户，支持 Windows、macOS 和 Linux。

## 我的使用场景

- **浏览 Blob**，并一次性下载整个文件夹。
- 调试 Azure Function 时，查看队列消息。
- 无需编写脚本即可编辑表中的行。
- 使用 Azurite 模拟器进行本地开发，并通过与生产环境相同的界面操作。

## 使用技巧

1. 登录一次，然后固定常用的存储帐户。
2. 上传大型文件时，通过底部的活动面板查看进度。

> [!TIP]
> 右键单击容器并选择 **Get Shared Access Signature**，即可创建限时共享链接，而不必交出密钥。