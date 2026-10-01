# simonshenat2025.github.io

Simon Shen's personal site: a shelf of tools, ideas, apps and guides. It's a static [Astro](https://astro.build) site, deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml` on every push to `main`.

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start the dev server at `localhost:4321`    |
| `npm run build`   | Build the site to `./dist/`                 |
| `npm run preview` | Preview the build locally                   |
| `npm run check`   | Type-check `.astro` and `.ts` files         |

## Adding an entry

Each entry has an English Markdown file in `src/content/entries/` and a Simplified Chinese companion in `src/content/entries/zh/`. The English file name remains the canonical URL slug: `bruno.md` is served at `/entries/bruno/`, and its Chinese translation at `/zh/entries/bruno/`.

```md
---
title: Bruno
type: Tool                 # Guide | Tool | App | Idea
tags: [api, testing]
date: 2026-09-24
summary: One or two sentences, shown on the card and under the title.
cover: ./images/bruno.png  # optional; omit it for a solid colour card
coverAlt: Bruno showing a request collection   # describe the cover
status: In progress        # optional chip, e.g. for App entries
---
```

Entries are sorted newest first. The detail page builds its table of contents from the `##` headings when there are two or more.

### Bilingual entries

English entries omit `language` (it defaults to `en`). Each Chinese companion uses the same filename under `zh/`, sets `language: zh`, and sets `translationKey` to the English filename without `.md`. Keep `type`, `date`, and canonical English `tags` the same in both files; translate the title, summary, optional status, cover alt text, and body. This lets the language switch open the matching translation while preserving the canonical entry URL.

For example, `src/content/entries/bruno.md` pairs with `src/content/entries/zh/bruno.md`:

```yaml
language: zh
translationKey: bruno
```

The Chinese home page is `/zh/`. When a translated entry uses a shared image, reference it relative to its Markdown file, for example `../images/bruno-cover.png`.

### Markdown features

- **Callouts**: GitHub alert syntax. `> [!TIP]` and `> [!NOTE]` render as a blue "Tip"/"Note" box, `> [!WARNING]` as an amber "Warning" box. `[!IMPORTANT]` and `[!CAUTION]` also work.
- **Figures**: `![alt text](./images/shot.png "Caption")`. Put the image on its own line. The title becomes the caption, and clicking the image opens it in a lightbox.
- **Code blocks**: fenced blocks with a language (` ```bash `, ` ```python `, …) get a language label, a Copy button and syntax colours from the site theme.
- **External links** open in a new tab and get an "open in new" icon.

### Images

Covers and screenshots live in `src/content/entries/images/` and are optimised to WebP at build time. The images there now are **striped placeholders**: replace each one with a real screenshot under the same file name.

## How it's built

- `src/content.config.ts`: the `entries` collection schema.
- `src/pages/index.astro`: home page (intro, filters, card grid). Filtering runs in the browser and syncs to the URL, e.g. `/?type=Guide&tag=ai,python&q=astro`.
- `src/pages/entries/[id].astro` + `src/layouts/PostLayout.astro`: the entry detail page.
- `src/components/`: Header, Footer, Intro, FilterBar, EntryCard, Prose, Lightbox, PrevNext.
- `src/lib/markdown/`: Sätteri hast plugins (callouts, figures, external links, code block chrome) and a Shiki transformer. They are registered in `astro.config.mjs`.
- `src/styles/`: `site-tokens.css` (light/dark semantic tokens) and `ds/` (Stridyn design-system CSS and Roboto fonts), imported once by `global.css`.
- `docs/design-handoff.md`: the original design spec (per-breakpoint sizes, tokens, interactions, accessibility). Check it before changing the look.

Theme: the first visit follows the system setting. The header button switches between light and dark and saves the choice in `localStorage` (`ss-theme`).

The EN / 中文 switch only holds visual state for now. It fires a `site:langchange` event on `document` as a hook for adding translations later.
