---
title: "Understanding Parents, Children, and Siblings in HTML"
description: "Course resource: Understanding Parents, Children, and Siblings in HTML"
---

When you look at an HTML page, every element lives inside another element. Those nesting relationships are what JavaScript uses to "walk around" the page and make changes.

This guide uses the actual HTML from this lesson (`index.html`) so you can see the relationships in code you already have.

---

## The family tree idea

HTML is shaped like a family tree (developers call it the **DOM tree**). Each element is a "node" on the tree, and every node has relatives:

- A **parent** is the element that wraps around another element.
- A **child** is an element that sits directly inside another element.
- **Siblings** are children that share the same parent.

Three rules to keep in mind:

1. An element can only have **one** parent.
2. An element can have **many** children.
3. Siblings are only siblings if they share the **same direct parent**.

---

## A concrete example from this lesson

Here is a small piece of `index.html`:

```html
<ul id="feature-list">
  <li class="feature">Fast</li>
  <li class="feature">Accessible</li>
  <li class="feature">Reliable</li>
</ul>
```

Let's name the relationships:

- `<ul id="feature-list">` is the **parent**.
- The three `<li>` elements are its **children**.
- The three `<li>` elements are **siblings** to each other (they all share the same parent `<ul>`).

You can picture it like this:

```
ul#feature-list   <-- parent
├── li "Fast"          <-- child #1, sibling of #2 and #3
├── li "Accessible"    <-- child #2, sibling of #1 and #3
└── li "Reliable"      <-- child #3, sibling of #1 and #2
```

---

## "Direct" vs. "nested" matters

Look at this slightly bigger piece of the lesson HTML:

```html
<header>
  <section class="hero">
    <div>
      <h1 id="page-title">...</h1>
      <p class="tagline">Selecting and modifying elements</p>
    </div>
    <img id="hero-img" src="/manipulation.jpg" alt="Hero image" />
    <p id="hero-caption">This caption will be updated via JavaScript.</p>
  </section>
</header>
```

Common beginner mistakes are easy to make here. Let's be precise:

- `<header>` is the parent of `<section class="hero">`.
- `<section class="hero">` is the parent of `<div>`, `<img>`, and `<p id="hero-caption">`.
- `<div>` is the parent of `<h1>` and `<p class="tagline">`.

Now the tricky part:

- Is `<h1 id="page-title">` a **child** of `<section class="hero">`?  
  **No.** It is *inside* the section, but its direct parent is the `<div>`. We'd call it a **descendant** of the section, not a child.
- Are `<p class="tagline">` and `<p id="hero-caption">` siblings?  
  **No.** They live in different parents (`<div>` vs `<section>`), so they are *not* siblings, even though they look close together on the page.
- Are `<img id="hero-img">` and `<p id="hero-caption">` siblings?  
  **Yes.** They share the same direct parent: `<section class="hero">`.

The rule of thumb: **look up exactly one level.** If two elements stop at the same parent, they are siblings.

---

## How JavaScript talks about these relationships

Once you know the words, JavaScript gives you properties that match them almost one-for-one. Using the feature list again:

```js
const featureList = document.querySelector('#feature-list');
```

| What you want | Property | What you get |
|---|---|---|
| The first child element | `featureList.firstElementChild` | the `<li>` "Fast" |
| The last child element | `featureList.lastElementChild` | the `<li>` "Reliable" |
| All child elements | `featureList.children` | a list of all three `<li>` items |
| The parent of an element | `someLi.parentElement` | the `<ul id="feature-list">` |
| The next sibling | `someLi.nextElementSibling` | the `<li>` that comes right after |
| The previous sibling | `someLi.previousElementSibling` | the `<li>` that comes right before |

> **Tip:** Prefer the properties that end in `Element` (`firstElementChild`, `nextElementSibling`, etc.). The ones without `Element` (like `firstChild`) can return blank text and line breaks between tags, which surprises beginners.

---

## Walking through the lesson code

You'll see lines like this in the lesson:

```js
featureList.removeChild(featureList.firstElementChild);
```

Read it like a sentence:

> "From `featureList` (the parent `<ul>`), remove its first child element."

And:

```js
featureList.firstChild.nextElementSibling.textContent += ' (updated)';
```

Read this one piece at a time:

1. `featureList.firstChild` → the first thing inside the `<ul>`.
2. `.nextElementSibling` → step over to the element right next to it.
3. `.textContent += ' (updated)'` → add some text to that sibling.

When you can read code as a sentence about family relationships, the DOM stops feeling mysterious.

---

## A quick self-check

Open `index.html` and answer these out loud (or with a study partner):

1. What is the parent of `<h2>Featured List</h2>`?
2. Is `<h2>Featured List</h2>` a sibling of `<ul id="feature-list">`?
3. Is `<p class="desc">` a child of `<main>`?
4. Name two siblings of `<section class="hero">`.
5. What does `document.querySelector('#dynamic-box').parentElement` return?

<details>
<summary>Answers</summary>

1. The `<section>` that contains it (the first `<section>` inside `<main>`).
2. Yes — they share the same parent `<section>`.
3. No. Its direct parent is `<div id="dynamic-box">`. It is a *descendant* of `<main>`, not a child.
4. None inside the `<body>` — `<header>` is its only direct sibling here is... wait: `<section class="hero">`'s parent is `<header>`, and `<header>` has no other children in this file, so `<section class="hero">` has no siblings. (Trick question — that's a useful thing to notice!)
5. The `<section>` that wraps the "Dynamic Area" heading and the box.

</details>

---

## Summary

- **Parent** = the element directly around another.
- **Child** = an element directly inside another.
- **Sibling** = children that share the same direct parent.
- "Inside of" is not the same as "child of" — only count **one level up**.
- JavaScript properties like `parentElement`, `children`, `firstElementChild`, and `nextElementSibling` map directly to these family words, which is how you move through the page in code.

