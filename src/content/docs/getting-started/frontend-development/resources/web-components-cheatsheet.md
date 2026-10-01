---
title: "Web Components — Cheat Sheet & Glossary"
description: "Course resource: Web Components — Cheat Sheet & Glossary"
---

A one-stop reference for every piece of the `<user-card>` component. Skim the
glossary, then use the detailed sections when you need to remember exactly what a
line does or why it broke.

> New to the Shadow DOM? Read [What Is the Shadow DOM?](/getting-started/frontend-development/resources/shadow-dom/) first.
> Following along step by step? Use the [Walkthrough](/getting-started/frontend-development/resources/walkthrough/).

---

## The mental model (three pieces)

A **web component** is just three ordinary web ideas snapped together:

| Piece | What it gives you | The API |
|-------|-------------------|---------|
| **1. Custom element** | your own HTML tag, e.g. `<user-card>` | `class ... extends HTMLElement` + `customElements.define()` |
| **2. Shadow DOM** | a private, sealed space for the component's HTML + CSS | `this.attachShadow({ mode: 'open' })` |
| **3. Template** | a reusable, ready-to-clone chunk of markup | `<template>` / `document.createElement('template')` + `<slot>` |

Keep the [gadget analogy](/getting-started/frontend-development/resources/shadow-dom/#the-one-analogy-keep-this-in-mind-the-whole-time)
in mind: the custom element is the gadget you plug in, the shadow DOM is its
sealed case, the template is the factory mold it's stamped from, and slots are
the trays where you slide in your own content.

---

## Glossary (quick lookup)

| Term | Plain-English meaning |
|------|-----------------------|
| **Web component** | A reusable custom HTML element you build yourself. |
| **Custom element** | Any tag with a hyphen in its name that you registered, e.g. `<user-card>`. |
| **`HTMLElement`** | The browser's base blueprint for *all* elements. Your component `extends` it. |
| **`customElements`** | The browser's registry (a big list) of custom tags. |
| **`.define()`** | Adds your tag to that registry so the browser knows what `<user-card>` means. |
| **`constructor`** | Setup code that runs each time the browser builds one of your elements. |
| **`super()`** | "Build the base `HTMLElement` first" — must run before `this`. |
| **Shadow DOM** | The private, sealed HTML/CSS tree inside the element. |
| **`attachShadow()`** | Creates that private tree and returns its **shadow root**. |
| **Shadow root** | The top of the private tree; you `appendChild` your content into it. |
| **`<template>`** | Inert markup the browser parses but does **not** render until you use it. |
| **`.content`** | The document fragment holding a template's inner markup. |
| **`.cloneNode(true)`** | Makes a deep copy (children included) so you get a fresh, reusable copy. |
| **`<slot>`** | A labeled opening where outside (light DOM) content shows through. |
| **Attribute** | A value passed on the tag, e.g. `avatar="..."`, read with `getAttribute`. |
| **`getAttribute()`** | Reads an attribute's value off the element. |
| **Light DOM** | The normal children you write between the component's tags. |

---

## 1. Defining the element

### `class UserCard extends HTMLElement { ... }`

```js
class UserCard extends HTMLElement {
  constructor() {
    super();
    // ...set up this card...
  }
}
```

- **What it is:** your component's blueprint. It `extends HTMLElement`, the
  browser's base blueprint that *every* element (`<div>`, `<img>`, …) is built
  from. So your card **is a real element** plus your extra setup.
- **`constructor()`** runs automatically every time the browser builds one of
  your cards. You never call it yourself.
- **`super()`** must be the **first line** — it builds the base `HTMLElement`
  part. Touching `this` before `super()` throws an error.

> Shaky on `class`, `extends`, `constructor`, `super`, `this`? Do the
> `constructors-warmup/` files first — they build up to this exact shape.

### `customElements.define('user-card', UserCard)`

```js
customElements.define('user-card', UserCard);
```

- **What it does:** tells the browser "whenever you see a `<user-card>` tag,
  build one using the `UserCard` class."
- **The name MUST contain a hyphen** — `user-card` ✅, `usercard` ❌. The hyphen
  is how the browser tells custom elements apart from built-in ones. This rule
  is not optional.
- After this line runs, the browser **calls `new UserCard()` for you** every time
  it meets a `<user-card>` tag. You never write `new UserCard()` yourself.
- **Define before use:** if a `<user-card>` tag is on the page before this line
  runs, it just shows as empty until the definition registers.

| You write | The browser does |
|-----------|------------------|
| `customElements.define('user-card', UserCard)` | Remembers the tag → class link |
| `<user-card></user-card>` appears | Runs `new UserCard()` → your `constructor` fires |

---

## 2. The Shadow DOM

### `this.attachShadow({ mode: 'open' })`

```js
const shadow = this.attachShadow({ mode: 'open' });
```

- **What it is:** creates the sealed private tree (the [Shadow DOM](/getting-started/frontend-development/resources/shadow-dom/))
  inside **this** card and hands you back its **shadow root**.
- **`this`** is the specific `<user-card>` being built right now (the shadow
  **host**).
- **`shadow`** is the shadow root — an object you can `appendChild(...)` into.
  Anything you append lives sealed inside the component.
- **`mode: 'open'`** lets you reach the root later via `element.shadowRoot`
  (handy for debugging). Use `open` for this lesson. (`closed` hides that door;
  see the [Shadow DOM guide](/getting-started/frontend-development/resources/shadow-dom/#open-vs-closed-mode).)

**Gotcha:** you can only attach a shadow root **once** per element. Calling
`attachShadow` twice on the same element throws.

---

## 3. Templates

### `<template>` and `document.createElement('template')`

Two ways to make a template — both give the same thing:

```html
<!-- In index.html: a template with an id so JS can find it -->
<template id="user-card-template">
  <div class="card">…</div>
</template>
```

```js
// In JS: build the template in the component file itself (self-contained)
const template = document.createElement('template');
template.innerHTML = `
  <style>.card { … }</style>
  <div class="card">…</div>
`;
```

- **What a template is:** markup the browser **parses but does not render**. It's
  a mold sitting on the shelf. Nothing inside shows on the page until you *use*
  it. (Putting the same markup in a plain `<div>` would render it immediately —
  a `<template>` stays invisible and inert.)
- Building it in the **JS file** keeps the whole component in one place, so it
  can be shared across pages without needing markup pre-added to each HTML file.

### `template.content` and `.cloneNode(true)`

```js
const content = template.content.cloneNode(true);
```

- **`template.content`** is the actual markup inside the template (a
  "document fragment" — a lightweight, off-screen bag of elements).
- **`.cloneNode(true)`** makes a **deep copy** — the `true` means "copy the
  children too," not just the outer element.
- **Why copy?** So each card gets its **own fresh set** of elements. If every
  card shared the one original, they'd fight over the same nodes. The mold stays
  on the shelf; each card is a fresh stamping.

```js
shadow.appendChild(content);   // put the fresh copy into this card's sealed case
```

---

## 4. Slots — `<slot>`

Slots let content you write **outside** the component (light DOM) appear
**inside** its sealed design.

```html
<!-- You write this (light DOM): the slot="name" label routes it -->
<user-card>
  <span slot="name">Zelda</span>
  <span slot="description">Princess of Hyrule</span>
</user-card>
```

```html
<!-- The template has matching openings: -->
<div class="info">
  <slot name="name"></slot>          <!-- "Zelda" shows here -->
  <slot name="description"></slot>   <!-- "Princess of Hyrule" shows here -->
</div>
```

- **`slot="name"`** on your span says *which* opening to fill.
- **`<slot name="name">`** in the template is the opening that receives it.
- **The names must match exactly.** `slot="name"` fills `<slot name="name">`. A
  typo = an empty slot.
- Think of each slot as a **labeled tray** on the gadget. You slide your `<span>`
  into the `name` tray; the component decides where that tray appears.

**Why use slots instead of just setting text?** Slots keep your *content* in the
light DOM (easy to read, style-able from the page) while the component controls
the *layout*. Great separation of concerns.

---

## 5. Attributes — `getAttribute()`

Attributes pass simple values (usually strings) to the component from the tag.

```html
<user-card avatar="assets/zelda-avatar.png"></user-card>
```

```js
const img = content.querySelector('img');
img.src = this.getAttribute('avatar') || 'https://placehold.co/80x80';
```

- **`this.getAttribute('avatar')`** reads the value `"assets/zelda-avatar.png"`
  off the tag.
- **`|| 'https://placehold.co/80x80'`** is a fallback: if no `avatar` attribute
  was given, `getAttribute` returns `null` (falsy), so the placeholder is used
  instead.

| Slots | Attributes |
|-------|------------|
| Pass **rich HTML content** (spans, images, text) | Pass **simple string values** (a URL, a number, a name) |
| `<span slot="name">Zelda</span>` | `avatar="..."` |
| Filled via `<slot>` in the template | Read via `this.getAttribute('...')` |

---

## 6. Creating components with JavaScript

You don't have to type `<user-card>` in HTML — you can build them in code.

### `insertAdjacentHTML` — write it as an HTML string

```js
const dynamicUserCard = `
  <user-card avatar="https://placehold.co/80x80/7700ff/ffffff">
    <span slot="name">Mipha</span>
    <span slot="description">Zora Champion</span>
  </user-card>`;

document.querySelector('main').insertAdjacentHTML('beforeend', dynamicUserCard);
```

- Parses the HTML string and inserts it. `'beforeend'` means "as the last child
  of `<main>`."

### The DOM API — build it node by node

```js
const card = document.createElement('user-card');
card.setAttribute('avatar', 'https://placehold.co/80x80/770000/ffffff');

const nameSpan = document.createElement('span');
nameSpan.setAttribute('slot', 'name');
nameSpan.textContent = 'Yunobo';
card.appendChild(nameSpan);

document.querySelector('main').appendChild(card);
```

- `createElement('user-card')` → the browser builds one (constructor fires).
- `setAttribute` / `appendChild` add the avatar and slotted spans.

---

## Rules to remember

1. **Custom tag names need a hyphen** — `user-card`, never `usercard`.
2. **Define before you use** — `customElements.define(...)` must run before the
   tag appears (importing `user-card.js` in `main.js` handles this).
3. **`super()` first** — in the constructor, call `super()` before touching `this`.
4. **Attach a shadow root only once** per element.
5. **Styles go *inside* the shadow root** to be scoped — a `<style>` in the
   template travels into the sealed case with the markup.
6. **Slot names must match** on both sides.
7. **Clone the template** (`cloneNode(true)`) so each element gets its own copy.

---

## Common errors & fixes

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Component shows nothing | `customElements.define` missing, misspelled, or ran too late | Define it, and make sure `main.js` imports `user-card.js` |
| Tag renders as plain text/empty | Tag name has no hyphen, or class not registered | Use `user-card`; check the `define` call |
| Styles have no effect | `<style>` is outside the shadow root | Move `<style>` **into** the template so it enters the shadow DOM |
| Slot is empty | Slot names don't match | Make `slot="x"` match `<slot name="x">` exactly |
| `querySelector` returns `null` | Template not found, or you're querying across the shadow boundary | Ensure the template exists before the script runs; remember the page can't see into the shadow tree |
| "Must call super constructor … before accessing 'this'" | Used `this` before `super()` | Put `super();` as the constructor's first line |
| "Failed to construct 'CustomElement'" | Attached a shadow root twice, or forgot `super()` | Attach once; call `super()` first |

---

## Two "why?" questions from the code

**Q: Why doesn't the custom avatar show up for the last card built purely with
the DOM API (`Yunobo`)?**
Because the `constructor` reads `getAttribute('avatar')` the instant the element
is built — but when you `createElement('user-card')` first and `setAttribute`
*after*, the attribute isn't there yet when the constructor runs. The proper fix
(reacting to attributes over time) uses **lifecycle callbacks** like
`connectedCallback` and `attributeChangedCallback` — covered in a later lesson.

**Q: What are lifecycle callbacks (previewed for later)?**
Special methods the browser calls automatically at key moments:

| Callback | When it runs |
|----------|--------------|
| `connectedCallback()` | The element is added to the page |
| `disconnectedCallback()` | The element is removed |
| `attributeChangedCallback()` | A watched attribute changes |

You don't need these yet — just know they exist and solve the avatar timing
question above.

