---
title: "Student Walkthrough — Build a `<user-card>` Web Component"
description: "Course resource: Student Walkthrough — Build a `<user-card>` Web Component"
---

Follow these steps in order. After each step there's a **Check** ("what you
should see") and a **Why** ("what just happened"). If a Check fails, jump to
[Troubleshooting](#troubleshooting) at the bottom — don't push forward on a
broken step.

**What you're building:** your own HTML tag, `<user-card>`, that renders a tidy
profile card. By the end you'll be able to write `<user-card>…</user-card>`
anywhere and get a styled card — reusable, and sealed off so its styles never
collide with the rest of the page.

**Before you start:**
- Finish the `constructors-warmup/` files if you haven't — this lesson assumes
  you understand `class`, `extends`, `constructor`, `super`, and `this`.
- Skim [What Is the Shadow DOM?](/getting-started/frontend-development/resources/shadow-dom/) — even just the analogy and the
  picture. It makes every step below click.
- Keep the [Cheat Sheet](/getting-started/frontend-development/resources/web-components-cheatsheet/) open in another tab for
  quick lookups.

---

## Step 0 — Get the app running

From the project root:

```sh
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

**Check:** the browser shows the default Vite page (no cards yet).
**Why:** we haven't defined or placed any `<user-card>` elements. That's next.

---

## Step 1 — Add the template

A **template** is markup the browser reads but does **not** show — a mold we'll
stamp cards from. Add it inside `<body>` in `index.html`:

```html
<template id="user-card-template">
  <div class="card">
    <img src="assets/zelda-avatar.png" width="80" height="80" alt="avatar">
    <div class="info">
      <span class="name">Zelda</span>
      <span class="description">Princess of Hyrule</span>
    </div>
  </div>
</template>
```

**Check:** save and look at the page — **nothing new appears**. That's correct!
**Why:** `<template>` content is inert; it never renders on its own. The `id`
lets our JavaScript find this mold in the next step.

---

## Step 2 — Define the custom element

Open `src/user-card.js`. Create the class and register the tag:

```js
class UserCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const template = document.getElementById('user-card-template');
    const content = template.content.cloneNode(true);

    shadow.appendChild(content);
  }
}
customElements.define('user-card', UserCard);

export default UserCard;
```

Read it slowly:

| Line | What it does |
|------|--------------|
| `class UserCard extends HTMLElement` | Your card **is** a real element, plus extras. |
| `super()` | Build the base element first (required before `this`). |
| `this.attachShadow({ mode: 'open' })` | Create this card's **sealed private space** ([Shadow DOM](/getting-started/frontend-development/resources/shadow-dom/)). |
| `template.content.cloneNode(true)` | Make a **fresh copy** of the mold's markup. |
| `shadow.appendChild(content)` | Drop that copy into the sealed space. |
| `customElements.define('user-card', UserCard)` | Register the tag. **The name needs a hyphen.** |

**Check:** still nothing on screen — we haven't imported or used the tag yet.
**Why:** defining the class doesn't place any cards; it just teaches the browser
what `<user-card>` *means*.

---

## Step 3 — Register it with the page

The browser only runs `user-card.js` if something loads it. In `src/main.js`:

```js
import './user-card.js';
```

**Check:** still no card, but no errors in the console (F12 → Console).
**Why:** importing the file runs `customElements.define(...)`, so `<user-card>`
is now a real, known tag. We just need to *use* it.

---

## Step 4 — Use the tag

In `index.html`, inside `<main>`, add:

```html
<user-card></user-card>
```

**Check:** 🎉 a card for **Princess Zelda** appears.
**Why:** the browser saw a registered `<user-card>` tag, ran `new UserCard()` for
you, your constructor cloned the template into the shadow DOM, and it rendered.

> **Milestone:** you just built and used your first web component.

---

## Step 5 — Move styles into the Shadow DOM (scoping)

Right now the card is styled by `public/css/main.css` — global CSS that leaks
everywhere. Let's seal the styles inside the component instead.

Copy the `.card` and `.name` rules from `main.css` into a `<style>` block
**inside** the `<template>`:

```html
<template id="user-card-template">
  <style>
    .card {
      background: #ffffff;
      color: #222222;
      border: 1px solid #e6e6e6;
      padding: 12px;
      border-radius: 8px;
      display: flex;
      gap: 12px;
      align-items: center;
      width: 320px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    }
    .name { font-size: 1.2em; font-weight: bold; margin: 0; }
  </style>

  <div class="card"> … </div>
</template>
```

**Check:** the card still looks the same. Now **change the `.card` background in
`main.css`** (say to `hotpink`) and reload — the card **does not change**.
**Why:** the `<style>` rode along into the sealed shadow root, so those styles
only apply to this component. The page's global `.card` rule can't cross the
[shadow boundary](/getting-started/frontend-development/resources/shadow-dom/#the-two-superpowers). That's **style
encapsulation**.

---

## Step 6 — Add an `avatar` attribute

Make the picture configurable. First, empty the template's `img` and pass the
image on the tag instead:

```html
<!-- in the template -->
<img src="" width="80" height="80" alt="avatar">
```

```html
<!-- where you use the tag -->
<user-card avatar="assets/zelda-avatar.png"></user-card>
```

Then read the attribute in `user-card.js`, before `shadow.appendChild(content)`:

```js
const img = content.querySelector('img');
img.src = this.getAttribute('avatar') || 'https://placehold.co/80x80';
```

**Check:** Zelda's avatar shows. Remove the `avatar="..."` and you get a grey
placeholder instead.
**Why:** `getAttribute('avatar')` reads the tag's value; `|| 'https://…'` is the
fallback when it's missing. See
[Attributes](/getting-started/frontend-development/resources/web-components-cheatsheet/#5-attributes--getattribute).

---

## Step 7 — Add slots for the name and description

**Slots** let content you write outside the component appear inside its design.
Update the tag to pass slotted content:

```html
<user-card avatar="assets/zelda-avatar.png">
  <span slot="name">Zelda</span>
  <span slot="description">Princess of Hyrule</span>
