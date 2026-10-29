---
title: "11. Type Assertions"
description: "Tell the checker what you know, and understand that nothing is verified."
sidebar:
  order: 6
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 10.

## Plain-language explanation

`value as Type` says "trust me, this is a `Type`". It changes only what the checker believes; it generates no code and checks nothing at runtime. That makes assertions useful when you truly know more than the compiler, and dangerous when you guess. If you find yourself asserting a lot, you probably need `unknown` plus a real check (Lesson 35).

## Focused example / procedure

```ts
type Item = { id: number };

const good = JSON.parse('{"id": 1}') as Item;
const bad = JSON.parse('{"id": "oops"}') as Item;

console.log(typeof good.id);
console.log(typeof bad.id);
```

Both lines compile, because `JSON.parse` returns `any` and the assertion says it is an `Item`.

## Expected output or behaviour

```
number
string
```
The second value is not an `Item` at all, but the type system believes it is.

## Practice task

Name one safer alternative to asserting parsed JSON.

<details>
<summary>Answer / check</summary>

Parse into `unknown` and validate the shape with a type guard (Lesson 23) or a validation library.

</details>

## Next lesson

- [12. Object Types](../../03-describing-shapes/12-object-types/)
