---
title: "Event-Driven Applications & Common Event Types in JavaScript"
description: "Course resource: Event-Driven Applications & Common Event Types in JavaScript"
---

This file explains what an **event-driven application** is and walks through the
**most common events** you'll use in the browser. It pairs with
[`event-loop.md`](/getting-started/frontend-development/resources/event-loop/).

---

## 1. What is an "event"?

An **event** is simply **something that happens in the browser** that your program may react to.
In a web page, events are usually caused by:

- **User interactions** — clicking a button, moving the mouse, pressing a key, submitting
  a form, scrolling.
- **The browser or DOM** — finishing loading the page, finishing downloading data,
  resizing the window, a timer going off.

Each of these moments is considerend an *event*. 

---

## 2. What is an "event-driven application"?

In some programs, code runs **top to bottom** and then stops. That's fine for a
script that prints a report. But a web page can't work that way, sometimes it has to **sit
and wait** for the user to interact with it, and respond whenever they do.

An **event-driven application** is one whose flow is controlled by events. Instead
of "run these steps and finish," the program says:

> "Set everything up, then **wait**. When an event happens, run the matching code.
> Then go back to waiting."

This is exactly how almost every website and app works. The page loads, then it
waits for a user to click, type, or hover. Each action
triggers a small piece of code called an **event handler** (or **callback**).

```
   Set up the page
        │
        ▼
   ┌─────────────┐   click / key / hover / load ...
   │    WAIT     │ ◀────────────────────────────────┐
   └─────────────┘                                  │
        │ an event fires                            │
        ▼                                           │
   Run the matching handler ──────────────────────►─┘
```

---

## 3. The three steps of handling an event

Almost every event you handle follows the same pattern:

1. **Select** the element you care about.
2. **Listen** for an event on it with `addEventListener`.
3. **React** by running a function (the handler).

```js
// 1. Select
const button = document.querySelector('#btn-toggle');

// 2. Listen   3. React (the function is the reaction)
button.addEventListener('click', () => {
  console.log('The button was clicked!');
});
```

### Anatomy of `addEventListener`

```js
element.addEventListener('eventName', handlerFunction);
//  │           │            │              │
//  │           │            │              └─ function to run when it happens
//  │           │            └─ the event to listen for, as a string
//  │           └─ the method that registers the listener
//  └─ the element you're watching
```

---

## 4. The event object

When an event fires, the browser automatically passes a special **event object**
to your handler. By convention it's named `e` or `event`. It contains useful
details about *what just happened*.

```js
document.addEventListener('keydown', (e) => {
  console.log(e.key);    // which key was pressed, e.g. "a" or "Enter"
  console.log(e.code);   // the physical key code, e.g. "KeyA"
  console.log(e.target); // the element the event came from
});
```

Two extremely common properties:

| Property         | What it gives you                                        |
| ---------------- | -------------------------------------------------------- |
| `e.target`       | The exact element that triggered the event               |
| `e.key`          | (Keyboard events) the key that was pressed               |

Two extremely common methods:

| Method                  | What it does                                              |
| ----------------------- | -------------------------------------------------------- |
| `e.preventDefault()`    | Stops the browser's default action (e.g. form submitting)|
| `e.stopPropagation()`   | Stops the event from bubbling up to parent elements      |

---

## 5. Common event types

Below are the events you'll meet most often as a beginner. The ones in **bold**
are used directly in this lesson's `main.js`.

### Mouse events

| Event        | Fires when…                                              |
| ------------ | -------------------------------------------------------- |
| **`click`**  | An element is clicked (press + release)                  |
| `dblclick`   | An element is double-clicked                             |
| **`mouseover`** | The pointer moves *onto* an element                  |
| **`mouseout`**  | The pointer moves *off* an element                   |
| `mouseenter` | Like `mouseover` but does **not** bubble (often easier)  |
| `mouseleave` | Like `mouseout` but does **not** bubble                  |
| `mousemove`  | The pointer moves while over an element                  |

```js
const card = document.querySelector('#hover-card');
card.addEventListener('mouseover', () => {
  card.classList.add('hovering');
});
card.addEventListener('mouseout', () => {
  card.classList.remove('hovering');
});
```

### Keyboard events

| Event       | Fires when…                                               |
| ----------- | --------------------------------------------------------- |
| **`keydown`** | A key is pressed down                                   |
| `keyup`     | A key is released                                         |

```js
document.addEventListener('keydown', (e) => {
  console.log(`You pressed: ${e.key}`);
});
```

### Form & input events

| Event      | Fires when…                                                |
| ---------- | ---------------------------------------------------------- |
| `submit`   | A `<form>` is submitted (use `e.preventDefault()` a lot!)  |
| `input`    | The value of an input changes (fires on *every* keystroke) |
| `change`   | An input loses focus *after* its value changed             |
| `focus`    | An element gains focus (e.g. you click into a text box)    |
| `blur`     | An element loses focus                                     |

```js
const form = document.querySelector('#signup-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();          // stop the page from reloading
  console.log('Form submitted without reloading!');
});
```

### Window & document (lifecycle) events

| Event              | Fires when…                                          |
| ------------------ | ---------------------------------------------------- |
| `DOMContentLoaded` | The HTML is fully parsed (DOM is ready to use)       |
| `load`             | Everything is loaded, including images and styles    |
| `resize`           | The browser window is resized                        |
| `scroll`           | The user scrolls                                     |

```js
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is ready — safe to find elements now.');
});
```

> **Note:** If your script uses `type="module"` (as this lesson does), or the
> `defer` / `async` attributes, the script already runs *after* the DOM is
> parsed, so wrapping everything in `DOMContentLoaded` is usually unnecessary.

---

## 6. Event bubbling and event delegation

When you click a `<li>` inside a `<ul>`, the click doesn't only happen on the
`<li>`. It then "bubbles up" to the `<ul>`, then the `<body>`, and so on toward
the top of the page. This is called **event bubbling**.

We can use bubbling to our advantage with **event delegation**: instead of adding
a listener to *every* child, we add **one** listener to the **parent** and figure
out which child was clicked using `e.target`.

```js
const list = document.querySelector('#list');

list.addEventListener('click', (e) => {
  // Did the click come from an <li>?
  if (e.target.tagName === 'LI') {
    const id = e.target.getAttribute('data-id');
    console.log(`You clicked item ${id}`);
  }
});
```

**Why this is great:**
- Only **one** listener instead of many → less code, better performance.
- It still works for `<li>` items **added later**, because the parent is doing
  the listening.

`e.target.closest('li')` is a robust variant — it finds the nearest `<li>`
ancestor even if you click something *inside* the `<li>` (like an icon).

---

## 7. Removing listeners (and a common gotcha)

To stop listening, use `removeEventListener` — but you must pass the **same
named function** you added. Anonymous arrow functions cannot be removed because
you have no reference to them.

```js
function handleClick() {
  console.log('clicked');
}

button.addEventListener('click', handleClick);
// later...
button.removeEventListener('click', handleClick);   // works ✅
```

---

## 8. Summary

- An **event** is something that happens that code can react to.
- An **event-driven app** sets things up and then **waits**, running handlers as
  events fire.
- The pattern is always: **select → listen → react** with `addEventListener`.
- The **event object** (`e`) carries details like `e.target` and `e.key`.
- Common categories: **mouse**, **keyboard**, **form/input**, and **lifecycle**
  events.
- **Bubbling** lets us use **event delegation** — one parent listener for many
  children.

Next, open [`exercises.md`](/getting-started/frontend-development/resources/exercises/) and practice with 10 beginner
challenges.

