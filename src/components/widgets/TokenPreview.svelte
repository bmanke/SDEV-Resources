<script lang="ts">
	/** Island B — reads from the shared store. Lives in a different part of the page. */
	import { untrack } from 'svelte';
	import { designTokens as t } from '../../lib/stores/design-tokens.svelte';
	let renders = $state(0);
	$effect(() => {
		// Track every token so we can count updates caused by Island A...
		void [t.hue, t.size, t.radius, t.label];
		// ...but don't track `renders` itself, or the effect would loop forever.
		untrack(() => renders++);
	});
</script>

<div class="panel not-content">
	<p class="eyebrow">Island B · live preview <span>{renders} update{renders === 1 ? '' : 's'}</span></p>
	<div class="stage">
		<button
			type="button"
			class="demo"
			style:--accent={t.color}
			style:font-size="{t.size}px"
			style:border-radius="{t.radiusPx}px"
		>
			{t.label || 'Button'}
		</button>
	</div>
	<pre><code>{t.css}</code></pre>
</div>

<style>
	.panel { border: 1px solid var(--widget-border); background: var(--widget-bg); border-radius: var(--widget-radius); padding: 1rem 1.25rem; margin-block: 1.25rem; font-size: var(--sl-text-sm); }
	.eyebrow { display: flex; justify-content: space-between; margin: 0; font-size: var(--sl-text-xs); text-transform: uppercase; letter-spacing: 0.08em; color: var(--sl-color-gray-3); }
	.eyebrow span { font-family: var(--sl-font-mono); text-transform: none; letter-spacing: 0; }
	.stage { display: grid; place-items: center; min-height: 7rem; margin: 0.75rem 0; border-radius: 0.45rem; background: repeating-conic-gradient(var(--widget-surface) 0 25%, var(--widget-bg) 0 50%) 0 0 / 16px 16px; border: 1px solid var(--widget-border); }
	.demo { font-family: inherit; font-weight: 600; padding: 0.6em 1.4em; border: none; background: var(--accent); color: #111; cursor: pointer; transition: all 160ms ease; box-shadow: 0 6px 20px -8px var(--accent); }
	pre { margin: 0; padding: 0.75rem; border-radius: 0.45rem; background: var(--widget-surface); border: 1px solid var(--widget-border); font-family: var(--sl-font-mono); font-size: 0.75rem; color: var(--sl-color-gray-1); overflow: auto; }
</style>
