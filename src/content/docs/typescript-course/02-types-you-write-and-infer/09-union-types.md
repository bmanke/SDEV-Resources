---
title: "9. Union Types"
description: "Accept one of several types and handle each safely."
sidebar:
  order: 4
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 8.

## Plain-language explanation

A union `A | B` means the value is either an `A` or a `B`. JavaScript functions often accept several kinds of input and check with `typeof` inside; a union puts that contract in the signature. Inside the function, TypeScript only lets you use what is true for *both* types until you check which one you have, which is called narrowing (Lesson 21).

## Focused example / procedure

```ts
function format(id: number | string): string {
  return typeof id === "number"
    ? id.toFixed(0).padStart(4, "0")
    : id.toUpperCase();
}

console.log(format(7), format("ab"));
```

Calling `id.toFixed(0)` *before* checking `typeof` is an error, because a string has no `toFixed`.

## Expected output or behaviour

`0007 AB`

## Practice task

Change the parameter to `number | string | boolean`. What does `tsc` now report in the function?

<details>
<summary>Answer / check</summary>

The `else` branch now has `string | boolean`, so `id.toUpperCase()` fails for `boolean`. You would add another check.

</details>

## Next lesson

- [10. any versus unknown](../10-any-versus-unknown/)
