---
title: "20. null, undefined and strict Mode"
description: "Let the checker find the missing-value crashes JavaScript hides."
sidebar:
  order: 3
---

**Estimated time:** 9 minutes

## Prerequisites

Lesson 19.

## Plain-language explanation

The most common runtime error in JavaScript is reading a property of `undefined`. With `strict` (which includes `strictNullChecks`), `null` and `undefined` are separate types, so a function that might return nothing has to say so (`T | undefined`), and callers must deal with it. This single setting prevents more production bugs than any other part of TypeScript.

## Focused example / procedure

```ts
function findUser(id: number): { name: string } | undefined {
  return id === 1 ? { name: "Ada" } : undefined;
}

const user = findUser(2);
console.log(user?.name ?? "not found");
```

Writing `user.name` directly is rejected: `tsc` reports that `user` is possibly `undefined`. Without `strictNullChecks` the same line compiles and crashes when the user is missing.

## Expected output or behaviour

`not found`

## Practice task

Which tsconfig option turns these checks on, and which one setting turns on this and many others?

<details>
<summary>Answer / check</summary>

`strictNullChecks`; `strict: true` enables it along with other strict checks.

</details>

## Next lesson

- [21. Narrowing](../21-narrowing/)
