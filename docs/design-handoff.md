> **Archived design handoff.** This is the original spec the site was built from, kept as the reference for colours, spacing, breakpoints and behaviour. The prototype files it mentions (`design/*.dc.html`, `support.js`) were not brought into the repo. Their equivalents are:
> - `site-tokens.css` → `src/styles/site-tokens.css`
> - `ds/` → `src/styles/ds/` (only the stylesheets the site uses)
> - `content-sample/` → `src/content/entries/learn-from-youtube-transcripts.md`
> - icon paths → `src/lib/icons.ts`
>
> Where the build differs from this spec (e.g. Sätteri plugins instead of remark/rehype, the `coverAlt` field), the repo README is the current source of truth.

# Handoff: Simon Shen personal site ("Shelf" design)

## Overview
A personal "collection + learning notes" site for Simon Shen, a software developer in Auckland, New Zealand (TypeScript, Azure). Two page types:
- **Home**: short intro, filter and search bar, card grid of entries.
- **Entry detail**: one Markdown file rendered as a long-form reading page.

Entry types: **Guide**, **Tool**, **App**, **Idea**. The original prototype specified English-only UI and a visual-only EN / 中文 switch. The current implementation supports localized routes and paired Simplified Chinese Markdown entries; see the README for the current content convention.

Target stack: **Astro** static site, deployed to **GitHub Pages**, no backend. Each entry is a Markdown file with frontmatter.

## About the design files
The files in `design/` are **design references built in HTML**: prototypes that show the intended look and behaviour. They are not production code to copy. Rebuild them as Astro components (`.astro` + scoped CSS, with small client scripts where noted), following the component breakdown below. Open `design/Design Directions.dc.html` in a browser to see every screen side by side. `design/SiteShelf.dc.html` opens on its own as an interactive prototype.

The `.dc.html` files use a small runtime (`support.js`) with `{{ }}` template holes and inline styles. Read them for values, not for structure.

## Fidelity
**High fidelity.** Colours, type, spacing, radii and interactions are final. Recreate them exactly. The only placeholders are the striped boxes that stand for cover images and screenshots.

## Tech recommendations
- Astro **content collections** for entries (`src/content/entries/*.md`), with a zod schema (see *Data model*).
- Code highlighting: Astro's built-in **Shiki** with the `css-variables` theme, mapped to the `--site-code-*` tokens (see *Code blocks*).
- Callouts: GitHub-style alert syntax (`> [!TIP]`, `> [!WARNING]`) turned into the callout markup by a small remark/rehype plugin (e.g. `rehype-github-alerts` or a custom one).
- Figures: `![alt](src "caption")`. A rehype plugin wraps each image in `<figure>` + `<figcaption>`, and the lightbox script enhances it.
- Client JS (vanilla `<script>` in the component, no framework needed): home filtering/search, copy button, lightbox, theme toggle, TOC smooth scroll.

## Component breakdown (→ Astro components)
| Component | Used on | Notes |
|---|---|---|
| `BaseLayout.astro` | all | `<html data-theme>`, head, fonts, `site-tokens.css`, theme bootstrap script (see *Theme*) |
| `Header.astro` | all | wordmark, language switch, theme toggle |
| `Intro.astro` | home | dark hero band |
| `FilterBar.astro` | home | type toggle group, search field, tag chips, result count |
| `EntryCard.astro` | home | cover and no-cover variants, `featured` (2-column) variant |
| `EmptyState` (inline in home) | home | no-match message + Clear filters |
| `PostLayout.astro` | detail | tinted hero, cover, TOC box, prose, prev/next |
| `Prose.astro` (+ global prose CSS) | detail | styles native Markdown output |
| `CodeBlock` (Shiki wrapper / rehype transform) | detail | language label + copy button |
| `Callout.astro` | detail | tip / warning (Stridyn Alert look) |
| `Figure` + lightbox script | detail | caption, click to enlarge |
| `PrevNext.astro` | detail | two tinted tiles |
| `Footer.astro` | all | dark band |

