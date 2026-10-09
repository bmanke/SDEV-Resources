// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import svelte from '@astrojs/svelte';
import { base, site } from './scripts/site-base.mjs';

// https://astro.build/config
export default defineConfig({
	// Hosting address: edit scripts/site-base.mjs. Used for the sitemap, canonical links and the base path.
	site,
	base,
	integrations: [
		starlight({
			title: 'Software Development Resources',
			description:
				'A repository with code comments on exercises and assignments.',
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: false,
			},
			favicon: '/favicon.svg',
			social: [
				{ icon: 'github', label: 'GitHub repository: report issues and send pull requests', href: 'https://github.com/bmanke/SDEV-Resources' },
			],
			editLink: {
				baseUrl: "https://github.com/bmanke/SDEV-Resources/edit/main/",
			},
			lastUpdated: true,
			customCss: [
				'@fontsource-variable/inter',
				'@fontsource-variable/jetbrains-mono',
				'./src/styles/custom.css',
			],
			// Swap or extend any built-in Starlight component.
			components: {
				PageTitle: './src/components/overrides/PageTitle.astro',
				Footer: './src/components/overrides/Footer.astro',
			},
			// Full-text search is powered by Pagefind and is ON by default.
			// It indexes the site during `astro build` (search is unavailable in `astro dev`).
			pagefind: true,
			sidebar: [
				{
					label: 'First Semester',
					items: [
						{
							label: 'Programming Fundamentals',
							items: [{ autogenerate: { directory: 'lessons/programming-fundamentals' } }],
						},
						{
							label: 'Frontend Development',
							items: [{ autogenerate: { directory: 'lessons/frontend-development' } }],
						},
					],
				},
				{
					label: 'Second Semester',
					items: [
						{
							label: 'Intermediate Frontend Development',
							items: [
								{
									label: 'ReactJS Guide',
									items: [{ autogenerate: { directory: 'sdev-2150-intermediate-frontend/reactjs-guide' } }],
								},
								{
									label: 'Exercises',
									items: [{ autogenerate: { directory: 'sdev-2150-intermediate-frontend/exercises' } }],
								},
							],
						},
						{
							label: 'Rapid Backend Development',
							items: [{ autogenerate: { directory: 'lessons/rapid-backend-development' } }],
						},
					],
				},
				{
					label: 'Resources',
					items: [{ autogenerate: { directory: 'resources' } }],
				},
				{ label: 'Changelog', slug: 'changelog' },
			],
		}),
		svelte(),
	],
});