</user-card>
```

And swap the template's fixed spans for matching slots:

```html
<div class="info">
  <slot name="name" class="name"></slot>
  <slot name="description" class="description"></slot>
</div>
```

**Check:** the card still reads "Zelda / Princess of Hyrule" — but now the text
comes from *your* content, not hard-coded in the template.
**Why:** `slot="name"` routes your span into `<slot name="name">`. The names must
match exactly. See [Slots](/getting-started/frontend-development/resources/web-components-cheatsheet/#4-slots--slot).

**Now reuse it!** Add a second card and watch how little code it takes:

```html
<user-card avatar="assets/link-avatar.png">
  <span slot="name">Link</span>
  <span slot="description">Hero of Hyrule</span>
</user-card>
```

**Check:** two different cards, same component. That's the payoff of reusability.

---

## Step 8 — Make the component self-contained

Right now the mold lives in `index.html`. If you wanted this component on another
page, you'd have to copy that template too. Let's move the mold **into the JS**
so the whole component is one file.

In `user-card.js`, build the template in code and delete the `<template>` from
`index.html`:

```js
const template = document.createElement('template');
template.innerHTML = `
  <style>
    .card { /* …same rules… */ }
    .name { font-size: 1.2em; font-weight: bold; margin: 0; }
  </style>
  <div class="card">
    <img src="" width="80" height="80" alt="avatar">
    <div class="info">
      <slot name="name" class="name"></slot>
      <slot name="description" class="description"></slot>
    </div>
  </div>
`;
document.body.appendChild(template);

class UserCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const content = template.content.cloneNode(true);   // no getElementById needed now
    const img = content.querySelector('img');
    img.src = this.getAttribute('avatar') || 'https://placehold.co/80x80';
    shadow.appendChild(content);
  }
}
customElements.define('user-card', UserCard);

export default UserCard;
```

**Check:** both cards still render — but `index.html` no longer needs the
`<template>` block.
**Why:** the component now carries its own markup, styles, and logic. Drop
`user-card.js` into any page, import it, and `<user-card>` just works.

---

## Step 9 — Add cards with JavaScript (optional but cool)

You can create cards in code too. In `main.js`:

```js
// As an HTML string:
const dynamicUserCard = `
  <user-card avatar="https://placehold.co/80x80/7700ff/ffffff">
    <span slot="name">Mipha</span>
    <span slot="description">Zora Champion</span>
  </user-card>`;
document.querySelector('main').insertAdjacentHTML('beforeend', dynamicUserCard);

// Purely with the DOM API:
const card = document.createElement('user-card');
card.setAttribute('avatar', 'https://placehold.co/80x80/770000/ffffff');
const nameSpan = document.createElement('span');
nameSpan.setAttribute('slot', 'name');
nameSpan.textContent = 'Yunobo';
const descSpan = document.createElement('span');
descSpan.setAttribute('slot', 'description');
descSpan.textContent = 'President of YunoboCo';
card.appendChild(nameSpan);
card.appendChild(descSpan);
document.querySelector('main').appendChild(card);
```

**Check:** four cards total. Notice **Yunobo's custom avatar doesn't show** (it
falls back to a placeholder).
**Why (a real puzzle):** the constructor reads `getAttribute('avatar')` the
instant the element is built, but here we `createElement` first and
`setAttribute` *after* — too late. Fixing this needs **lifecycle callbacks**,
covered in a later lesson. See the
[explanation in the Cheat Sheet](/getting-started/frontend-development/resources/web-components-cheatsheet/#two-why-questions-from-the-code).

---

## 🧩 Your exercise — extend the component

Add a **"Details" slot** inside the component that shows a short status message,
e.g. *"Ready for adventure!"*

Steps to try on your own:
1. Add a `<slot name="details">` (with a wrapper you can style) to the template.
2. Fill it from each tag: `<span slot="details">Ready for adventure!</span>`.
3. Bonus: give each card a *different* status and add a little CSS in the
   component's `<style>` to make it stand out (smaller, italic, muted color).

If a slot comes up empty, re-check that the `slot="details"` name matches
`<slot name="details">` exactly.

---

## Troubleshooting

| What you see | Check this |
|--------------|-----------|
| No card at all | Did `main.js` `import './user-card.js'`? Is the tag name `user-card` (with a hyphen)? |
| Card is unstyled | Is the `<style>` **inside** the template/shadow DOM, not just in `main.css`? |
| Slot shows nothing | Do `slot="name"` and `<slot name="name">` match **exactly**? |
| Console: "…before accessing 'this'" | Move `super();` to be the constructor's **first** line. |
| `getElementById(...)` is `null` | The template must exist in the HTML **before** the script runs (Step 1 before Step 2). |

More detail on every symptom: [Cheat Sheet → Common errors](/getting-started/frontend-development/resources/web-components-cheatsheet/#common-errors--fixes).

---

## You did it 🎉

You built a reusable, style-sealed custom element from scratch. To lock in the
concepts:
- **Why the hyphen?** and **why styles don't leak** →
  [Shadow DOM guide](/getting-started/frontend-development/resources/shadow-dom/)
- **Every API, line by line** → [Cheat Sheet](/getting-started/frontend-development/resources/web-components-cheatsheet/)

When you're happy with your work, commit and push (see the **Push to Your GitHub
Workbook Repo** section in the main [README](../README.md)).