## Data model
`src/content/config.ts`:
```ts
const entries = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    type: z.enum(['Tool', 'Idea', 'App', 'Guide']),
    tags: z.array(z.string()),
    date: z.coerce.date(),
    summary: z.string(),
    cover: image().optional(),          // or z.string() if covers live in /public
    status: z.string().optional(),       // e.g. "In progress" (App entries)
  }),
});
```
Sort entries by `date` descending everywhere. On the detail page, **Previous** = the next-older entry and **Next** = the next-newer entry. The TOC is built from the page's `h2` headings (`getHeadings()` with depth 2). A sample entry is in `content-sample/learn-from-youtube-transcripts.md`.

Date display format: `10 Sep 2026` (day, short month, year; `en-NZ`). Use `<time datetime="2026-09-10">`.

## Breakpoints
Mobile-first, three tiers. The prototype switches at **600px** and **1024px**; use media queries:
- **mobile**: `< 600px` (designed at 390)
- **tablet**: `600–1023px` (designed at 834)
- **desktop**: `≥ 1024px` (designed at 1280). Content max-width **1200px**, centred.

Values per tier (mobile / tablet / desktop):
| Token | Mobile | Tablet | Desktop |
|---|---|---|---|
| page side padding | 20px | 32px | 40px |
| header height | 56px | 64px | 64px |
| theme button size | 44px | 36px | 36px |
| hero padding (home) | 32 20 40 | 40 32 56 | 48 40 64 |
| h1 (condensed 700) | 28/34 | 36/44 | 36/44 |
| intro lead | 17/26 | 18/28 | 18/28 |
| main padding (home) | 24 20 56 | 28 32 72 | 32 40 80 |
| gap below filters | 20px | 24px | 28px |
| filter row | column, search full width (44px tall) | row, search 240px at right | row, search 280px at right |
| type toggle size | lg (40px buttons) | md (32px) | md (32px) |
| tag chips | one scrolling row, edge-to-edge, `lg` chips (32px) + 6px vertical hit padding | wrap, `sm` chips | wrap, `sm` chips |
| card grid | 1 column | 2 columns | 4 columns |
| grid gap | 16px | 20px | 20px |
| featured card | normal (no span) | spans 2 columns | spans 2 columns |
| no-cover icon | 48px | 56px | 56px |
| detail hero padding | 16 20 80 | 24 32 120 | 28 40 148 |
| detail header align | left | centre | centre |
| detail lead | 18/27 | 20/30 | 20/30 |
| cover overlap (negative top margin) | -56px | -88px | -108px |
| cover aspect / radius | 16:10 / 12px | 16:8 / 16px | 16:8 / 16px |
| article top margin | 32px | 40px | 48px |
| TOC box | 1 column, rows 44px min | 2 columns, rows 32px | 2 columns, rows 32px |
| prev/next | stacked, both left-aligned | 2 columns, Next right-aligned | 2 columns, Next right-aligned |
| prev/next tile padding / title | 20px / 22px | 24px / 24px | 28px / 24px |
| footer | stacked | row, space-between | row, space-between |

Prose body text stays **18/30** on all tiers. The article column is **max-width 680px**, centred.

## Screens

### Header (all pages)
- Full width, background `--site-inverse`. Inner row: max 1200px, height per tier, `space-between`.
- Left: wordmark "SIMON SHEN": Roboto Condensed 700, 20/24, letter-spacing 1px, uppercase, `--site-on-inverse`. Links to home.
- Right (gap 12px): **language switch** = Stridyn ToggleButton group, rounded, color-secondary, size `xs` (mobile `sm`), options `EN` / `中文` (`lang="en"` / `lang="zh"`, `aria-pressed`). Then the **theme toggle**: circular icon button, 1px border `rgb(255 255 255 / 30%)`, transparent fill, hover fill `rgb(255 255 255 / 12%)`, 20px icon in `--site-on-inverse`. It shows a moon in light mode and a sun in dark mode. `aria-label` is "Switch to dark mode" / "Switch to light mode", with `aria-pressed` = isDark.

