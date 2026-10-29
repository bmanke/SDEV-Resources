---
title: "33. JSDoc Types in Plain JavaScript"
description: "Get type checking without writing any TypeScript syntax."
sidebar:
  order: 4
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 3.

## Plain-language explanation

TypeScript can also check `.js` files, reading types from JSDoc comments. Add `// @ts-check` at the top of a file (or set `checkJs` in `tsconfig.json`). This is the lowest-friction way to start: the file stays JavaScript, runs anywhere with no stripping, and still gets errors in the editor. It is also a fair answer to "do I have to convert everything?" — no.

## Focused example / procedure

`src/math.js`:

```js
// @ts-check

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function add(a, b) {
  return a + b;
}

console.log(add(2, 3));
// add("2", 3);   // uncomment: the editor now reports an error
```

Run `node src/math.js`.

## Expected output or behaviour

`5`

## Practice task

What is the main trade-off compared with `.ts` files?

<details>
<summary>Answer / check</summary>

JSDoc types are more verbose and cover fewer advanced features, but you need no build or stripping support at all.

</details>

## Next lesson

- [34. Migrating a JavaScript File to TypeScript](../34-migrating-a-js-file-to-ts/)
