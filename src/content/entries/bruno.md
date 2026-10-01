---
title: Bruno
type: Tool
tags: [api, testing, devtools]
date: 2026-09-24
summary: An offline, Git-friendly API client. Collections are plain files that live next to your code.
---

[Bruno](https://www.usebruno.com/) is an open-source API client in the same space as Postman and Insomnia. It runs locally and keeps no cloud account, and it stores each request as a plain-text `.bru` file.

## Why I keep it

- **Collections live in the repo.** Requests are reviewed in the same pull request as the API change.
- **No sign-in.** It works offline and nothing syncs to someone else's server.
- **Environments are files too.** Secrets stay in a git-ignored `.env` next to the collection.

## Getting started

1. Install it from the website or with your package manager.
2. Create a collection inside your project folder.
3. Commit the `.bru` files alongside the code they test.

> [!TIP]
> Point a new collection at an existing folder in your repo so the API tests sit next to the service they call.
