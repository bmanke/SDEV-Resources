---
title: "7. Primitive and Literal Types"
description: "Meet string, number, boolean, bigint and types that are exact values."
sidebar:
  order: 2
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 6.

## Plain-language explanation

TypeScript names JavaScript's primitives: `string`, `number`, `boolean`, `bigint`, `symbol`, `null` and `undefined`. There is just one `number` type, exactly as in JavaScript (no separate int and float). A **literal type** narrows a type to exact values such as `"up"` or `3`. Combined with a union (next lessons) it lets you say "one of these exact strings", which JavaScript can only document in a comment.

## Focused example / procedure

```ts
const id: number = 1;
const user: string = "Ada";
const active: boolean = true;
const big: bigint = 10n;

type Direction = "up" | "down";
const heading: Direction = "up";

console.log(typeof id, typeof big, heading);
```

`const heading: Direction = "north"` is rejected by `tsc`; plain JavaScript would accept any string.

## Expected output or behaviour

`number bigint up`

## Practice task

Define a type `Level` that allows only 1, 2 or 3.

<details>
<summary>Answer / check</summary>

`type Level = 1 | 2 | 3;` Then `const l: Level = 4` is an error.

</details>

## Next lesson

- [8. Arrays and Tuples](../08-arrays-and-tuples/)
