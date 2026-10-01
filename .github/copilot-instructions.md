# Project

Simon Shen's personal site (https://simonshenat2025.github.io): a "shelf" of entries, each one a Markdown file in `src/content/entries/` typed Guide, Tool, App or Idea. It is a static Astro 7 site with no backend, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

- `README.md`: how to add entries, supported Markdown features, project structure.
- `docs/design-handoff.md`: the original design spec. Follow it for any visual or interaction change (colours, spacing, breakpoints, accessibility).
- Styling uses the Stridyn design-system CSS in `src/styles/ds/` plus semantic light/dark tokens in `src/styles/site-tokens.css`; use those tokens rather than raw colours.
- Markdown runs through Sätteri (Astro 7's default), not remark/rehype. Custom transforms are hast plugins in `src/lib/markdown/plugins.ts`.
- Client-side behaviour is vanilla `<script>` inside `.astro` components; there is no UI framework.
- The EN / 中文 switch navigates between localized routes. Every entry has an English Markdown source and a paired Simplified Chinese translation under `src/content/entries/zh/`.
- Images in `src/content/entries/images/` and the entries other than `learn-from-youtube-transcripts.md` are placeholders.

# Language

- Chat replies: Simplified Chinese, keeping English technical terms as-is.
- Code, comments, docs, commit messages, PR text, file and branch names are English. Chinese entry translations are written in Simplified Chinese under `src/content/entries/zh/`.

# Development

- Dev server: `astro dev --background` (manage with `astro dev stop`, `astro dev status`, `astro dev logs`).
- Run `npm run check` and `npm run build` before calling a change done.
- Astro docs: https://docs.astro.build

Keep this file in sync with `CLAUDE.md`.
