---
title: "36. Capstone: The JavaScript App"
description: "Run a small JavaScript program and predict where types would help."
sidebar:
  order: 1
---

**Estimated time:** 10 minutes

## Prerequisites

Lessons 1–35.

## Plain-language explanation

You will convert one small program from JavaScript to TypeScript. First read it and predict what the checker would catch. Notice that the program has two bugs: a price stored as a string that still "works" by accident, and a lookup that can return nothing.

## Focused example / procedure

`src/app.js`:

```js
const items = [
  { id: 1, name: "Chain", price: 32, qty: 1 },
  { id: 2, name: "Tyre", price: "45", qty: 2 },
];

function lineTotal(item) {
  return item.price * item.qty;
}

function cartTotal(list) {
  return list.reduce((sum, i) => sum + lineTotal(i), 0);
}

function find(list, id) {
  return list.find((i) => i.id === id);
}

console.log(cartTotal(items));
console.log(find(items, 3).name);
```

Run `node src/app.js`.

## Expected output or behaviour

`122` and then a `TypeError: Cannot read properties of undefined (reading 'name')`. The string `"45"` was coerced to a number, hiding the first bug.

## Practice task

Write down the two places you expect `tsc` to complain after conversion.

<details>
<summary>Answer / check</summary>

The `price: "45"` entry (a `string` where `number` is expected) and the `find(items, 3).name` access (possibly `undefined`).

</details>

## Next lesson

- [37. Capstone: Convert and Fix](../37-capstone-convert-and-fix/)
