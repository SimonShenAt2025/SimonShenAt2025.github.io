---
name: "02. Create Entry"
description: Gather missing details and create a valid Markdown entry for this Astro site.
argument-hint: "Paste your entry idea, notes, or completed brief"
agent: agent
---

Create a bilingual entry using the information provided by the user: an English source file in `src/content/entries/` and a Simplified Chinese translation in `src/content/entries/zh/`.

Before creating a file, inspect [the entry schema](../../src/content.config.ts), the entry guidance in [README](../../README.md), and one or two relevant entries in `src/content/entries/`.

Required frontmatter fields:
- `title`: string.
- `type`: exactly `Guide`, `Tool`, `App`, or `Idea`.
- `tags`: array of strings; an empty array is valid when the user has no relevant tags.
- `date`: a date in `YYYY-MM-DD` format.
- `summary`: concise text for the entry card.

The Chinese companion must also set `language: zh` and `translationKey` to the English filename without `.md`. The English entry may omit `language` because it defaults to `en`. Keep `type`, `date`, and canonical English `tags` identical in both files; translate the title, summary, status, cover alt text, and body faithfully. Translate supplied English notes when no Chinese draft is provided, without adding facts.

The Markdown body should contain the actual entry content. Ask for enough factual notes to write it accurately if they are missing. Do not invent product features, personal experiences, links, instructions, dates, or claims. Ask concise follow-up questions for missing required fields or essential facts, then wait for the user's answers before writing the file.

Optional frontmatter fields are `cover` (path to an image that exists in the repository), `coverAlt` (image description), and `status` (free-form text). Omit optional fields the user did not provide. Never reference a cover image that does not exist, and do not create placeholder image files.

If the user asks to use an image attached in chat, first check whether a local file path is actually available. A visible chat preview may not expose the image bytes or a workspace path. If it is inaccessible, ask once for the user to place the source image in `src/content/entries/images/` or provide its local path. Do not repeatedly search unrelated workspace or session folders, and do not claim the image was converted or added until the file is accessible.

If the user requests a WebP cover, use an available image converter (Sharp is available in this Astro project), preserve the original source unless asked to remove it, and verify the output file before referencing it. If the image contains language-specific text, create a separate image for each locale (for example, `<slug>-en.webp` and `<slug>-zh.webp`) and point each Markdown file to its matching cover. Never overwrite a shared locale image when creating another language variant.

When the brief is complete:
- Choose a unique kebab-case English filename from the title unless the user specified a slug. Check both the English path and `zh/` companion path before creating either file.
- Write the source frontmatter and Markdown body in English, and its companion in Simplified Chinese, matching the repository's existing entry style and supported Markdown features.
- Use the same basename for both files. Set the Chinese `translationKey` to that basename. Keep canonical tags identical between translations. For images shared by both files, use a path relative to each Markdown file.
- Keep the user's meaning and factual claims intact. Improve clarity without adding unsupported claims.
- Create both `.md` files, then run `npm run check` and report both paths and the validation result.