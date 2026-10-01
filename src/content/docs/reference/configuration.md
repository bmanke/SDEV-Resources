---
title: Configuration
description: Key options in astro.config.mjs.
tags: [reference, config]
sidebar:
  order: 1
---

All configuration lives in `astro.config.mjs`, under the `starlight()` integration.

| Option        | Used for                                   | In this template                                   |
| ------------- | ------------------------------------------ | -------------------------------------------------- |
| `title`       | Site name in the header and `<title>`      | `Software Development Resources`                             |
| `logo`        | Header logo                                | `src/assets/logo.svg`                              |
| `sidebar`     | Navigation tree                            | Manual + `autogenerate` groups, badges, `collapsed` |
| `customCss`   | Global CSS, fonts and theme tokens         | Inter, JetBrains Mono, `custom.css`                |
| `components`  | Override built-in UI components            | `PageTitle`                                        |
| `pagefind`    | Full-text search on/off                    | `true`                                             |
| `editLink`    | "Edit page" link                           | Points to a GitHub placeholder                     |
| `lastUpdated` | "Last updated" date taken from git history | `true`                                             |
| `social`      | Header icon links                          | GitHub                                             |

## Sidebar entry types

```js
sidebar: [
	// 1. A link to a page in the docs collection
	{ label: 'Overview', slug: 'sdev-2150-intermediate-frontend/assignment-1/overview' },
	// 2. A group with hand-picked items
	{ label: 'Widgets', items: [/* ... */], badge: { text: 'Svelte', variant: 'tip' } },
	// 3. A group generated from a folder
	{ label: 'Guides', items: [{ autogenerate: { directory: 'guides' } }] },
	// 4. A collapsed group
	{ label: 'Reference', collapsed: true, items: [{ autogenerate: { directory: 'reference' } }] },
	// 5. An external link
	{ label: 'Astro docs', link: 'https://docs.astro.build' },
];
```
