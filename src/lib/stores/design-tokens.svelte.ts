/**
 * A module-level, rune-powered store.
 *
 * Because ES modules are singletons, every Svelte island on the page that
 * imports `designTokens` receives the *same* reactive instance. Updating it
 * in one island instantly re-renders every other island that reads it —
 * no context, no props, no event bus.
 *
 * File must end in `.svelte.ts` (or `.svelte.js`) so runes are compiled.
 */
export type Shape = 'square' | 'rounded' | 'pill';

class DesignTokens {
	hue = $state(18);
	radius = $state<Shape>('rounded');
	size = $state(16);
	label = $state('Get started');

	/** Derived values live on the class too. */
	color = $derived(`hsl(${this.hue} 100% 56%)`);
	radiusPx = $derived(this.radius === 'square' ? 2 : this.radius === 'rounded' ? 8 : 999);
	css = $derived(
		[
			'.button {',
			`  --accent: ${this.color};`,
			`  font-size: ${this.size}px;`,
			`  border-radius: ${this.radiusPx}px;`,
			'  background: var(--accent);',
			'}',
		].join('\n'),
	);

	reset() {
		this.hue = 18;
		this.radius = 'rounded';
		this.size = 16;
		this.label = 'Get started';
	}
}

export const designTokens = new DesignTokens();
