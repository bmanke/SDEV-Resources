---
title: "17. Discriminated Unions"
description: "Model alternatives with a shared tag so the checker can narrow them."
sidebar:
  order: 6
---

**Estimated time:** 9 minutes

## Prerequisites

Lessons 9 and 14.

## Plain-language explanation

A discriminated union gives every variant a common property (the tag) with a different literal value. Checking the tag narrows the whole object, and in a `switch` the compiler knows when you have covered every case. In JavaScript you would document the tag by convention and rely on tests.

## Focused example / procedure

```ts
type Shape =
  | { kind: "circle"; r: number }
  | { kind: "rect"; w: number; h: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.r ** 2;
    case "rect":
      return s.w * s.h;
  }
}

console.log(area({ kind: "rect", w: 2, h: 3 }));
console.log(area({ kind: "circle", r: 1 }).toFixed(2));
```

## Expected output or behaviour

```
6
3.14
```

## Practice task

Add a `{ kind: "square"; side: number }` variant without touching `area`. What does `tsc` report?

<details>
<summary>Answer / check</summary>

That the function does not return a value in all cases (the `square` case is unhandled), so the compiler tells you where to update.

</details>

## Next lesson

- [18. Parameter and Return Types](../../04-functions-and-null-safety/18-parameters-and-return-types/)
