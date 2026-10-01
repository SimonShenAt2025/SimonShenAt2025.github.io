import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const ENTRY_TYPES = ['Guide', 'Tool', 'App', 'Idea'] as const;

const entries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/entries' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      type: z.enum(ENTRY_TYPES),
      tags: z.array(z.string()),
      date: z.coerce.date(),
      summary: z.string(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      status: z.string().optional(),
    }),
});

export const collections = { entries };
