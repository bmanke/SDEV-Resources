---
title: "18. Parameter and Return Types"
description: "State what a function takes and returns."
sidebar:
  order: 1
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 17.

## Plain-language explanation

Annotate every parameter; annotate the return type when it helps readers or when you want the compiler to verify your own implementation. This removes a whole class of JavaScript bugs caused by operators like `+` quietly doing something different for strings and numbers.

## Focused example / procedure

```ts
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 3));

// @ts-expect-error: a string is not a number
console.log(add("2", 3));
```

In plain JavaScript the second call runs and prints `"23"` (string concatenation), which is the kind of bug the types are there to catch.

## Expected output or behaviour

```
5
23
```

## Practice task

What is the return type of `function ok(x: number) { return x > 0; }` if you do not write one?

<details>
<summary>Answer / check</summary>

`boolean`, inferred from the returned expression.

</details>

## Next lesson

- [19. Optional and Default Parameters](../19-optional-and-default-parameters/)
