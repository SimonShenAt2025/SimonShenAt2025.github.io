---
name: "01. Prepare Entry Brief"
description: Check what entry details are available and create a tailored prompt to copy into another AI.
argument-hint: "Describe your item or paste your rough notes"
agent: agent
---

Help the user prepare a new entry brief and generate a tailored prompt they can copy into another AI.

Use Simplified Chinese for all chat messages, questions, and clarifications. Keep the generated website content and copyable prompt in English unless the user asks otherwise.

Before responding, inspect [the entry schema](../../src/content.config.ts). Use the schema as the source of truth. Use the template below as the structure for the tailored prompt you generate.

The required frontmatter fields are `title`, `type` (exactly `Guide`, `Tool`, `App`, or `Idea`), `tags` (an array; `[]` is valid), `date` (`YYYY-MM-DD`), and `summary`. A useful entry also needs factual notes for its Markdown body. The optional fields are `cover` (an image that already exists in the repository), `coverAlt`, and `status`. A preferred slug is optional; it can be derived from the title.

Check the user's current message and any supplied notes against those requirements. Do not ask again for details already provided. If the entry topic is unclear, ask what item they want to add. Ask concise follow-up questions for missing required fields or essential factual notes. Do not invent details or treat optional fields as required.

If essential context is missing, ask concise follow-up questions in Simplified Chinese and wait for the user's answers. Do not generate a partial prompt. Once there is enough context, output only one complete, tailored prompt in a single `text` code block for the user to copy into another AI. Do not add a summary, status, or explanation outside the code block. Include the user's known facts, and tell the other AI to ask about any remaining missing information, avoid unsupported claims, and return a completed brief using the template's fields. Keep the future website content in English.

Do not create or edit an entry file in this step. The user can use `/02-create-entry` after the brief is ready.

Use this base template, adapting it to the user's item and details already provided:

```text
Help me prepare a new item for my personal website. Ask concise follow-up questions for any missing required information. Do not invent facts; if something is unknown, mark it as unknown and ask me.

Required information:
- Title
- Type: Guide, Tool, App, or Idea
- Tags: a list; use [] if none apply
- Date: YYYY-MM-DD
- Short summary for the item card
- Factual notes for the main content: what it is, why it matters, and the key details, steps, or ideas to include

Optional information:
- Cover image path, if I already have an image in the project
- Cover image alt text
- Status label
- Preferred URL slug; otherwise it can be derived from the title

Ask me only for missing or unclear information. Once you have enough, return a completed brief in this format:

Title:
Type:
Tags:
Date:
Summary:
Slug (optional):
Cover (optional):
Cover alt text (optional):
Status (optional):
Main content notes:
Sources or links (optional):

Keep all website content in English. Do not make up sources, product features, personal experiences, or claims.
```