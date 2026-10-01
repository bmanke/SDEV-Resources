<script lang="ts">
	/** Island A — writes to the shared store. */
	import { designTokens as t, type Shape } from '../../lib/stores/design-tokens.svelte';
	const shapes: Shape[] = ['square', 'rounded', 'pill'];
</script>

<div class="panel not-content">
	<p class="eyebrow">Island A · controls</p>
	<label class="field">
		<span>Hue <output>{t.hue}°</output></span>
		<input type="range" min="0" max="360" bind:value={t.hue} />
	</label>
	<label class="field">
		<span>Font size <output>{t.size}px</output></span>
		<input type="range" min="12" max="24" bind:value={t.size} />
	</label>
	<fieldset class="field">
		<legend>Shape</legend>
		<div class="segmented">
			{#each shapes as shape (shape)}
				<label class:active={t.radius === shape}>
					<input type="radio" name="shape" value={shape} bind:group={t.radius} />
					{shape}
				</label>
			{/each}
		</div>
	</fieldset>
	<label class="field">
		<span>Label</span>
		<input type="text" bind:value={t.label} maxlength="24" />
	</label>
	<button type="button" class="reset" onclick={() => t.reset()}>Reset tokens</button>
</div>

<style>
	.panel { border: 1px solid var(--widget-border); background: var(--widget-bg); border-radius: var(--widget-radius); padding: 1rem 1.25rem; margin-block: 1.25rem; display: grid; gap: 0.9rem; font-size: var(--sl-text-sm); }
	.eyebrow { margin: 0; font-size: var(--sl-text-xs); text-transform: uppercase; letter-spacing: 0.08em; color: var(--sl-color-gray-3); }
	.field { display: grid; gap: 0.35rem; border: 0; padding: 0; margin: 0; color: var(--sl-color-gray-2); }
	.field > span { display: flex; justify-content: space-between; }
	legend { padding: 0; margin-bottom: 0.35rem; }
	output { font-family: var(--sl-font-mono); color: var(--sl-color-white); }
	input[type='range'] { accent-color: var(--sl-color-accent); width: 100%; }
	input[type='text'] { font: inherit; padding: 0.45rem 0.65rem; border-radius: 0.4rem; border: 1px solid var(--widget-border); background: var(--widget-surface); color: var(--sl-color-white); }
	.segmented { display: inline-flex; border: 1px solid var(--widget-border); border-radius: 0.45rem; overflow: hidden; width: fit-content; }
	.segmented label { padding: 0.35rem 0.8rem; cursor: pointer; text-transform: capitalize; background: var(--widget-surface); }
	.segmented label + label { border-left: 1px solid var(--widget-border); }
	.segmented label.active { background: var(--sl-color-accent-low); color: var(--sl-color-accent-high); }
	.segmented input { position: absolute; opacity: 0; pointer-events: none; }
	.segmented label:has(input:focus-visible) { outline: 2px solid var(--sl-color-accent); outline-offset: -2px; }
	.reset { justify-self: start; font: inherit; padding: 0.35rem 0.75rem; border-radius: 0.4rem; border: 1px solid var(--widget-border); background: transparent; color: var(--sl-color-gray-2); cursor: pointer; }
	.reset:hover { border-color: var(--sl-color-accent); }
	input:focus-visible, .reset:focus-visible { outline: 2px solid var(--sl-color-accent); outline-offset: 1px; }
</style>
