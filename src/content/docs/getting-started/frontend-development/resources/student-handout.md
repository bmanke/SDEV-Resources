---
title: "Constructors — Student Reference & Practice"
description: "Course resource: Constructors — Student Reference & Practice"
---

You already know **objects** (`{ name: 'Zelda' }`) and **functions**. Today's
lesson builds one new idea on top of those: a reusable **maker** for objects.
That maker is a **class** with a **constructor**.

---

## The big picture (one analogy)

> A **class** is a house **blueprint**. `new` **builds a house** from it. The
> **constructor** is the checklist that runs every time a house is built.
> `this` is **the specific house** being built right now.

```
     class User  ── new User('Zelda',…) ──▶  zelda   (an instance)
     (blueprint)  ── new User('Link',…)  ──▶  link    (an instance)
```

## Vocabulary

| Word | What it means | In plain terms |
|------|---------------|----------------|
| `class` | the blueprint | the plan for building objects |
| `new` | build one | make a fresh object from the blueprint |
| **instance** | a built one | `zelda` and `link` are instances of `User` |
| `constructor` | setup steps | runs **automatically** during `new` |
| `this` | the current one | the specific object being built right now |
| `extends` | build on top of | start from another blueprint and add to it |
| `super()` | build the base first | run the parent blueprint's constructor |

## Anatomy of a class

```js
class User {                          // 1. the blueprint
  constructor(name, description) {    // 2. runs every time you build one
    this.name = name;                 // 3. put data on THIS specific object
    this.description = description;
  }
}

const zelda = new User('Zelda', 'Princess of Hyrule');  // 4. build one
console.log(zelda.name);              // "Zelda"
```

## Building on top of another blueprint

```js
class LakeHouse extends House {   // a LakeHouse is a House + extras
  constructor(address) {
    super(address);               // build the base House FIRST
    this.dock = true;             // THEN add my custom part
  }
}
```

> **The one rule:** in a class that `extends` another, the constructor must call
> `super()` **before** using `this`. *Build the house before you decorate it.*

## Why today's component looks the way it does

```js
class UserCard extends HTMLElement {   // built on the browser's element blueprint
  constructor() {
    super();                           // let the browser build the base element first
    const shadow = this.attachShadow({ mode: 'open' });  // method from the base, on THIS card
    // ...set up this card's content...
  }
}
```

`HTMLElement` is a blueprint the **browser** provides. `UserCard extends
HTMLElement` is our specialized version — just like `LakeHouse extends House`.
You don't call `new UserCard()` yourself; the **browser** builds one every time
it sees a `<user-card>` tag (once the component is registered).

---

## Practice

### A. Label the keywords
In the line below, write what each labeled word does:

```js
class Dog extends Animal { constructor(name) { super(); this.name = name; } }
//    (1)    (2)             (3)               (4)        (5)
```

1. `class` → ______________________________________________
2. `extends` → ____________________________________________
3. `constructor` → ________________________________________
4. `super()` → ____________________________________________
5. `this` → _______________________________________________

### B. Predict the output
```js
class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
}
const p = new Player('Becky');
console.log(p.name);
console.log(p.score);
```
Output line 1: __________  Output line 2: __________

### C. Fill in the blanks
```js
class Book {
  __________(title, author) {   // (i) keyword that defines setup
    ______.title = title;        // (ii) attach to the current object
    ______.author = author;
  }
}
const b = ______ Book('Dune', 'Herbert');  // (iii) keyword that builds one
```

### D. Find the bug
This throws `ReferenceError: Must call super constructor ... before accessing
'this'`. Why? How do you fix it?
```js
class Cat extends Animal {
  constructor(name) {
    this.name = name;
    super();
  }
}
```
Bug: ___________________________________________________________
Fix: ___________________________________________________________

### E. Connect it
In `class UserCard extends HTMLElement`, what is the "base blueprint" that
`super()` builds first, and **who** calls `new` to build a `UserCard`?
________________________________________________________________

---

<details>
<summary><strong>Answer key</strong> (try first, then check)</summary>

**A.** (1) the blueprint for building Dogs; (2) build on top of the Animal
blueprint; (3) the setup steps that run each time a Dog is built; (4) build the
base Animal part first; (5) the specific Dog being built right now.

**B.** Line 1: `Becky`  Line 2: `0`

**C.** (i) `constructor` (ii) `this` (both blanks) (iii) `new`

**D.** `this` is used before `super()`. A class that `extends` another must call
`super()` before touching `this`, because the parent creates the object. Fix:
move `super();` above `this.name = name;`.

**E.** The base blueprint is `HTMLElement` (provided by the browser); `super()`
builds that standard element first. The **browser** calls `new` for you every
time it encounters a `<user-card>` tag (after the component is registered with
`customElements.define('user-card', UserCard)`).

</details>

