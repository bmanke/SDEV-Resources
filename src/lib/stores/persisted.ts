import { writable, type Writable } from 'svelte/store';

/**
 * A `svelte/store` writable that:
 *  - hydrates from localStorage on the client (SSR-safe),
 *  - writes back on every change,
 *  - syncs across browser tabs via the `storage` event.
 *
 * Use `$store` auto-subscription inside .svelte components.
 */
/** localStorage can throw (private mode, sandboxed iframes, quotas). */
function safeStorage(): Storage | null {
	try {
		return typeof window !== 'undefined' ? window.localStorage : null;
	} catch {
		return null;
	}
}

export function persisted<T>(key: string, initial: T): Writable<T> {
	const isBrowser = typeof window !== 'undefined';
	const storage = safeStorage();
	const write = (value: T) => {
		try {
			storage?.setItem(key, JSON.stringify(value));
		} catch {
			/* storage full or unavailable: keep in-memory value */
		}
	};
	const read = (): T => {
		if (!storage) return initial;
		try {
			const raw = storage.getItem(key);
			return raw === null ? initial : (JSON.parse(raw) as T);
		} catch {
			return initial;
		}
	};

	const store = writable<T>(read(), (set) => {
		if (!isBrowser) return;
		const onStorage = (event: StorageEvent) => {
			if (event.key === key) set(event.newValue === null ? initial : JSON.parse(event.newValue));
		};
		window.addEventListener('storage', onStorage);
		return () => window.removeEventListener('storage', onStorage);
	});

	return {
		...store,
		set(value) {
			write(value);
			store.set(value);
		},
		update(fn) {
			store.update((current) => {
				const next = fn(current);
				write(next);
				return next;
			});
		},
	};
}

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';
export const packageManager = persisted<PackageManager>('docs:package-manager', 'npm');
export const visitCount = persisted<number>('docs:visit-count', 0);
