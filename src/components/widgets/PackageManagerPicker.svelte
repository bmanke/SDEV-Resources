<script lang="ts">
	import { onMount } from 'svelte';
	import { packageManager, visitCount, type PackageManager } from '../../lib/stores/persisted';
	const managers: PackageManager[] = ['npm', 'pnpm', 'yarn', 'bun'];
	onMount(() => visitCount.update((n) => n + 1));
</script>

<div class="panel not-content">
	<div class="row">
		<div>
			<p class="eyebrow">Preferred package manager</p>
			<p class="sub">Saved to <code>localStorage</code> · visit #{$visitCount}</p>
		</div>
		<div class="segmented" role="radiogroup" aria-label="Package manager">
			{#each managers as pm (pm)}
				<button type="button" role="radio" aria-checked={$packageManager === pm} class:active={$packageManager === pm} onclick={() => packageManager.set(pm)}>
					{pm}
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.panel { border: 1px solid var(--widget-border); background: var(--widget-bg); border-radius: var(--widget-radius); padding: 1rem 1.25rem; margin-block: 1.25rem; font-size: var(--sl-text-sm); }
	.row { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.75rem; }
	.eyebrow { margin: 0; font-weight: 600; color: var(--sl-color-white); }
	.sub { margin: 0.15rem 0 0; color: var(--sl-color-gray-3); font-size: var(--sl-text-xs); }
	.sub code { font-family: var(--sl-font-mono); }
	.segmented { display: inline-flex; border: 1px solid var(--widget-border); border-radius: 0.45rem; overflow: hidden; }
	.segmented button { font: inherit; font-family: var(--sl-font-mono); padding: 0.4rem 0.85rem; border: 0; background: var(--widget-surface); color: var(--sl-color-gray-2); cursor: pointer; }
	.segmented button + button { border-left: 1px solid var(--widget-border); }
	.segmented button.active { background: var(--sl-color-accent-low); color: var(--sl-color-accent-high); }
	.segmented button:focus-visible { outline: 2px solid var(--sl-color-accent); outline-offset: -2px; }
</style>
