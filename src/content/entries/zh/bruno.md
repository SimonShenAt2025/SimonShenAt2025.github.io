---
title: Bruno
type: Tool
tags: [api, testing, devtools]
date: 2026-09-24
summary: 一款离线、适合纳入 Git 管理的 API 客户端；请求集合以普通文件形式保存在代码旁。
language: zh
translationKey: bruno
---

[Bruno](https://www.usebruno.com/) 是一款开源 API 客户端，与 Postman 和 Insomnia 属于同一类工具。它在本地运行，不需要云端帐户，并将每个请求保存为纯文本 `.bru` 文件。

## 我选择它的原因

- **请求集合保存在代码仓库中。** 请求可以和 API 变更一起在同一个 pull request 里审查。
- **无需登录。** 它可以离线工作，也不会把数据同步到其他服务器。
- **环境配置也是文件。** 密钥可以放在请求集合旁、并加入 Git 忽略规则的 `.env` 文件中。

## 开始使用

1. 从官方网站或使用你的包管理器安装。
2. 在项目文件夹中创建一个集合。
3. 将 `.bru` 文件与它们测试的代码一起提交。

> [!TIP]
> 将新集合指向仓库中已有的文件夹，让 API 测试和对应服务代码放在一起。