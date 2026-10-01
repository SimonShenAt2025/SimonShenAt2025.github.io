---
name: "02. Create Entry"
description: Gather missing details and create a valid Markdown entry for this Astro site.
argument-hint: "Paste your entry idea, notes, or completed brief"
agent: agent
---

Create a new entry in `src/content/entries/` using the information provided by the user.

Before creating a file, inspect [the entry schema](../../src/content.config.ts), the entry guidance in [README](../../README.md), and one or two relevant entries in `src/content/entries/`.

Required frontmatter fields:
- `title`: string.
- `type`: exactly `Guide`, `Tool`, `App`, or `Idea`.
- `tags`: array of strings; an empty array is valid when the user has no relevant tags.
- `date`: a date in `YYYY-MM-DD` format.
- `summary`: concise text for the entry card.

The Markdown body should contain the actual entry content. Ask for enough factual notes to write it accurately if they are missing. Do not invent product features, personal experiences, links, instructions, dates, or claims. Ask concise follow-up questions for missing required fields or essential facts, then wait for the user's answers before writing the file.

Optional frontmatter fields are `cover` (path to an image that exists in the repository), `coverAlt` (image description), and `status` (free-form text). Omit optional fields the user did not provide. Never reference a cover image that does not exist, and do not create placeholder image files.

When the brief is complete:
- Choose a unique kebab-case filename from the title unless the user specified a slug. Check for an existing file before creating it.
- Write the frontmatter and Markdown body in English, matching the repository's existing entry style and supported Markdown features.
- Keep the user's meaning and factual claims intact. Improve clarity without adding unsupported claims.
- Create the `.md` file under `src/content/entries/`, then run `npm run check` and report the path and validation result.