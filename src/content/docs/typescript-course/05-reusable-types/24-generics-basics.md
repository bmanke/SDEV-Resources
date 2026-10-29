---
title: "24. Generics Basics"
description: "Write one function that works with many types without losing type information."
sidebar:
  order: 1
---

**Estimated time:** 9 minutes

## Prerequisites

Lesson 18.

## Plain-language explanation

A generic function takes a **type parameter**, usually written `T`, that is filled in by the caller. It lets you say "whatever type goes in comes back out" instead of falling back to `any`. In JavaScript the function is identical; you simply have no way to describe the relationship. Type parameters are erased, so nothing about generics exists at runtime.

## Focused example / procedure

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

console.log(first([3, 4]), first(["a"]), first([]));
```

`first([3, 4])` is typed `number | undefined` and `first(["a"])` is `string | undefined`. With `any` both would be `any`, and you would lose all checking.

## Expected output or behaviour

`3 a undefined`

## Practice task

Write a generic `last<T>`.

<details>
<summary>Answer / check</summary>

`function last<T>(items: T[]): T | undefined { return items[items.length - 1]; }`

</details>

## Next lesson

- [25. Generic Constraints](../25-generic-constraints/)
