---
title: "12. Object Types"
description: "Describe the shape of an object and have it enforced."
sidebar:
  order: 1
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 11.

## Plain-language explanation

In JavaScript an object's shape is whatever happens to be on it. TypeScript lets you write the shape as a type: property names with their types. A typo in a property name or a missing property then becomes an error where you write the code rather than an `undefined` that surfaces later.

## Focused example / procedure

```ts
type User = { id: number; name: string };

const user: User = { id: 1, name: "Ada" };

function greet(u: User): string {
  return `Hi ${u.name}`;
}

console.log(greet(user));
```

In JavaScript, `greet({ id: 2 })` prints `Hi undefined`. In TypeScript that call is rejected because `name` is missing.

## Expected output or behaviour

`Hi Ada`

## Practice task

What does `tsc` say if you write `u.nmae` inside `greet`?

<details>
<summary>Answer / check</summary>

It reports that property `nmae` does not exist on type `User` (TS2339). In JavaScript you would silently get `undefined`.

</details>

## Next lesson

- [13. Optional and readonly Properties](../13-optional-and-readonly/)
