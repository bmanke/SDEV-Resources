---
title: "The JavaScript Event Loop — A Beginner's Guide"
description: "Course resource: The JavaScript Event Loop — A Beginner's Guide"
---

This file explains the **event loop**, one of the most important ideas in
JavaScript. Don't worry if it feels confusing at first — almost everyone finds
it tricky the first time. Read it slowly, and come back to it as you learn more.

---

## 1. The one-sentence summary

> JavaScript can only do **one thing at a time**, but the **event loop** lets it
> *start* slow tasks, keep working on other things, and come back to finish the
> slow tasks later — so your page never freezes.

That's the whole idea. The rest of this file just explains *how* that works.

---

## 2. JavaScript is "single-threaded"

A **thread** is like a worker. JavaScript has exactly **one worker**. This means
JavaScript runs your code **one line at a time, in order**, and it can never run
two lines at the exact same moment.

```js
console.log('First');
console.log('Second');
console.log('Third');
```

Output (always, every time):

```
First
Second
Third
```

So how can a website do many things "at once" — animate, respond to clicks,
download data — if there is only one worker? That's the puzzle the event loop
solves.

---

## 3. The key pieces

To understand the event loop, you need to know about four things. Imagine a
busy kitchen with **one chef** (JavaScript's single thread).

### a) The Call Stack — "what the chef is doing right now"

The **call stack** is a to-do list of functions JavaScript is *currently*
running. When a function is called, it's placed on top of the stack. When it
finishes, it's removed. JavaScript always works on whatever is on **top** of the
stack.

```js
function greet() {
  console.log('Hello');
}

function start() {
  greet();        // greet() goes ON the stack, runs, comes OFF
  console.log('Done');
}

start();          // start() goes ON the stack
```

Only one thing is ever "on the stove" at a time.

### b) Web APIs — "the kitchen helpers"

Some tasks are slow (waiting 3 seconds, downloading a file, waiting for a click).
JavaScript itself does **not** wait for these. Instead, it hands them off to the
**browser** (or Node.js), which has extra helpers that can do timing, network
requests, and so on **in the background**. These are called **Web APIs**.

Examples of things handled by Web APIs:
- `setTimeout` (timers)
- `fetch` (network requests)
- DOM events like `click`, `keydown`, `mouseover`

The chef hands off the slow task and **keeps cooking other orders**.

### c) The Callback Queue — "orders that are ready to serve"

When a background task finishes (the timer rings, the click happens, the data
arrives), its **callback function** doesn't run immediately. It politely waits
in line in the **callback queue** (also called the *task queue*).

### d) The Event Loop — "the manager"

The **event loop** has one simple job, which it repeats forever:

> "Is the call stack empty? If yes, take the next function from the queue and put
> it on the stack to run."

That's it. The event loop just keeps checking: *"Is the chef free? Then serve the
next ready order."*

---

## 4. Putting it together with `setTimeout`

This is the classic example. Read the code, then guess the output before looking.

```js
console.log('A');

setTimeout(() => {
  console.log('B');
}, 0);          // even with 0 milliseconds!

console.log('C');
```

**Output:**

```
A
C
B
```

Wait — why does `B` come last, even though the timer is `0`?

Here's the step-by-step story:

1. `console.log('A')` runs immediately → prints **A**.
2. `setTimeout(..., 0)` is **not** run by JavaScript directly. It is handed to a
   Web API. JavaScript does **not** wait — it moves on.
3. `console.log('C')` runs immediately → prints **C**.
4. Now the main code is finished. The call stack is empty.
5. The timer (even at 0 ms) finished long ago, so its callback was sitting in the
   **callback queue**.
6. The **event loop** sees the stack is empty and pushes the callback onto the
   stack → prints **B**.

**The big lesson:** `setTimeout(fn, 0)` does **not** mean "run now." It means
"run *as soon as possible*, but only **after** the current code finishes."

---

## 5. Why this matters for event-driven apps

Everything in Lesson 08 — clicks, hovers, keypresses — works *because* of the
event loop. When you write:

```js
button.addEventListener('click', () => {
  console.log('Button clicked!');
});
```

you are saying:

> "Browser, please watch this button. When a click happens, put my callback in
> the queue. The event loop will run it when JavaScript is free."

Your callback doesn't run when you *write* it. It runs **later**, whenever the
user actually clicks. This "register now, run later" pattern is the heart of
**event-driven programming**.

---

## 6. Why your page never freezes

Because slow work is handed to Web APIs in the background, the single thread
stays free to respond to the user. The page feels smooth.

But beware: if **you** write slow code on the main thread, you *block* the chef,
and nothing else can happen — the page freezes:

```js
button.addEventListener('click', () => {
  // BAD: a loop that runs for several seconds
  const end = Date.now() + 5000;
  while (Date.now() < end) {
    // do nothing, just burn 5 seconds
  }
  console.log('Finally done');
});
```

While that loop runs, clicks, typing, and animations all stop. This is called
**blocking the event loop**, and it's something to avoid.

---

## 7. A quick note: Microtasks (Promises)

Once you start using **Promises** and `async/await`, you'll hear about a second
line called the **microtask queue**. The rule:

> After each task, the event loop empties the **entire microtask queue** before
> moving on.

Microtasks (like `.then()` callbacks) get to "cut in line" ahead of regular
tasks like `setTimeout`. Example:

```js
console.log('1');

setTimeout(() => console.log('2'), 0);   // regular task (callback queue)

Promise.resolve().then(() => console.log('3'));  // microtask

console.log('4');
```

**Output:**

```
1
4
3
2
```

`3` (the Promise microtask) runs before `2` (the timer task), even though the
timer is also `0`. You don't need to master this on day one — just know
microtasks have priority.

---

## 8. The mental model to remember

```
   ┌─────────────────────────┐
   │      Call Stack         │  ← what runs RIGHT NOW (one at a time)
   └─────────────────────────┘
              ▲
              │  event loop pushes the next ready task
              │  ONLY when the stack is empty
              │
   ┌─────────────────────────┐
   │   Microtask Queue       │  ← Promises (.then) — runs first
   ├─────────────────────────┤
   │   Callback Queue        │  ← setTimeout, events — runs after
   └─────────────────────────┘
              ▲
              │  Web APIs drop finished tasks into the queue
              │
   ┌─────────────────────────┐
   │   Web APIs (browser)    │  ← timers, fetch, DOM events run here
   └─────────────────────────┘  ← in the BACKGROUND
```

---

## 9. Five takeaways

1. JavaScript does **one thing at a time** (single-threaded).
2. Slow tasks are handed off to **Web APIs** that run in the background.
3. Finished tasks wait in a **queue**, not on the stack.
4. The **event loop** runs queued tasks only when the **stack is empty**.
5. `setTimeout(fn, 0)` means "run **after** the current code," not "run now."

---

## 10. Want to see it visually?

Try the interactive tool **Loupe** by Philip Roberts:
<http://latentflip.com/loupe/> — paste in small code snippets and watch the call
stack, Web APIs, and queue light up in real time. His talk *"What the heck is
the event loop anyway?"* is one of the best beginner explanations ever made.

