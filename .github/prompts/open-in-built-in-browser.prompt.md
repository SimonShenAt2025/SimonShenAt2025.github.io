---
name: Open in Built-in Browser
description: Start this Astro site locally if needed and open it in VS Code's integrated browser.
argument-hint: "[URL or route, optional]"
agent: agent
---

Open this workspace's local site in the VS Code integrated browser.

- Use a URL or route supplied by the user when present. Otherwise, use `http://localhost:4321/` for this Astro project.
- From the workspace root, run `npm run dev -- --background`. Astro reuses the existing server if one is already running; do not start a second server by another method.
- After the server is ready, use `#tool:open_browser_page` to open the requested URL. Reuse an existing browser page for the same site when available.
- Do not use an external browser or change application files.
- If the server fails to start or the page cannot be opened, report the command and the error instead of claiming success.