---
title: "14. interface versus type"
description: "Pick between the two ways to name an object shape."
sidebar:
  order: 3
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 13.

## Plain-language explanation

For object shapes the two are almost interchangeable. An `interface` can be extended with `extends`, and separate declarations of the same interface merge. A `type` alias can name *anything*: unions, tuples, primitives and computed types, which an interface cannot. A good default is to use `interface` for object shapes you extend and `type` for everything else. Both are erased completely.

## Focused example / procedure

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  bark(): string;
}

type Id = number | string;           // only a type alias can do this

const d: Dog = { name: "Rex", bark: () => "Woof" };
const id: Id = "A-7";

console.log(d.name, d.bark(), id);
```

## Expected output or behaviour

`Rex Woof A-7`

## Practice task

Which one would you use to name `"small" | "large"`?

<details>
<summary>Answer / check</summary>

A `type` alias: `type Size = "small" | "large";`. An interface can only describe object shapes.

</details>

## Next lesson

- [15. Structural Typing](../15-structural-typing/)
