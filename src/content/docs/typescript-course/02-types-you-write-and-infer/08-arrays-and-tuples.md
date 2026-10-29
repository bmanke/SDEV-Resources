---
title: "8. Arrays and Tuples"
description: "Type lists of items and fixed-position pairs."
sidebar:
  order: 3
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 7.

## Plain-language explanation

`number[]` (or `Array<number>`) is an array whose items are all numbers. A **tuple** such as `[string, number]` fixes both the length and the type at each position. At runtime both are ordinary JavaScript arrays; a tuple is only a promise the checker enforces. Mark an array `readonly` to forbid `push`, `pop` and similar mutations in your code.

## Focused example / procedure

```ts
const scores: number[] = [90, 85];
scores.push(100);

const pair: [string, number] = ["Ada", 36];
const [who, age] = pair;

const fixed: readonly string[] = ["a", "b"];

console.log(scores.length, who, age, fixed.length);
```

`scores.push("x")` and `fixed.push("c")` are both rejected by `tsc`.

## Expected output or behaviour

`3 Ada 36 2`

## Practice task

How would you type a coordinate that is always exactly two numbers?

<details>
<summary>Answer / check</summary>

`[number, number]`. A third element, or a string in either slot, becomes a compile-time error.

</details>

## Next lesson

- [9. Union Types](../09-union-types/)
