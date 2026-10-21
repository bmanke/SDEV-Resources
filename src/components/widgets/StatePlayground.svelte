<script lang="ts">
	/**
	 * StatePlayground — a self-contained task board that demonstrates the
	 * core Svelte 5 state primitives inside a documentation page:
	 *
	 *   $state     → deeply reactive local state (tasks, filter, form)
	 *   $derived   → computed values (visible tasks, stats)
	 *   $effect    → side effects reacting to state (event log milestone)
	 *   snapshots  → immutable history for undo / redo
	 */
	import { untrack } from 'svelte';

	type Priority = 'low' | 'medium' | 'high';
	type Filter = 'all' | 'active' | 'done';
	interface Task {
		id: number;
		title: string;
		done: boolean;
		priority: Priority;
	}
	interface LogEntry {
		id: number;
		time: string;
		kind: 'action' | 'effect' | 'history';
		message: string;
	}

	// ---------- $state: the source of truth ----------
	let nextId = 4;
	let tasks = $state<Task[]>([
		{ id: 1, title: 'Write the introduction page', done: true, priority: 'high' },
		{ id: 2, title: 'Configure the sidebar', done: false, priority: 'medium' },
		{ id: 3, title: 'Add a Svelte widget', done: false, priority: 'low' },
	]);
	let filter = $state<Filter>('all');
	let draft = $state('');
	let draftPriority = $state<Priority>('medium');
	let inspectorTab = $state<'state' | 'log'>('state');

	// History stacks hold plain (non-proxied) snapshots of `tasks`.
	let past = $state<Task[][]>([]);
	let future = $state<Task[][]>([]);
	let log = $state<LogEntry[]>([]);
	let logId = 0;

	// ---------- $derived: computed, always in sync ----------
	const visible = $derived(
		filter === 'all' ? tasks : tasks.filter((t) => (filter === 'done' ? t.done : !t.done)),
	);
	const stats = $derived.by(() => {
		const total = tasks.length;
		const done = tasks.filter((t) => t.done).length;
		return { total, done, active: total - done, percent: total ? Math.round((done / total) * 100) : 0 };
	});
	const inspector = $derived(
		JSON.stringify(
			{
				$state: { filter, draft, draftPriority, tasks: $state.snapshot(tasks) },
				$derived: { visibleCount: visible.length, stats },
				history: { undo: past.length, redo: future.length },
			},
			null,
			2,
		),
	);

	// ---------- helpers ----------
	function record(kind: LogEntry['kind'], message: string) {
		const time = new Date().toLocaleTimeString([], { hour12: false });
		log = [{ id: ++logId, time, kind, message }, ...log].slice(0, 30);
	}

	/** Snapshot current tasks before a mutation so it can be undone. */
	function commit(message: string, mutate: () => void) {
		past = [...past, $state.snapshot(tasks)].slice(-50);
		future = [];
		mutate();
		record('action', message);
	}

	function addTask(event: SubmitEvent) {
		event.preventDefault();
		const title = draft.trim();
		if (!title) return;
		commit(`addTask("${title}")`, () => {
			tasks.push({ id: nextId++, title, done: false, priority: draftPriority });
		});
		draft = '';
	}

	function toggle(task: Task) {
		commit(`toggle(#${task.id}) → ${!task.done ? 'done' : 'active'}`, () => {
			task.done = !task.done; // deep reactivity: mutate in place
		});
	}

	function remove(task: Task) {
		commit(`remove(#${task.id})`, () => {
			tasks = tasks.filter((t) => t.id !== task.id);
		});
	}

	function clearDone() {
		if (!stats.done) return;
		commit(`clearDone() removed ${stats.done}`, () => {
			tasks = tasks.filter((t) => !t.done);
		});
	}

	function undo() {
		const previous = past.at(-1);
		if (!previous) return;
		future = [$state.snapshot(tasks), ...future];
		past = past.slice(0, -1);
		tasks = previous;
		record('history', 'undo()');
	}

	function redo() {
		const [next, ...rest] = future;
		if (!next) return;
		past = [...past, $state.snapshot(tasks)];
		future = rest;
		tasks = next;
		record('history', 'redo()');
	}

	function onKeydown(event: KeyboardEvent) {
		const mod = event.metaKey || event.ctrlKey;
		if (!mod || event.key.toLowerCase() !== 'z') return;
		event.preventDefault();
		event.shiftKey ? redo() : undo();
	}

	// ---------- $effect: react to state changes ----------
	// Reads `stats.percent` (tracked). Writes to the log inside `untrack`
	// so the effect doesn't depend on the log it appends to.
	let lastPercent = -1;
	$effect(() => {
		const percent = stats.percent;
		untrack(() => {
			if (lastPercent !== -1 && percent !== lastPercent) {
				record('effect', `progress ${lastPercent}% → ${percent}%`);
			}
			if (percent === 100 && stats.total > 0) record('effect', 'all tasks complete');
			lastPercent = percent;
		});
	});

	const filters: Filter[] = ['all', 'active', 'done'];
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<section class="playground not-content" aria-label="State management playground" onkeydown={onKeydown} role="application">
	<div class="board">
		<header class="board-head">
			<div>
				<p class="eyebrow">Task board</p>
				<p class="progress-label">
					<strong>{stats.done}</strong> of {stats.total} done
				</p>
			</div>
			<div class="history">
				<button type="button" onclick={undo} disabled={!past.length} title="Undo (Ctrl/⌘ + Z)">Undo</button>
				<button type="button" onclick={redo} disabled={!future.length} title="Redo (Ctrl/⌘ + Shift + Z)">Redo</button>
			</div>
		</header>

		<div class="bar" role="progressbar" aria-valuenow={stats.percent} aria-valuemin="0" aria-valuemax="100" aria-label="Completion">
			<span style:width="{stats.percent}%"></span>
		</div>

		<form class="add" onsubmit={addTask}>
			<label class="sr-only" for="pg-draft">New task</label>
			<input id="pg-draft" bind:value={draft} placeholder="Add a task and press Enter" autocomplete="off" />
			<label class="sr-only" for="pg-priority">Priority</label>
			<select id="pg-priority" bind:value={draftPriority}>
				<option value="low">Low</option>
				<option value="medium">Medium</option>
				<option value="high">High</option>
			</select>
			<button type="submit" class="primary" disabled={!draft.trim()}>Add</button>
		</form>

		<div class="filters" role="tablist" aria-label="Filter tasks">
			{#each filters as f (f)}
				<button
					type="button"
					role="tab"
					aria-selected={filter === f}
					class:active={filter === f}
					onclick={() => (filter = f)}
				>
					{f}
					<span class="count">{f === 'all' ? stats.total : f === 'done' ? stats.done : stats.active}</span>
				</button>
			{/each}
			<button type="button" class="link" onclick={clearDone} disabled={!stats.done}>Clear done</button>
		</div>

		<ul class="tasks">
			{#each visible as task (task.id)}
				<li class:done={task.done}>
					<label>
						<input type="checkbox" checked={task.done} onchange={() => toggle(task)} />
						<span class="title">{task.title}</span>
					</label>
					<span class="priority priority--{task.priority}">{task.priority}</span>
					<button type="button" class="remove" onclick={() => remove(task)} aria-label="Remove {task.title}">×</button>
				</li>
			{:else}
				<li class="empty">Nothing here. {filter === 'done' ? 'Complete a task to see it.' : 'Add a task above.'}</li>
			{/each}
		</ul>
	</div>

	<aside class="inspector" aria-label="State inspector">
		<div class="tabs" role="tablist">
			<button type="button" role="tab" aria-selected={inspectorTab === 'state'} class:active={inspectorTab === 'state'} onclick={() => (inspectorTab = 'state')}>State</button>
			<button type="button" role="tab" aria-selected={inspectorTab === 'log'} class:active={inspectorTab === 'log'} onclick={() => (inspectorTab = 'log')}>
				Event log <span class="count">{log.length}</span>
			</button>
		</div>
		{#if inspectorTab === 'state'}
			<pre class="json">{inspector}</pre>
		{:else}
			<ol class="log">
				{#each log as entry (entry.id)}
					<li><time>{entry.time}</time><span class="kind kind--{entry.kind}">{entry.kind}</span><code>{entry.message}</code></li>
				{:else}
					<li class="empty">Interact with the board to see actions, effects and history events.</li>
				{/each}
			</ol>
		{/if}
	</aside>
</section>

<style>
	.playground {
		display: grid;
		grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
		gap: 1rem;
		margin-block: 1.5rem;
		font-size: var(--sl-text-sm);
	}
	@media (max-width: 60rem) {
		.playground { grid-template-columns: 1fr; }
	}
	.board, .inspector {
		border: 1px solid var(--widget-border);
		background: var(--widget-bg);
		border-radius: var(--widget-radius);
		padding: 1rem;
		min-width: 0;
	}
	.board-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
	.eyebrow {
		margin: 0;
		font-size: var(--sl-text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--sl-color-gray-3);
	}
	.progress-label { margin: 0.15rem 0 0; color: var(--sl-color-gray-2); }
	.progress-label strong { color: var(--sl-color-white); font-size: 1.1rem; }
	.history { display: flex; gap: 0.35rem; }

	.bar { height: 6px; border-radius: 99px; background: var(--widget-surface); margin: 0.85rem 0 1rem; overflow: hidden; }
	.bar span { display: block; height: 100%; background: var(--sl-color-accent); transition: width 300ms ease; }

	button, input, select {
		font: inherit;
		color: var(--sl-color-white);
		background: var(--widget-surface);
		border: 1px solid var(--widget-border);
		border-radius: 0.4rem;
	}
	button { padding: 0.35rem 0.7rem; cursor: pointer; transition: border-color 120ms, background 120ms, color 120ms; }
	button:hover:not(:disabled) { border-color: var(--sl-color-accent); }
	button:disabled { opacity: 0.45; cursor: not-allowed; }
	button:focus-visible, input:focus-visible, select:focus-visible { outline: 2px solid var(--sl-color-accent); outline-offset: 1px; }
	.primary { background: var(--sl-color-accent); border-color: var(--sl-color-accent); color: var(--sl-color-black); font-weight: 600; }

	.add { display: flex; gap: 0.4rem; }
	.add input { flex: 1; min-width: 0; padding: 0.45rem 0.65rem; }
	.add select { padding: 0.45rem 0.4rem; }

	.filters { display: flex; flex-wrap: wrap; gap: 0.35rem; margin: 0.85rem 0 0.5rem; }
	.filters button, .tabs button { text-transform: capitalize; background: transparent; border-color: transparent; color: var(--sl-color-gray-2); }
	.filters button.active, .tabs button.active { background: var(--sl-color-accent-low); color: var(--sl-color-accent-high); border-color: transparent; }
	.filters .link { margin-left: auto; text-transform: none; color: var(--sl-color-gray-3); }
	.count { margin-left: 0.25rem; font-size: var(--sl-text-xs); opacity: 0.75; font-variant-numeric: tabular-nums; }

	.tasks { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.35rem; }
	.tasks li {
		display: flex; align-items: center; gap: 0.6rem;
		padding: 0.5rem 0.6rem;
		background: var(--widget-surface);
		border: 1px solid var(--widget-border);
		border-radius: 0.45rem;
	}
	.tasks label { display: flex; align-items: center; gap: 0.6rem; flex: 1; min-width: 0; cursor: pointer; }
	.tasks input[type='checkbox'] { accent-color: var(--sl-color-accent); width: 1rem; height: 1rem; }
	.title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--sl-color-white); }
	li.done .title { text-decoration: line-through; color: var(--sl-color-gray-3); }
	.priority { font-size: var(--sl-text-xs); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.priority--low { color: var(--sl-color-blue); }
	.priority--medium { color: var(--sl-color-orange); }
	.priority--high { color: var(--sl-color-red); }
	.remove { border: none; background: none; padding: 0 0.3rem; color: var(--sl-color-gray-3); font-size: 1.1rem; line-height: 1; }
	.remove:hover:not(:disabled) { color: var(--sl-color-red); }
	.tasks li.empty, .log li.empty { justify-content: center; color: var(--sl-color-gray-3); border-style: dashed; background: transparent; }

	.inspector { display: flex; flex-direction: column; }
	.tabs { display: flex; gap: 0.35rem; margin-bottom: 0.6rem; }
	.json {
		margin: 0; flex: 1;
		max-height: 24rem; overflow: auto;
		padding: 0.75rem;
		background: var(--widget-surface);
		border: 1px solid var(--widget-border);
		border-radius: 0.45rem;
		font-family: var(--sl-font-mono);
		font-size: 0.75rem;
		line-height: 1.5;
		color: var(--sl-color-gray-1);
	}
	.log { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.3rem; max-height: 24rem; overflow: auto; }
	.log li {
		display: grid; grid-template-columns: auto auto 1fr; align-items: center; gap: 0.5rem;
		padding: 0.35rem 0.5rem; border-radius: 0.35rem; border: 1px solid var(--widget-border); background: var(--widget-surface);
		font-size: 0.75rem;
	}
	.log li.empty { display: block; text-align: center; padding: 1rem; }
	.log time { font-family: var(--sl-font-mono); color: var(--sl-color-gray-3); }
	.log code { font-family: var(--sl-font-mono); color: var(--sl-color-gray-1); overflow-wrap: anywhere; background: none; padding: 0; }
	.kind { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; }
	.kind--action { color: var(--sl-color-blue); }
	.kind--effect { color: var(--sl-color-purple); }
	.kind--history { color: var(--sl-color-orange); }

	.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
</style>
