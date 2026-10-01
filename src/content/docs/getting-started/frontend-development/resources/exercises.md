---
title: "Lesson 08 — Event-Driven JavaScript: 10 Beginner Exercises"
description: "Course resource: Lesson 08 — Event-Driven JavaScript: 10 Beginner Exercises"
---

These 10 exercises help you practice **events** and the **event loop**. They go
from very easy to slightly more challenging. Try each one **yourself first**, then
scroll to the **Solutions** section at the bottom to check your work.

## How to use this file

- You can run most of these in your browser's **DevTools Console** (press `F12`,
  click the **Console** tab) or inside the `src/main.js` file of this project.
- The HTML elements referenced (like `#btn-toggle`, `#hover-card`, `#list`) come
  from this lesson's `index.html`.
- Don't peek at the solutions until you've given it a real try. Struggling a
  little is how you learn!

---

## The Exercises

### Exercise 1 — Predict the output (event loop)

Without running it, **write down what you think this prints, and in what order:**

```js
console.log('Start');
setTimeout(() => console.log('Timer'), 0);
console.log('End');
```

Then run it and see if you were right. Explain *why* in one sentence.

---

### Exercise 2 — Your first click listener

Add a click listener to the **Toggle Highlight** button (`#btn-toggle`) that
prints `"Button clicked!"` to the console every time it is clicked.

---

### Exercise 3 — Change text on click

When the **Change Message** button (`#btn-message`) is clicked, change the text of
the paragraph `#message` to say `"You clicked the button!"`.

> Hint: use `.textContent`.

---

### Exercise 4 — Hover in and out

Make the hover card (`#hover-card`) update the status paragraph (`#hover-status`):
- When the mouse moves **onto** the card, set the text to `"Status: Hovering"`.
- When the mouse moves **off** the card, set it to `"Status: Not hovering"`.

---

### Exercise 5 — Show the last key pressed

Listen for `keydown` on the whole `document`. Every time a key is pressed,
update `#key-output` to show: `Last key: X` (where `X` is the actual key).

> Hint: the event object has a `.key` property.

---

### Exercise 6 — Count the clicks

Add a click listener to `#btn-toggle` that keeps a running **count** of how many
times it has been clicked, and prints the current count each time:
`"Clicked 1 time(s)"`, `"Clicked 2 time(s)"`, and so on.

> Hint: declare a counter variable *outside* the listener.

---

### Exercise 7 — Prevent a form from reloading the page

Imagine the page has a form `<form id="signup-form">`. When it is submitted, stop
the browser from reloading the page and instead print `"Form submitted!"`.

> Hint: the `submit` event and a special method on the event object.

---

### Exercise 8 — Event delegation on the list

The list `#list` contains several `<li>` items. Using **one** listener on the
`<ul>` (not one per `<li>`), print the clicked item's `data-id` whenever any
`<li>` is clicked. Example output: `"You clicked item 2"`.

---

### Exercise 9 — `setTimeout` vs `Promise` ordering

Predict the output order, then run it:

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
```

Explain why `3` comes before `2`.

---

### Exercise 10 — Don't block the event loop

The code below freezes the page for 3 seconds when the button is clicked.
**Explain why it freezes**, then **rewrite it** so the message
`"3 seconds later!"` appears after 3 seconds **without** freezing the page.

```js
btnToggle.addEventListener('click', () => {
  const end = Date.now() + 3000;
  while (Date.now() < end) { /* block for 3 seconds */ }
  console.log('3 seconds later!');
});
```

---
---

## ✅ Solutions

> Try the exercises before reading these! Your solution may look slightly
> different and still be correct.

### Solution 1

**Output:**

```
Start
End
Timer
```

`"Timer"` prints **last** because `setTimeout` hands its callback to a Web API.
Even with a `0` delay, that callback must wait in the **callback queue** until the
current code (`Start` and `End`) finishes and the **call stack is empty**. Only
then does the event loop run it.

---

### Solution 2

```js
const btnToggle = document.querySelector('#btn-toggle');

