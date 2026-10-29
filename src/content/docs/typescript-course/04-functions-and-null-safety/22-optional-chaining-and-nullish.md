---
title: "22. Optional Chaining and Nullish Coalescing"
description: "Use two JavaScript operators that work especially well with strict types."
sidebar:
  order: 5
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 20.

## Plain-language explanation

`?.` stops and returns `undefined` if the value before it is `null` or `undefined`. `??` supplies a fallback only for `null` or `undefined` (unlike `||`, which also replaces `0`, `""` and `false`). Both are standard JavaScript, so Node runs them without stripping anything; TypeScript's contribution is making sure you used them where a value can really be missing.

## Focused example / procedure

```ts
type Order = { customer?: { address?: { city?: string } } };

const order: Order = { customer: {} };

console.log(order.customer?.address?.city ?? "unknown");
console.log(0 || 10, 0 ?? 10);
```

## Expected output or behaviour

```
unknown
10 0
```
`||` treats `0` as missing; `??` does not.

## Practice task

When would `qty || 1` be a bug?

<details>
<summary>Answer / check</summary>

When `0` is a valid quantity: `||` would replace it with `1`. Use `qty ?? 1`.

</details>

## Next lesson

- [23. Type Guards and Exhaustiveness](../23-type-guards-and-exhaustiveness/)
