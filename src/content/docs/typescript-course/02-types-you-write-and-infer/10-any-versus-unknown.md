---
title: "10. any versus unknown"
description: "Choose unknown over any so the checker keeps protecting you."
sidebar:
  order: 5
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 9.

## Plain-language explanation

`any` turns the checker **off** for a value: anything is allowed, which is how plain JavaScript behaves. `unknown` is the safe counterpart: it accepts any value, but you must narrow it before using it. Prefer `unknown` for data you do not control, such as parsed JSON. Turning on `strict` also makes the compiler complain when it would otherwise silently fall back to an implicit `any`.

## Focused example / procedure

```ts
function parse(json: string): unknown {
  return JSON.parse(json);
}

const data = parse('{"n": 5}');

if (typeof data === "object" && data !== null && "n" in data) {
  console.log(data.n);
}
```

With `any` the checker would let `data.foo.bar.baz` through, and it would crash at runtime with a `TypeError`.

## Expected output or behaviour

`5`

## Practice task

What does the checker say about `data.n` if you remove the `if` check?

<details>
<summary>Answer / check</summary>

It reports that `data` is of type `unknown`: you cannot use it until you prove what it is.

</details>

## Next lesson

- [11. Type Assertions](../11-type-assertions/)
