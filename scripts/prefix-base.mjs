#!/usr/bin/env node
/**
 * Post-build step: prefixes root-absolute links in content ("/getting-started/...",
 * "/assets/x.png") with the site's base path, so they work under a sub-path such as
 * https://bmanke.github.io/sdev-resources/. Astro and Starlight already prefix their own
 * links (sidebar, CSS, JS); those are left alone.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { base } from './site-base.mjs';

const prefix = base.replace(/\/$/, '');
if (!prefix) process.exit(0);

const fix = (url) =>
	url.startsWith('/') && !url.startsWith('//') && url !== prefix && !url.startsWith(prefix + '/') ? prefix + url : url;

async function walk(dir) {
	let out = [];
	for (const e of await readdir(dir, { withFileTypes: true })) {
		if (e.name === 'pagefind') continue;
		const p = join(dir, e.name);
		out = out.concat(e.isDirectory() ? await walk(p) : p.endsWith('.html') ? [p] : []);
	}
	return out;
}

let changed = 0;
for (const file of await walk('dist')) {
	const html = await readFile(file, 'utf8');
	const next = html.replace(/(\s(?:href|src)=)(["'])(\/[^"']*)\2/g, (_, a, q, url) => a + q + fix(url) + q);
	if (next !== html) { await writeFile(file, next); changed++; }
}
console.log(`[prefix-base] updated ${changed} HTML files with base "${prefix}"`);