btnToggle.addEventListener('click', () => {
  console.log('Button clicked!');
});
```

---

### Solution 3

```js
const btnMessage = document.querySelector('#btn-message');
const message = document.querySelector('#message');

btnMessage.addEventListener('click', () => {
  message.textContent = 'You clicked the button!';
});
```

---

### Solution 4

```js
const hoverCard = document.querySelector('#hover-card');
const hoverStatus = document.querySelector('#hover-status');

hoverCard.addEventListener('mouseover', () => {
  hoverStatus.textContent = 'Status: Hovering';
});

hoverCard.addEventListener('mouseout', () => {
  hoverStatus.textContent = 'Status: Not hovering';
});
```

> Bonus: `mouseenter` / `mouseleave` would also work and don't bubble.

---

### Solution 5

```js
const keyOutput = document.querySelector('#key-output');

document.addEventListener('keydown', (e) => {
  keyOutput.textContent = `Last key: ${e.key}`;
});
```

The browser passes the **event object** (`e`) to the handler, and `e.key` holds
the key that was pressed (e.g. `"a"`, `"Enter"`, `"ArrowUp"`).

---

### Solution 6

```js
const btnToggle = document.querySelector('#btn-toggle');
let count = 0;                       // declared OUTSIDE so it persists

btnToggle.addEventListener('click', () => {
  count++;                           // increase each click
  console.log(`Clicked ${count} time(s)`);
});
```

The counter is declared **outside** the listener so its value is remembered
between clicks. If you declared it inside, it would reset to `0` every time.

---

### Solution 7

```js
const form = document.querySelector('#signup-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();                // stop the page from reloading
  console.log('Form submitted!');
});
```

`e.preventDefault()` cancels the browser's **default action** for the event —
here, reloading/navigating when a form submits.

---

### Solution 8

```js
const list = document.querySelector('#list');

list.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {           // was an <li> clicked?
    const id = e.target.getAttribute('data-id');
    console.log(`You clicked item ${id}`);
  }
});
```

This is **event delegation**: one listener on the parent `<ul>` handles clicks
for all current *and future* `<li>` children, thanks to event **bubbling**.

> More robust version (works even if you click something *inside* an `<li>`):
> ```js
> const li = e.target.closest('li');
> if (li) {
>   console.log(`You clicked item ${li.getAttribute('data-id')}`);
> }
> ```

---

### Solution 9

**Output:**

```
1
4
3
2
```

`1` and `4` are normal synchronous code, so they run first, in order. After the
main code finishes, the event loop **empties the microtask queue before the
callback queue**. The Promise's `.then` callback is a **microtask** (`3`), so it
runs before the `setTimeout` callback, which is a regular **task** (`2`) — even
though both had a `0` delay. Microtasks get priority.

---

### Solution 10

**Why it freezes:** the `while` loop runs on JavaScript's single thread. While it
spins for 3 seconds, the thread is busy and **cannot** respond to clicks, typing,
or repaint the screen. This is called **blocking the event loop**.

**The fix** is to let a Web API (the timer) do the waiting in the **background**,
so the thread stays free:

```js
btnToggle.addEventListener('click', () => {
  setTimeout(() => {
    console.log('3 seconds later!');
  }, 3000);
});
```

Now `setTimeout` hands the 3-second wait to the browser. JavaScript is free the
whole time, the page stays responsive, and the callback runs once the timer
finishes and the call stack is empty.

---

## 🎉 Done!

If you understood why `Timer` prints last in Exercise 1 and why the `while` loop
freezes the page in Exercise 10, you've grasped the core of the event loop and
event-driven programming. Revisit [`event-loop.md`](/getting-started/frontend-development/resources/event-loop/) and
[`event-driven-applications.md`](/getting-started/frontend-development/resources/event-driven-applications/) anytime you need
a refresher.

