<script lang="ts">
	/**
	 * The smallest possible Svelte 5 island: local reactive state with $state
	 * and a computed value with $derived.
	 */
	interface Props {
		/** Starting value */
		start?: number;
		/** Increment amount */
		step?: number;
		label?: string;
	}
	let { start = 0, step = 1, label = 'Counter' }: Props = $props();

	let count = $state(start);
	const doubled = $derived(count * 2);
	const parity = $derived(count % 2 === 0 ? 'even' : 'odd');
</script>

<div class="widget not-content">
	<div class="head">
		<span class="label">{label}</span>
		<span class="hint">step {step}</span>
	</div>
	<div class="row">
		<button type="button" onclick={() => (count -= step)} aria-label="Decrement">−</button>
		<output class="value" aria-live="polite">{count}</output>
		<button type="button" onclick={() => (count += step)} aria-label="Increment">+</button>
		<button type="button" class="ghost" onclick={() => (count = start)}>Reset</button>
	</div>
	<p class="derived">
		doubled = <code>{doubled}</code> · parity = <code>{parity}</code>
	</p>
</div>

<style>
	.widget {
		border: 1px solid var(--widget-border);
		background: var(--widget-bg);
		border-radius: var(--widget-radius);
		padding: 1rem 1.25rem;
		margin-block: 1.5rem;
	}
	.head {
		display: flex;
		justify-content: space-between;
		font-size: var(--sl-text-xs);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--sl-color-gray-3);
	}
	.label { font-weight: 600; color: var(--sl-color-gray-2); }
	.row { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.75rem; }
	.value {
		min-width: 3.5ch;
		text-align: center;
		font-size: 1.75rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: var(--sl-color-white);
	}
	button {
		font: inherit;
		min-width: 2.5rem;
		height: 2.5rem;
		padding: 0 0.75rem;
		border-radius: 0.45rem;
		border: 1px solid var(--widget-border);
		background: var(--widget-surface);
		color: var(--sl-color-white);
		cursor: pointer;
		transition: border-color 120ms, background 120ms;
	}
	button:hover { border-color: var(--sl-color-accent); }
	button:focus-visible { outline: 2px solid var(--sl-color-accent); outline-offset: 2px; }
	.ghost { margin-left: auto; color: var(--sl-color-gray-2); }
	.derived { margin: 0.75rem 0 0; font-size: var(--sl-text-sm); color: var(--sl-color-gray-3); }
</style>
