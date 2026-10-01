---
title: Frontmatter Schema
description: Every frontmatter field available on docs pages.
tags: [reference, schema]
sidebar:
  order: 2
---

The `docs` collection uses Starlight's `docsSchema()`, extended in `src/content.config.ts`.

## Custom fields

| Field         | Type                                         | Default | Rendered by          |
| ------------- | -------------------------------------------- | ------- | -------------------- |
| `difficulty`  | `'beginner' \| 'intermediate' \| 'advanced'` | none    | `PageTitle` override |
| `readingTime` | positive integer (minutes)                   | none    | `PageTitle` override |
| `tags`        | `string[]`                                   | `[]`    | `PageTitle` override |

## Common Starlight fields

| Field            | Purpose                                                  |
| ---------------- | -------------------------------------------------------- |
| `title`          | Page title. Required.                                    |
| `description`    | Meta description and search excerpt                     |
| `template`       | `doc` (default) or `splash` for full-width landing pages |
| `hero`           | Hero block for splash pages                              |
| `sidebar.order`  | Sort order inside auto-generated groups                  |
| `sidebar.label`  | Sidebar label, if different from `title`                 |
| `sidebar.badge`  | Badge shown next to the sidebar link                     |
| `sidebar.hidden` | Hide the page from auto-generated groups                 |
| `tableOfContents`| `false` or `{ minHeadingLevel, maxHeadingLevel }`        |
| `pagefind`       | `false` excludes the page from search                    |
| `draft`          | `true` excludes the page from production builds          |

## Adding a field

```ts title="src/content.config.ts"
schema: docsSchema({
	extend: z.object({
		difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
		// add yours here
		owner: z.string().optional(),
	}),
}),
```

Read it in any override with `Astro.locals.starlightRoute.entry.data.owner`.
