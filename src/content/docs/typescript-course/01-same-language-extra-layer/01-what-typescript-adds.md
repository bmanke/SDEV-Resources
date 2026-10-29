---
title: "1. What TypeScript Adds"
description: "See that TypeScript is JavaScript with a checked type layer on top."
sidebar:
  order: 1
---

**Estimated time:** 6 minutes

## Prerequisites

Basic JavaScript: variables, functions and objects.

## Plain-language explanation

TypeScript is a superset of JavaScript: every valid JavaScript program is also a valid TypeScript program, and TypeScript adds syntax for describing the *types* of values. The types exist for tools and for you. They are checked before the program runs and then removed, so the JavaScript that actually runs is the same JavaScript you would have written by hand. That one idea explains most differences in this course: TypeScript changes what you are told **while writing**, not what happens **while running**.

## Focused example / procedure

**In JavaScript** nothing stops this mistake until the program reaches it:

```js
function area(width, height) {
  return width * height;
}
console.log(area(3, "4"));   // 12 (the string is coerced, so nobody notices)
console.log(area(3));        // NaN
```

**In TypeScript** the same function declares what it expects:

```ts
function area(width: number, height: number): number {
  return width * height;
}
console.log(area(3, 4));
```

An editor or `tsc` would underline `area(3, "4")` and `area(3)` as soon as you type them.

## Expected output or behaviour

`12` for the TypeScript version. The JavaScript calls print `12` and `NaN` and give no warning.

## Practice task

In one sentence, what happens to `: number` when the program runs?

<details>
<summary>Answer / check</summary>

It is gone. The type annotation is only information for the checker; the running code is plain JavaScript.

</details>

## Next lesson

- [2. Run a .ts File with Node](../02-run-a-ts-file-with-node/)
