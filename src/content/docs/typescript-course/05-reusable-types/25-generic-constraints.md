---
title: "25. Generic Constraints"
description: "Restrict what a type parameter may be."
sidebar:
  order: 2
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 24.

## Plain-language explanation

`T extends { length: number }` means "any type, as long as it has a numeric `length`". Inside the function you may use `.length`, and the result keeps the caller's exact type. This is structural typing (Lesson 15) applied to generics.

## Focused example / procedure

```ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest("abc", "de"), longest([1, 2], [3]));
```

`longest(1, 2)` is rejected: numbers have no `length`.

## Expected output or behaviour

`abc [ 1, 2 ]`

## Practice task

What happens if you remove `extends { length: number }`?

<details>
<summary>Answer / check</summary>

`a.length` becomes an error: with no constraint, `T` could be any type and might not have `length`.

</details>

## Next lesson

- [26. Utility Types](../26-utility-types/)
