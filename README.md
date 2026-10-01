# Software Development Resources

A repository with code comments on exercises and assignments.

A boilerplate documentation site built with **Astro Starlight** and **Svelte 5**.

- **MDX content collections.** `src/content/docs` uses an extended, type-checked frontmatter schema (`difficulty`, `readingTime`, `tags`). A second custom `releases` collection powers the changelog.
- **Sidebar navigation.** Includes hand-picked groups, auto-generated groups, badges and a collapsed group.
- **Dark mode.** Dark, light and system themes, with brand tokens for both modes in `src/styles/custom.css`.
- **Full-text search.** Pagefind indexes the site at build time. Open search with `/` or `Ctrl/⌘ + K`.
- **Interactive Svelte widgets.**
  - `StatePlayground`: `$state`, `$derived`, `$effect`, `untrack`, undo/redo with `$state.snapshot`, and a live state inspector plus event log.
  - `TokenControls` + `TokenPreview`: two separate islands that share one module-level rune store (`*.svelte.ts`).
  - `PackageManagerPicker` + `InstallCommand`: a `svelte/store` saved to `localStorage`, synced across islands and tabs.
- **Component override.** `PageTitle` shows the custom frontmatter fields.

## Requirements

Node.js **22.12+** (see `.nvmrc`).

## Commands

| Command                  | Action                                                             |
| ------------------------ | ------------------------------------------------------------------ |
| `npm install`            | Install dependencies                                               |
| `npm run dev`            | Start the dev server at `localhost:4321` (search is off in dev)    |
| `npm run build`          | Build to `./dist/` and generate the search index                   |
| `npm run preview`        | Serve the production build locally                                 |
| `npm run check`          | Type-check `.astro`, `.svelte` and `.ts` files                     |
| `npm run build:portable` | Optional. Builds a relative-path copy in `./dist-portable/` that works from any sub-path or bucket |

## Structure

```
astro.config.mjs            Starlight + Svelte config, sidebar, theme, overrides
src/content.config.ts       docs + releases collection schemas
src/content/docs/           pages (.md / .mdx), file-based routing
src/content/releases/       changelog entries
src/components/widgets/     Svelte islands
src/components/overrides/   Starlight component overrides
src/lib/stores/             shared rune store + persisted svelte/store
src/styles/custom.css       theme tokens (dark + light)
scripts/relativize.mjs      optional portable-build post-processor
```

## Make it yours

1. In `astro.config.mjs`, update `site`, `title`, `social` and `editLink.baseUrl`.
2. Replace `src/assets/logo.svg` and `public/favicon.svg`.
3. Change the accent colors in `src/styles/custom.css`.
4. Delete the demo pages you don't need under `src/content/docs/widgets/`.
