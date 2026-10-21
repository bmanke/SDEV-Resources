import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

/**
 * `docs` — Starlight's main collection. Every .md / .mdx file in
 * src/content/docs becomes a page. We extend the default frontmatter schema
 * with a few custom, type-checked fields used by the PageTitle override.
 */
const docs = defineCollection({
	loader: docsLoader(),
	schema: docsSchema({
		extend: z.object({
			/** Shown as a pill next to the page title. */
			difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
			/** Rough reading time in minutes, shown under the title. */
			readingTime: z.number().int().positive().optional(),
			/** Free-form tags shown under the title. */
			tags: z.array(z.string()).default([]),
		}),
	}),
});

/**
 * `releases` — a second, custom MDX collection rendered on the Changelog page.
 * Demonstrates how to add your own collections next to Starlight's.
 */
const releases = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/releases' }),
	schema: z.object({
		version: z.string(),
		date: z.coerce.date(),
		summary: z.string(),
		type: z.enum(['major', 'minor', 'patch']).default('minor'),
	}),
});

export const collections = { docs, releases };
