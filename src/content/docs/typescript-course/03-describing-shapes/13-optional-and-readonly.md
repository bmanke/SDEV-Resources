---
title: "13. Optional and readonly Properties"
description: "Mark properties that may be missing or must not be reassigned."
sidebar:
  order: 2
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 12.

## Plain-language explanation

`name?: string` means the property may be absent, so its type is `string | undefined`. `readonly` forbids assigning to the property after creation. Remember that `readonly` is a compile-time rule only: it does not make the object immutable at runtime. If you need that, use `Object.freeze` as in JavaScript.

## Focused example / procedure

```ts
type Profile = {
  readonly id: number;
  nickname?: string;
};

const p: Profile = { id: 1 };
console.log(p.nickname ?? "(none)");
```

`p.id = 2` is an error in TypeScript. In JavaScript it would simply change the value.

## Expected output or behaviour

`(none)`

## Practice task

Why is `p.nickname.length` an error but `p.nickname?.length` is not?

<details>
<summary>Answer / check</summary>

`nickname` may be `undefined`, so a plain property access could crash. The optional chain handles the missing case (Lesson 22).

</details>

## Next lesson

- [14. interface versus type](../14-interface-versus-type/)
