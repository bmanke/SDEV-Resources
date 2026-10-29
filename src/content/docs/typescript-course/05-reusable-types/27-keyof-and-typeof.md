---
title: "27. keyof and typeof"
description: "Build types from the keys and values you already have."
sidebar:
  order: 4
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 26.

## Plain-language explanation

`keyof T` is a union of the property names of `T`. `typeof value` (in a *type* position) gives the type of an existing value. Together they let a function accept only valid keys, so a typo in a string becomes a compile error. Do not confuse it with JavaScript's `typeof` operator in an *expression*, which still exists at runtime.

## Focused example / procedure

```ts
const config = { host: "localhost", port: 3000 };

type ConfigKey = keyof typeof config;   // "host" | "port"

function read(key: ConfigKey) {
  return config[key];
}

console.log(read("port"));
```

`read("hots")` is rejected. In JavaScript it would return `undefined`.

## Expected output or behaviour

`3000`

## Practice task

What is the type of `read("host")`'s result?

<details>
<summary>Answer / check</summary>

`string | number`, because the return type covers every property's type.

</details>

## Next lesson

- [28. String Unions Instead of Enums](../28-string-unions-instead-of-enums/)
