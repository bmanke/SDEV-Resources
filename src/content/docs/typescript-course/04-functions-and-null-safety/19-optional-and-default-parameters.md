---
title: "19. Optional and Default Parameters"
description: "Make some arguments optional and give others defaults."
sidebar:
  order: 2
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 18.

## Plain-language explanation

A parameter with a default value (`punctuation = "!"`) is optional and its type is inferred from the default. A parameter marked `title?: string` may be omitted and has type `string | undefined` inside the function. Required parameters must come before optional ones. Default values are a normal JavaScript feature; the types just describe them.

## Focused example / procedure

```ts
function greet(name: string, punctuation = "!", title?: string): string {
  const prefix = title ? title + " " : "";
  return `${prefix}${name}${punctuation}`;
}

console.log(greet("Ada"), greet("Lee", "?", "Dr."));
```

## Expected output or behaviour

`Ada! Dr. Lee?`

## Practice task

Why does `greet()` with no arguments fail the check?

<details>
<summary>Answer / check</summary>

`name` has no default and is not optional, so it is required. JavaScript would run it and produce `undefined!`.

</details>

## Next lesson

- [20. null, undefined and strict Mode](../20-null-undefined-and-strict/)
