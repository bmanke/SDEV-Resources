---
title: "What Is the Shadow DOM? (A Beginner's Guide)"
description: "Course resource: What Is the Shadow DOM? (A Beginner's Guide)"
---

You already know the **DOM** — the tree of HTML elements the browser builds from
your page. When you write `document.querySelector('.card')`, you are reaching
into that tree.

The **Shadow DOM** is a *second, private* tree that lives **inside** one
element. It is sealed off from the main page. This guide explains what that
means and why it is so useful.

---

## The one analogy (keep this in mind the whole time)

> A web component is like a **sealed gadget** — think of a microwave you plug
> into your kitchen. It has controls on the **outside** (buttons, a dial), but
> all the wiring is sealed **inside** its own case. Your kitchen's wiring can't
> mess with the microwave's insides, and the microwave's insides can't mess with
> your kitchen.
>
> The **Shadow DOM is that sealed case.** Everything you put inside it is
> protected from the rest of the page, and the rest of the page is protected
> from it.

---

## The problem the Shadow DOM solves

CSS on a normal web page is **global**. A style written anywhere affects
**everything** on the page that matches.

Imagine two developers each build a component and each writes:

```css
.card { background: white; }
.name { font-weight: bold; }
```

`.card` and `.name` are such common names that they **collide**. One
component's styles leak into the other. On a big project this becomes a constant
game of "why did my button suddenly turn blue?"

The Shadow DOM fixes this by giving each component its **own private space**
where its HTML and CSS live, sealed away from everyone else.

---

## Regular DOM vs. Shadow DOM (a picture)

**Without Shadow DOM** — everything is in one shared tree, and every style is global:

```
document
└── body
    ├── <style> .card { ... }      ← affects EVERY .card on the page
    ├── <div class="card"> ...     ← my component
    └── <div class="card"> ...     ← someone else's component (also affected!)
```

**With Shadow DOM** — the component's insides live in a sealed sub-tree:

```
document
└── body
    └── <user-card>                ← the "shadow host" (visible tag)
        ┊
        ┊  #shadow-root  ← the sealed boundary (the gadget's case)
        ┊  ┌─────────────────────────────────────────┐
        ┊  │ <style> .card { ... }  ← ONLY affects    │
        ┊  │ <div class="card"> ...    inside here    │
        ┊  └─────────────────────────────────────────┘
```

The dotted line is the **shadow boundary**. Styles and `querySelector`s don't
cross it in either direction.

---

## Vocabulary

| Word | What it means | In plain terms |
|------|---------------|----------------|
| **Shadow host** | the normal element the shadow is attached to | your `<user-card>` tag — the gadget's outside |
| **Shadow root** | the top of the private tree (`#shadow-root` in DevTools) | the door into the sealed case |
| **Shadow tree** | all the elements inside the shadow root | the wiring inside the case |
| **Shadow boundary** | the invisible wall between the page and the shadow tree | the case's wall — styles/queries can't cross it |
| **Light DOM** | the "normal" children you write between the tags | the stuff you hand *to* the gadget from outside |

```html
<user-card>                         ← shadow host (the gadget)
  <span slot="name">Zelda</span>    ← light DOM (content you pass in)
</user-card>

  #shadow-root                      ← shadow root
    <style>…</style>                ← shadow tree
    <div class="card">…</div>       ← shadow tree
```

---

## How you create one

In `src/user-card.js` this single line opens the sealed case:

```js
const shadow = this.attachShadow({ mode: 'open' });
```

- `this` is the specific `<user-card>` being built (the **shadow host**).
- `attachShadow` gives it a brand-new, empty **shadow root**.
- `shadow` is now a place you can `appendChild(...)` things into. Anything you
  put there lives inside the sealed case.

> See the [Web Components Cheat Sheet](/getting-started/frontend-development/resources/web-components-cheatsheet/) for the
> line-by-line breakdown of `attachShadow` and friends.

---

## The two superpowers

### 1. Styles are trapped inside (both directions)

- A `<style>` **inside** the shadow root only styles that component. Its `.card`
  rule cannot leak out and repaint other cards on the page.
- A `.card` rule in the page's global `main.css` **cannot reach in** and restyle
  the component.

**Try it:** change the `.card` background color in `public/css/main.css`. Once
the styles have been moved into the component's shadow DOM, the page rule has
**no effect** on the cards. That is style encapsulation in action.

### 2. The DOM is hidden from the page

From the page's JavaScript, the insides are invisible:

```js
document.querySelector('.card');   // → null! The .card lives in the shadow tree.
```

The page can see the `<user-card>` tag, but not the `<div class="card">` sealed
inside it. This is why components don't accidentally break each other.

---

## `open` vs. `closed` mode

```js
this.attachShadow({ mode: 'open' });    // what we use
this.attachShadow({ mode: 'closed' });  // stricter
```

| Mode | What it changes |
|------|-----------------|
| `open` | You can reach the shadow root later from outside via `element.shadowRoot`. Great for learning and debugging. |
| `closed` | `element.shadowRoot` returns `null` — the case is locked. Rarely needed. |

**For this lesson always use `open`.** Both modes still seal off styles the same
way; `closed` just hides the JavaScript door too.

---

## See it with your own eyes (DevTools)

1. Run the app (`npm run dev`) and open it in the browser.
2. Right-click a card → **Inspect**.
3. In the Elements panel, find the `<user-card>` tag and click the ▸ arrow.
4. You'll see **`#shadow-root (open)`** nested inside it. Expand that to see the
   `<style>` and `<div class="card">` that live in the sealed case.

That `#shadow-root` line **is** the shadow boundary. Everything under it is the
shadow tree.

---

## But wait — how does my content get *inside* the sealed case?

Good question. If the case is sealed, how does "Zelda" (which you wrote in the
**light DOM**) show up inside the component's design?

The answer is **slots** — labeled openings the component leaves in its shadow
tree so your outside content can show through:

```html
<!-- You write this (light DOM): -->
<user-card>
  <span slot="name">Zelda</span>
</user-card>
```

```html
<!-- The component's shadow tree has a matching opening: -->
<slot name="name"></slot>   ← "Zelda" appears here
```

Think of a slot as a **labeled tray** on the gadget: you slide your content into
the `name` tray, and the component decides where that tray shows up in its
design. Slots are covered in detail in the
[Cheat Sheet](/getting-started/frontend-development/resources/web-components-cheatsheet/#4-slots--slot).

---

## Recap

- The **Shadow DOM** is a private, sealed HTML+CSS tree that lives inside one
  element.
- It exists so a component's **styles and structure don't leak out**, and the
  page's styles **don't leak in**.
- `this.attachShadow({ mode: 'open' })` creates it; you `appendChild` your
  content into the returned shadow root.
- The **shadow boundary** blocks both CSS and `querySelector` from crossing.
- **Slots** are the labeled openings that let your outside (light DOM) content
  appear inside the sealed component.

Next: the [Web Components Cheat Sheet](/getting-started/frontend-development/resources/web-components-cheatsheet/) breaks
down every API line by line, and the [Walkthrough](/getting-started/frontend-development/resources/walkthrough/) builds the
whole component step by step.

