## Project

Simon Shen's personal site (https://simonshenat2025.github.io): a "shelf" of entries, each one a Markdown file in `src/content/entries/` typed Guide, Tool, App or Idea. It is a static Astro 7 site with no backend, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

- `README.md`: how to add entries, supported Markdown features, project structure.
- `docs/design-handoff.md`: the original design spec. Follow it for any visual or interaction change (colours, spacing, breakpoints, accessibility).
- Styling uses the Stridyn design-system CSS in `src/styles/ds/` plus semantic light/dark tokens in `src/styles/site-tokens.css`; use those tokens rather than raw colours.
- Markdown runs through Sätteri (Astro 7's default), not remark/rehype. Custom transforms are hast plugins in `src/lib/markdown/plugins.ts`.
- The EN / 中文 switch navigates between localized routes. Every entry has an English Markdown source and a paired Simplified Chinese translation under `src/content/entries/zh/`.
- Images in `src/content/entries/images/` and the entries other than `learn-from-youtube-transcripts.md` are placeholders.
- Run `npm run check` and `npm run build` before calling a change done.
- `.github/copilot-instructions.md` carries the same background for VS Code Copilot; keep the two in sync.

## Language

- Chat replies: Simplified Chinese, keeping English technical terms as-is.
- Code, comments, docs, commit messages, PR text, file and branch names are English. Chinese entry translations are written in Simplified Chinese under `src/content/entries/zh/`.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
