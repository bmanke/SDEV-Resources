---
title: "16. Index Signatures and Record"
description: "Type objects used as dictionaries."
sidebar:
  order: 5
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 15.

## Plain-language explanation

When keys are not known in advance, describe them with an index signature `{ [key: string]: number }` or the shorter `Record<string, number>`. Reading a missing key gives `undefined` at runtime even though the type says `number`, a known gap you can close with the `noUncheckedIndexedAccess` option. For a fixed, known set of keys use `Record<"a" | "b", number>` so every key is required.

## Focused example / procedure

```ts
const stock: Record<string, number> = { chain: 10, tyre: 0 };
stock["pads"] = 4;

console.log(Object.keys(stock).length, stock["chain"]);

const missing = stock["bell"];
console.log(missing);
```

## Expected output or behaviour

```
3 10
undefined
```
The second value is `undefined`, although `stock[...]` is typed `number`.

## Practice task

How would you require exactly the keys `"mon"` and `"tue"`?

<details>
<summary>Answer / check</summary>

`Record<"mon" | "tue", number>`. Leaving one out is a compile-time error.

</details>

## Next lesson

- [17. Discriminated Unions](../17-discriminated-unions/)
