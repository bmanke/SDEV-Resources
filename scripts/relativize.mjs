#!/usr/bin/env node
/**
 * Optional post-build step: makes a built site portable so it can be hosted
 * from ANY sub-path or opened from static file storage (S3, etc.) without
 * knowing the base URL ahead of time.
 *
 *   npm run build:portable   →  dist-portable/
 *
 * You do NOT need this for normal hosting (Netlify, Vercel, GitHub Pages
 * with `base`, Cloudflare Pages…). It:
 *   - rewrites root-absolute URLs ("/x") in HTML/CSS to relative paths,
 *   - appends `index.html` to directory links (for hosts without index fallback),
 *   - points the Pagefind search bundle and result links at the runtime root.
 */
import { cp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, relative, sep, posix } from 'node:path';

const SRC = 'dist';
const OUT = process.argv[2] ?? 'dist-portable';

await rm(OUT, { recursive: true, force: true });
await cp(SRC, OUT, { recursive: true });

async function walk(dir) {
	const out = [];
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const p = join(dir, entry.name);
		if (entry.isDirectory()) out.push(...(await walk(p)));
		else out.push(p);
	}
	return out;
}

const files = await walk(OUT);

/** Turn "/guides/x/#h" into "<prefix>guides/x/index.html#h". */
function toRelative(url, prefix) {
	const m = url.match(/^\/([^?#]*)([?#].*)?$/);
	if (!m) return url;
	let path = m[1];
	const rest = m[2] ?? '';
	const last = path.split('/').pop();
	if (path === '' || path.endsWith('/')) path += 'index.html';
	else if (!last.includes('.')) path += '/index.html';
	return (prefix || './') + path + rest;
}

const ATTRS = ['href', 'src', 'component-url', 'renderer-url', 'before-hydration-url', 'action', 'poster'];
const attrRe = new RegExp(`(\\s(?:${ATTRS.join('|')})=)(["'])(\\/(?!\\/)[^"']*)\\2`, 'g');

for (const file of files) {
	const rel = relative(OUT, file).split(sep).join('/');
	if (file.endsWith('.html')) {
		const depth = rel.split('/').length - 1;
		const prefix = '../'.repeat(depth);
		let html = await readFile(file, 'utf8');
		html = html.replace(attrRe, (_, a, q, url) => `${a}${q}${toRelative(url, prefix)}${q}`);
		html = html.replace(/(\ssrcset=)(["'])([^"']*)\2/g, (_, a, q, v) =>
			`${a}${q}${v.replace(/(^|,\s*)(\/(?!\/)[^\s,]+)/g, (__, s, u) => s + toRelative(u, prefix))}${q}`,
		);
		// Expose the site root for runtime scripts (search).
		// Also shim localStorage/sessionStorage for sandboxed iframes where access throws.
		const shim =
			"(function(){function m(){var d={};return{getItem:function(k){return k in d?d[k]:null},setItem:function(k,v){d[k]=String(v)},removeItem:function(k){delete d[k]},clear:function(){d={}},key:function(i){return Object.keys(d)[i]||null},get length(){return Object.keys(d).length}}}" +
			"['localStorage','sessionStorage'].forEach(function(n){try{window[n].getItem('x')}catch(e){Object.defineProperty(window,n,{value:m(),configurable:true})}})})();";
		const root = `<script>${shim}window.__SITE_ROOT__=new URL(${JSON.stringify(prefix || './')},location.href).href</script>`;
		html = html.replace('<head>', `<head>${root}`);
		await writeFile(file, html);
	} else if (file.endsWith('.css')) {
		const fromDir = posix.dirname(rel);
		let css = await readFile(file, 'utf8');
		css = css.replace(/url\((["']?)\/(?!\/)([^)"']+)\1\)/g, (_, q, p) => {
			let r = posix.relative(fromDir, p);
			if (!r.startsWith('.')) r = './' + r;
			return `url(${q}${r}${q})`;
		});
		await writeFile(file, css);
	} else if (/\/_astro\/Search.*\.js$/.test(file.split(sep).join('/'))) {
		let js = await readFile(file, 'utf8');
		js = js
			.replace('bundlePath:`/`.replace(/\\/$/,``)+`/pagefind/`', 'bundlePath:window.__SITE_ROOT__+`pagefind/`')
			.replace(
				/let (\w)=this\.dataset\.stripTrailingSlash===void 0\?e=>e:e=>e\.replace\([^;]*\);/,
				(_, v) =>
					`let ${v}=e=>{let m=e.match(/^\\/?([^#?]*)(.*)$/),p=m[1];if(p===""||p.endsWith("/"))p+="index.html";return window.__SITE_ROOT__+p+m[2]};`,
			)
			.replace('function(e){return`/`+e}', 'function(e){return window.__SITE_ROOT__+e}');
		await writeFile(file, js);
	}
}

console.log(`Portable build written to ${OUT}/`);
