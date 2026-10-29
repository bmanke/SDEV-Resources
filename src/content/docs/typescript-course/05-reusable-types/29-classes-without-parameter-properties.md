---
title: "29. Classes Without Parameter Properties"
description: "Write TypeScript classes that Node can strip."
sidebar:
  order: 6
---

**Estimated time:** 9 minutes

## Prerequisites

Lesson 5.

## Plain-language explanation

Classes work the same as in JavaScript, with typed fields and the modifiers `public`, `private`, `protected`, `readonly` and `override`. These modifiers are erasable, but `private` is only a compile-time rule. Use JavaScript's `#name` for true runtime privacy. The shortcut `constructor(private x: number)` (a parameter property) is not erasable, so declare the field and assign it yourself.

## Focused example / procedure

```ts
class Counter {
  #count = 0;                 // truly private at runtime
  readonly step: number;      // erased modifier

  constructor(step: number) {
    this.step = step;
  }

  next(): number {
    this.#count += this.step;
    return this.#count;
  }
}

const c = new Counter(2);
c.next();
console.log(c.next());
```

## Expected output or behaviour

`4`

## Practice task

Why can a TypeScript `private` property still be read by JavaScript code, but `#count` cannot?

<details>
<summary>Answer / check</summary>

`private` disappears when types are erased, so nothing enforces it at runtime. `#count` is a JavaScript language feature that the engine enforces.

</details>

## Next lesson

- [30. Reading tsconfig.json](../../06-tooling-and-migration/30-reading-tsconfig/)
