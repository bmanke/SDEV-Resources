---
title: "21. Narrowing"
description: "Use checks to turn a wide type into a specific one."
sidebar:
  order: 4
---

**Estimated time:** 9 minutes

## Prerequisites

Lessons 9 and 20.

## Plain-language explanation

When you check a value, TypeScript follows the logic and gives it a narrower type inside the branch. `typeof`, `Array.isArray`, `instanceof`, the `in` operator, equality checks and truthiness all narrow. The code you write is ordinary JavaScript; TypeScript just reads it more carefully.

## Focused example / procedure

```ts
function describe(v: string | number | string[]): string {
  if (typeof v === "string") return `text(${v.length})`;
  if (Array.isArray(v)) return `list(${v.length})`;
  return `number(${v.toFixed(1)})`;
}

console.log(describe("abc"), describe(["a", "b"]), describe(4));
```

After the first two `if` statements, only `number` remains, so `toFixed` is allowed.

## Expected output or behaviour

`text(3) list(2) number(4.0)`

## Practice task

Add `boolean` to the union. What changes?

<details>
<summary>Answer / check</summary>

The last line now fails because `v` could be `boolean`, which has no `toFixed`. Add another check.

</details>

## Next lesson

- [22. Optional Chaining and Nullish Coalescing](../22-optional-chaining-and-nullish/)
