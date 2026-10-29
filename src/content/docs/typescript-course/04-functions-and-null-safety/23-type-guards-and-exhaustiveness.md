---
title: "23. Type Guards and Exhaustiveness"
description: "Write your own checks and make the compiler prove you covered every case."
sidebar:
  order: 6
---

**Estimated time:** 9 minutes

## Prerequisites

Lessons 17 and 21.

## Plain-language explanation

A **type guard** is a function whose return type `v is T` tells the checker that when it returns true, `v` is a `T`. The `never` type represents "this cannot happen"; assigning the leftover value to `never` in a `default` branch makes `tsc` fail if you later add a case and forget to handle it. Both are erased, but the safety they give is permanent.

## Focused example / procedure

```ts
function isString(v: unknown): v is string {
  return typeof v === "string";
}

type Status = "new" | "paid";

function label(s: Status): string {
  switch (s) {
    case "new":
      return "New";
    case "paid":
      return "Paid";
    default: {
      const unreachable: never = s;
      return unreachable;
    }
  }
}

console.log(isString("x"), isString(5), label("paid"));
```

## Expected output or behaviour

`true false Paid`

## Practice task

Add `"shipped"` to `Status`. Where does `tsc` complain, and why is that useful?

<details>
<summary>Answer / check</summary>

In the `default` branch: `"shipped"` is not assignable to `never`. It points at the switch you forgot to update.

</details>

## Next lesson

- [24. Generics Basics](../../05-reusable-types/24-generics-basics/)
