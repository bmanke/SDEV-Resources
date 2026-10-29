---
title: "4. Types Are Erased"
description: "Prove to yourself that types do not exist at runtime."
sidebar:
  order: 4
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 3.

## Plain-language explanation

After stripping, only JavaScript remains, so the usual JavaScript rules apply at runtime. A type annotation cannot convert, validate or reject a value. The `// @ts-expect-error` comment below tells the checker "I know the next line is wrong", which lets us run bad code on purpose to see what JavaScript does with it. If the next line were *not* an error, the checker would complain about the unused comment.

## Focused example / procedure

```ts
function double(n: number): number {
  return n * 2;
}

console.log(double(4));

// @ts-expect-error: deliberately passing a string to see the runtime behaviour
console.log(double("4"));

console.log(typeof double(4));
```

## Expected output or behaviour

```
8
8
number
```
The string `"4"` was coerced by JavaScript's `*` operator. The type `number` never existed at runtime, so nothing refused the string.

## Practice task

Why can't you write `if (typeof value === "Product")` for a TypeScript type named `Product`?

<details>
<summary>Answer / check</summary>

`typeof` runs at runtime and only knows JavaScript's built-in kinds ("string", "number", "object" and so on). Your `Product` type was erased, so you must check the actual properties.

</details>

## Next lesson

- [5. What Node Cannot Strip](../05-what-node-cannot-strip/)
