<script lang="ts">
	import { packageManager } from '../../lib/stores/persisted';
	interface Props { pkg: string; dev?: boolean }
	let { pkg, dev = false }: Props = $props();

	const command = $derived.by(() => {
		const d = dev;
		switch ($packageManager) {
			case 'pnpm': return `pnpm add ${d ? '-D ' : ''}${pkg}`;
			case 'yarn': return `yarn add ${d ? '-D ' : ''}${pkg}`;
			case 'bun': return `bun add ${d ? '-d ' : ''}${pkg}`;
			default: return `npm install ${d ? '-D ' : ''}${pkg}`;
		}
	});

	let copied = $state(false);
	async function copy() {
		await navigator.clipboard?.writeText(command);
		copied = true;
		setTimeout(() => (copied = false), 1400);
	}
</script>

<div class="cmd not-content">
	<span class="prompt" aria-hidden="true">$</span>
	<code>{command}</code>
	<button type="button" onclick={copy} aria-label="Copy command">{copied ? 'Copied' : 'Copy'}</button>
</div>

<style>
	.cmd { display: flex; align-items: center; gap: 0.6rem; margin-block: 0.75rem; padding: 0.6rem 0.6rem 0.6rem 0.9rem; border-radius: var(--widget-radius); border: 1px solid var(--widget-border); background: var(--widget-surface); font-family: var(--sl-font-mono); font-size: var(--sl-text-sm); }
	.prompt { color: var(--sl-color-accent); user-select: none; }
	code { flex: 1; min-width: 0; overflow-x: auto; white-space: nowrap; background: none; padding: 0; color: var(--sl-color-white); }
	button { font: inherit; font-size: var(--sl-text-xs); padding: 0.3rem 0.65rem; border-radius: 0.35rem; border: 1px solid var(--widget-border); background: var(--widget-bg); color: var(--sl-color-gray-2); cursor: pointer; }
	button:hover { border-color: var(--sl-color-accent); }
	button:focus-visible { outline: 2px solid var(--sl-color-accent); outline-offset: 1px; }
</style>
