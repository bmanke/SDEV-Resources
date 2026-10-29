---
title: "34. Migrating a JavaScript File to TypeScript"
description: "Convert one file safely, in small steps."
sidebar:
  order: 5
---

**Estimated time:** 10 minutes

## Prerequisites

Lessons 12, 18 and 30.

## Plain-language explanation

Migrate one file at a time. Rename it to `.ts`, run `tsc`, and fix the errors from the top. Add types where inference cannot help, usually function parameters and data shapes. Avoid reaching for `any`; use `unknown` and narrow, or leave a `// TODO` with a real type to add later. Because JavaScript is valid TypeScript, the program works the whole time.

## Focused example / procedure

Before, `inventory.js`:

```js
function total(items) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}
console.log(total([{ price: 2.5, qty: 2 }, { price: 1, qty: 3 }]));
```

After, `inventory.ts`:

```ts
type Item = { price: number; qty: number };

function total(items: Item[]): number {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}
console.log(total([{ price: 2.5, qty: 2 }, { price: 1, qty: 3 }]));
```

With `strict` on, the untyped JavaScript parameters would be flagged as implicitly `any` (TS7006) until you add the types.

## Expected output or behaviour

`8` from both versions.

## Practice task

List the four steps in order.

<details>
<summary>Answer / check</summary>

Rename to `.ts`; run `tsc`; add parameter and data types; fix remaining errors and re-run the program.

</details>

## Next lesson

- [35. Runtime Validation](../35-runtime-validation/)
