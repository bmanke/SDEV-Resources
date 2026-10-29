---
title: "6. Annotations and Inference"
description: "Let TypeScript infer types and add annotations only where they help."
sidebar:
  order: 1
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 5.

## Plain-language explanation

You rarely need to write a type for a variable that is initialised: TypeScript infers it from the value, so `let count = 0` is a `number`. Add an annotation when there is nothing to infer from (such as a function parameter) or when you want to state your intent. This is the biggest day-to-day difference from JavaScript: the same variable can no longer silently change kind.

## Focused example / procedure

```ts
let count = 0;            // inferred: number
const label = "Total";    // inferred: the literal type "Total"
let price: number;        // annotation needed: no initial value

price = 19.99;
count = count + 1;
console.log(`${label}: ${price.toFixed(2)} (${count})`);
```

In JavaScript you could write `count = "one"` later and nothing would complain. In TypeScript `tsc` reports that type `string` is not assignable to type `number`.

## Expected output or behaviour

`Total: 19.99 (1)`

## Practice task

What type does TypeScript infer for `const items = [1, 2, 3]`?

<details>
<summary>Answer / check</summary>

`number[]`. Hover over `items` in your editor to confirm.

</details>

## Next lesson

- [7. Primitive and Literal Types](../07-primitives-and-literal-types/)