### Home: Intro hero
- Same background as the header (continuous dark band).
- `h1`: "I'm Simon Shen, a software developer in Auckland, New Zealand." Roboto Condensed 700, max-width 780px, `text-wrap: balance`, colour `--site-on-inverse`, margin-bottom 16px.
- `p`: "I work mostly with TypeScript and Azure, and this is where I keep the tools, ideas, apps and guides worth remembering." Max-width 640px, colour `--site-on-inverse-2`.

### Home: FilterBar
Vertical stack, gap 12px:
1. Row: **type filter** = Stridyn ToggleButton group, rounded, color-secondary. Options `All · Guide · Tool · App · Idea`. Each button has a 10px dot in the type colour (with a 2px `--site-surface` ring), the label, and the count (12px, weight 400), gap 8px. Selected = filled `--tb-main` (grey-900 in light, grey-50 in dark) with inverted text. On mobile the group sits in a horizontally scrolling strip that bleeds to the screen edges (negative side margin = page padding, scrollbar hidden).
   **Search**: Stridyn TextField, rounded (pill), search icon adornment, placeholder "Search by title" (canonical placeholder: `#8a8a85`, italic), `aria-label="Search by title"`. Focus: border grey-900 plus 1px inset ring.
2. **Tag chips**: one button per tag (sorted A–Z) wrapping a Stridyn Chip (`ds-chip sm`, 13px text). Unselected = default grey chip. Selected = `secondary` (grey-900 fill, white text). `aria-pressed`. A **Clear filters** text button (`btn btn-text btn-xs`) appears when any filter is active.
3. Result count: "6 entries" / "1 entry", 14/20, `--site-text-3`, `aria-live="polite"`.

### Home: Card grid (EntryCard)
Grid `repeat(N, minmax(0,1fr))`, `grid-auto-flow: dense`. The **first card of the current result set is featured** (spans 2 columns on tablet/desktop, cover aspect 16:8, title 32px).

The card is a single `<a>`: radius 16px, `overflow: hidden`, column flex. Hover: `translateY(-3px)` + `--elevation-8`, 150ms ease.
- **With cover**: background `--site-surface`, 1px `--site-border`. Image on top, aspect **16:10** (featured 16:8), 1px bottom border.
- **Without cover**: the whole card is filled with the type tint (`--site-tint-<type>`), no border. Top-left: the type icon at 48/56px in the type colour (padding 24 24 0). The title is larger (26px instead of 22px). This is the designed no-image state.
- Body (padding 20 24 24, gap 8):
  - Meta row: type label (8px dot + Roboto Condensed 700, 13/16, letter-spacing 1px, uppercase); optional status chip (`ds-chip xs outlined warning`, e.g. "In progress"); date pushed right (12/16, `--site-text-3`).
  - Title `h2`: Roboto Condensed 700, line-height 1.2, `text-wrap: balance`, 22px (cover) / 26px (no cover) / 32px (featured). `margin-top: auto` plus 12px padding-top (8px mobile), so titles bottom-align.
  - Summary: 14/20, `--site-text-2`.
  - Tags: `<ul>` of `#tag`, 12/16, `--site-text-3`, gap 4px 10px.

### Home: Empty state
Centred, 64px vertical padding: "No entries match" (18/24, 500), "Try a different search or remove a filter." (14/20), then an outlined rounded small button "Clear filters".

### Detail: Hero
- Full-width band in the entry's type tint (`--site-tint-guide` for a Guide).
- "All entries" back link (Stridyn TextLink, md, grey, 18px back arrow, gap 6px; 44px tall on mobile).
- Header block, max-width 800, centred (left-aligned on mobile), gap 14px:
  - Eyebrow: type icon (20px, type colour) + type name (Roboto Condensed 700, 14/16, letter-spacing 1px, uppercase) + "·" (`--site-text-3`) + date (Roboto 400, `--site-text-2`).
  - `h1`: Roboto Condensed 700, sizes per tier, `text-wrap: balance`.
  - Summary lead: max-width 640, `--site-text-2`.
  - Tags: `ds-chip sm` with `--site-surface` background, text `#tag`.

