---
title: "37. Capstone: Convert and Fix"
description: "Convert the app to TypeScript, let the checker find the bugs and fix them."
sidebar:
  order: 2
---

**Estimated time:** 12 minutes

## Prerequisites

Lesson 36.

## Plain-language explanation

Rename `app.js` to `app.ts`, run `npm run check`, and work through the errors. Define an `Item` type, type the functions, and make the missing case explicit. When `tsc` is clean, run the program with Node. This is the whole course in one exercise: the checker found both bugs before the program ran.

## Focused example / procedure

`src/app.ts`:

```ts
type Item = { id: number; name: string; price: number; qty: number };

const items: Item[] = [
  { id: 1, name: "Chain", price: 32, qty: 1 },
  { id: 2, name: "Tyre", price: 45, qty: 2 },
];

function lineTotal(item: Item): number {
  return item.price * item.qty;
}

function cartTotal(list: Item[]): number {
  return list.reduce((sum, i) => sum + lineTotal(i), 0);
}

function find(list: Item[], id: number): Item | undefined {
  return list.find((i) => i.id === id);
}

console.log(cartTotal(items));
console.log(find(items, 3)?.name ?? "not found");
```

Run `npm run check`, then `node src/app.ts`.

## Expected output or behaviour

```
122
not found
```
The total is unchanged (the data was always meant to be numeric), but the program no longer crashes.

## Practice task

Which parts of the finished program still exist when Node runs it, and which do not?

<details>
<summary>Answer / check</summary>

The functions, data and logic all run. The `Item` type and every annotation are erased. Anything unsafe about incoming data would still need runtime validation (Lesson 35).

</details>

## Next lesson

- You have finished the course.
