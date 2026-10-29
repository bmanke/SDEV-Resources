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
									label: 'Course Lessons',
									items: [{ autogenerate: { directory: 'sdev-2150-intermediate-frontend/course-lessons' } }],
								},
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
						{
							label: 'Enterprise Application Development',
							items: [
								{
									label: 'C# Foundations',
									items: [{ autogenerate: { directory: 'lessons/enterprise-application-development/01-csharp-foundations' } }],
								},
								{
									label: 'Database and LINQPad Setup',
									items: [{ autogenerate: { directory: 'lessons/enterprise-application-development/02-database-and-linqpad-setup' } }],
								},
								{
									label: 'LINQ with the Music Catalogue',
									items: [{ autogenerate: { directory: 'lessons/enterprise-application-development/03-linq-with-music-catalogue' } }],
								},
								{
									label: 'Blazor UI Building Blocks',
									items: [{ autogenerate: { directory: 'lessons/enterprise-application-development/04-blazor-ui-building-blocks' } }],
								},
								{
									label: 'Workshop Domain and Rules',
									items: [{ autogenerate: { directory: 'lessons/enterprise-application-development/05-workshop-domain-and-rules' } }],
								},
								{
									label: 'State, Checkout and Security',
									items: [{ autogenerate: { directory: 'lessons/enterprise-application-development/06-state-checkout-and-security' } }],
								},
							],
						},
					],
				},
				{
					label: 'Resources',
					items: [
						{ autogenerate: { directory: 'resources' } },
						{
							label: 'JavaScript vs TypeScript',
							collapsed: true,
							items: [
								{
									label: 'Same Language, Extra Layer',
									items: [{ autogenerate: { directory: 'typescript-course/01-same-language-extra-layer' } }],
								},
								{
									label: 'Types You Write and Infer',
									items: [{ autogenerate: { directory: 'typescript-course/02-types-you-write-and-infer' } }],
								},
								{
									label: 'Describing Shapes',
									items: [{ autogenerate: { directory: 'typescript-course/03-describing-shapes' } }],
								},
								{
									label: 'Functions and Null Safety',
									items: [{ autogenerate: { directory: 'typescript-course/04-functions-and-null-safety' } }],
								},
								{
									label: 'Reusable Types',
									items: [{ autogenerate: { directory: 'typescript-course/05-reusable-types' } }],
								},
								{
									label: 'Tooling and Migration',
									items: [{ autogenerate: { directory: 'typescript-course/06-tooling-and-migration' } }],
								},
								{
									label: 'Capstone',
									items: [{ autogenerate: { directory: 'typescript-course/07-capstone' } }],
								},
							],
						},
					],
				},
				{ label: 'Changelog', slug: 'changelog' },
			],
		}),
		svelte(),
	],
});