### Detail: Cover
Max-width 960, centred, pulled up into the hero with a negative top margin (per tier), radius per tier, `--elevation-8`. Optional. If there is no cover, drop it and remove the hero's extra bottom padding.

### Detail: "In this guide" TOC box
Max-width 680 column. 1px `--site-border`, radius 12px, padding 20 24 (mobile 16 16 8), margin-bottom 40px.
- Label "IN THIS GUIDE": Roboto Condensed 700, 13/16, letter-spacing 1px, uppercase, `--site-text-3`, margin-bottom 10px.
- `<ol>` grid (2 columns, or 1 on mobile), column gap 24px. Each item is a link: 24px circle (type tint fill, 12px/600 number) + h2 text, 15/20, gap 10px. Hover colour `--site-link`. Click scrolls smoothly to the heading (headings have `scroll-margin-top: 24px`).

### Detail: Prose (Markdown body)
Root: Roboto 18px / 30px, `--site-text`, `text-wrap: pretty`.
- `p`: margin 0 0 16px (the first paragraph uses 20px).
- `h2`: 24/32, 600. margin 48px 0 12px, padding-top 32px, **border-top 1px dashed `--site-border`**, `scroll-margin-top: 24px`. In the guide the numbers are part of the heading text ("1. Install Python").
- `h3`: 18/24, 600, margin 28px 0 4px.
- `ol` (steps): no native markers. Each `li` is flex, gap 14px, with a **28px circle** (fill `--color-secondary-main` #1379ce, white 14px/600 number, line-height 28px, margin-top 1px). Gap between items 12px. Implement with CSS counters (`li::before { content: counter(step) }`).
- `ul`: native discs, padding-left 24px, item gap 10px. `strong` is weight 600.
- Inline `code`: monospace stack `Menlo, Consolas, "SF Mono", "Cascadia Code", "Roboto Mono", monospace`, 15px, padding 2px 6px, radius 4px, background `--site-subtle`, 1px `--site-border`.
- External links: `--site-link`, underline (1px, offset 3px), trailing 14px "open in new" icon, `target="_blank" rel="noopener"`, plus a visually hidden "(opens in a new tab)". Hover colour `--site-text`.
- Callouts (Stridyn Alert, inline, outlined): `.ds-alert.info` with title "Tip", and `.ds-alert.warning` with title "Warning". Radius 10px, padding 12px, 1px status border, light status background, 24px status icon (CSS mask). Title 16/22 500. Description **15/22** in prose. Margin 24px 0. `role="note"`.
- Figures: `<figure>` margin 28px 0 32px. The image sits inside a `<button>` (full width, 1px `--site-border`, radius 8px, `cursor: zoom-in`) with a 32px white circular zoom badge at the top-right (12px inset, `--elevation-4`). `figcaption`: 14/20, `--site-text-3`, margin-top 10px. The button `aria-label` is "Enlarge screenshot: {alt}".
- **Lightbox**: fixed full-screen `role="dialog" aria-modal="true"`, background `rgb(31 31 31 / 90%)`, padding 56px. The image is up to 1100px wide, radius 8px, with the caption below in white 16/24. Close button: 40px white circle at top-right (20px inset), "Close enlarged screenshot". Closes on backdrop click, the close button or **Esc**. Return focus to the figure button on close.

### Detail: Code block
- Wrapper: margin 24px 0, 1px `--site-border`, radius 8px, background `--site-code-bg`, overflow hidden.
- Header bar: background `--site-surface`, bottom border `--site-border`, padding 6px 8px 6px 16px.
  - Left: language label, monospace 12/16, lowercase, `--site-text-3` (bash, python, powershell, text).
  - Right: **Copy** button: 28px tall, padding 0 10px, radius 6px, 13px/500, 14px copy icon, `--site-text-2`, hover `rgba(0,0,0,.05)`. On click it copies the raw code, then shows a check icon and "Copied" in `--site-code-str` for 2s. The label sits in an `aria-live="polite"` span. `aria-label` is "Copy {lang} code".
- Code: monospace 14px / 22px, padding 16px 20px, `white-space: pre`, horizontal scroll.
- Syntax colours via the Shiki `css-variables` theme: map `--shiki-token-keyword` → `--site-code-kw`, `--shiki-token-string*` → `--site-code-str`, `--shiki-token-comment` → `--site-code-com`, `--shiki-token-constant` (numbers) → `--site-code-num`, `--shiki-foreground` → `--site-text`. In bash, command names (python, pip, source, mkdir, cd) use the keyword colour.

### Detail: Prev / Next
Max-width 960, centred, 2 columns (stacked on mobile), gap per tier. Each tile is an `<a>`: radius 16px, background = that entry's type tint, hover `--elevation-8`. Small line: arrow + "Previous · Tool" / "Next · Tool →" (13/16, 600, `--site-text-2`). Title: Roboto Condensed 700, line-height 1.25. The Next tile is right-aligned on tablet/desktop.

### Footer
Background `--site-inverse`, padding 28px (page side padding). Text 14/20, `--site-on-inverse-2`: "© 2026 Simon Shen · Auckland, New Zealand" and "Built with Astro · Hosted on GitHub Pages".

## Interactions & behaviour
- **Filtering** (client-side, on the static list): match type (All or exact), tags (an entry matches if it has **any** selected tag; none selected = all) and title search (case-insensitive substring). The count updates live. Show the empty state at 0 results. Recalculate the featured card from the filtered list. Suggest syncing the filters to the URL query (`?type=Guide&tag=ai&q=…`) so filtered views can be shared.
- **Card click** goes to `/entries/<slug>/`.
- **Theme**: values `light` / `dark`. On first load use `localStorage['ss-theme']` if set, otherwise `prefers-color-scheme`. Set `data-theme` on `<html>` in an **inline script in `<head>`** before paint (to avoid a flash). The toggle flips the theme and saves it to localStorage. Also set `color-scheme` to match. Background and text colour transition over 200ms.
- **Language switch**: visual state only for now (`aria-pressed`). Leave a hook for i18n later.
- **Copy, lightbox, TOC scroll**: as specified above.
- **Focus**: global `:focus-visible { outline: 2px solid var(--color-info-main); outline-offset: 2px }`. Search field focus as noted. Respect `prefers-reduced-motion` (turn off the card lift and smooth scroll).

## Accessibility
- Semantic landmarks: `header`, `main`, `nav` ("In this guide", "More entries"), `footer`. Cards are links; the tag lists are `<ul aria-label="Tags">`.
- Every image needs `alt`. Decorative icons get `aria-hidden="true"`.
- Toggle buttons use `aria-pressed`. Tap targets are at least 44px on mobile (the per-tier table already accounts for this).
- Contrast: text on tints always uses `--site-text`. The type colours are used only for dots and icons (they are not AA for text on tints).

## Design tokens
The full file is `site-tokens.css`. It is a semantic layer over the Stridyn palette (`ds/tokens.css`). Use only `--site-*` for neutrals and tints.

Palette (Stridyn): grey-50 #F1F1F1 · grey-200 #E5E5E5 · grey-300 #D8D8D8 · grey-400 #A8A8A8 · grey-500 #767676 · grey-600 #525252 · grey-700 #333333 · grey-800 #222222 · grey-900 #1F1F1F · black #000 · white #FFF · info/secondary-main #1379CE · info-light #E7F2FA · success-main #008000 · success-light #E6F2E6 · warning-main #FFA000 · warning-light #FEF8ED · ai-purple-50 #F5EEFF · ai-purple-200 #D1ADFF · ai-purple-500 #9747FF · ai-purple-700 #5E1ACC · aderant-red #B30838.

| Semantic token | Light | Dark |
|---|---|---|
| `--site-bg` | white | grey-900 |
| `--site-surface` | white | grey-800 |
| `--site-subtle` | grey-50 | grey-800 |
| `--site-text` | grey-900 | grey-50 |
| `--site-text-2` | grey-700 | grey-300 |
| `--site-text-3` | grey-600 | grey-400 |
| `--site-border` | grey-300 | grey-700 |
| `--site-inverse` (header, hero, footer) | grey-900 | black |
| `--site-on-inverse` / `-2` | white / grey-300 | white / grey-400 |
| `--site-link` | info-main | mix(info-main 60%, white) |
| `--site-code-bg` | grey-50 @ 50% | black @ 35% |
| `--site-code-kw` / `str` / `com` / `num` | ai-purple-700 / success-main / grey-600 / aderant-red | ai-purple-200 / mix(success 55%, white) / grey-400 / mix(red 45%, white) |
| `--site-tint-guide` / `tool` / `app` / `idea` | info-light / success-light / ai-purple-50 / warning-light | mix(type-main ~22%, grey-900) |

Type colours (dots, icons): Guide = info-main, Tool = success-main, App = `--site-type-app` (ai-purple-700 light, ai-purple-500 dark), Idea = warning-main. The `site-tokens.css` file also remaps Stridyn Chip, ToggleButton, TextField, Alert, TextLink and Button under `[data-theme="dark"]`. Keep those rules.

Typography: Roboto (400/500/600/800) for UI and body; Roboto Condensed (700) for display (wordmark, h1, card titles, labels). Font files are in `ds/fonts/`. Code uses the system monospace stack.

Spacing scale (Stridyn): 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 60, 80, 100. Radii: 4 (xs), 6 (sm), 8 (md), 10 (lg), 12 (xl), 16 (xxl), pill 50px. Shadows: `--elevation-4` (zoom badge) and `--elevation-8` (cover, hover); values are in `ds/tokens.css`.

## Stridyn components used (CSS in `ds/`)
Chip (`chip.css`), ToggleButton (`togglebutton.css`), TextField (`textfield.css`), Button (`button.css`), TextLink (`textlink.css`), Alert (`alert.css`). Copy these stylesheets into the Astro project (e.g. `src/styles/ds/`) and use their class names as shown in the prototype. Each file `@import`s `tokens.css`.

## Icons (Material icon paths, inline SVG, 24×24 viewBox)
Type icons: Guide = MenuBook, Tool = Build, App = Apps, Idea = LightbulbOutlined. UI icons: Search, ArrowBack, ArrowForward, ContentCopy, Check, OpenInNew, ZoomIn, Close, DarkMode, LightMode. The exact `d` paths are in `design/SiteShelf.dc.html`, `Prose.dc.html` and `CodeBlock.dc.html`.

## Assets
There are no real images yet. Covers and screenshots are placeholders (striped boxes with a monospace label). Supply real screenshots in `src/assets/` and reference them from frontmatter `cover` or Markdown images. The sample entries other than the YouTube guide are placeholder content.

## Files
- `design/Design Directions.dc.html`: overview canvas (desktop, tablet, mobile, dark)
- `design/SiteShelf.dc.html`: home + detail prototype (props: `page`, `viewport`, `theme`)
- `design/Prose.dc.html`: Markdown body styles, callouts, figures, lightbox
- `design/CodeBlock.dc.html`: code block with language label, copy button and highlighting
- `design/support.js`: runtime for the `.dc.html` files
- `site-tokens.css`: semantic light/dark tokens (use as-is)
- `ds/`: Stridyn token and component CSS + fonts
- `content-sample/learn-from-youtube-transcripts.md`: sample entry with every prose element
