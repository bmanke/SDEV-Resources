---
title: "26. Utility Types"
description: "Derive new types from existing ones instead of rewriting them."
sidebar:
  order: 3
---

**Estimated time:** 9 minutes

## Prerequisites

Lesson 25.

## Plain-language explanation

TypeScript ships helpers that transform a type. `Partial<T>` makes every property optional, `Pick<T, K>` keeps only some, `Omit<T, K>` removes some, `Readonly<T>` blocks assignment and `Record<K, V>` builds a dictionary. They affect only the type: `Omit<User, "email">` does **not** remove `email` from an object at runtime.

## Focused example / procedure

```ts
type User = { id: number; name: string; email: string };

const patch: Partial<User> = { name: "Ada L." };

type PublicUser = Omit<User, "email">;
const pub: PublicUser = { id: 1, name: "Ada" };

type Summary = Pick<User, "id" | "name">;
const summary: Summary = { id: 2, name: "Lee" };

console.log(patch, pub, summary);
```

## Expected output or behaviour

`{ name: 'Ada L.' } { id: 1, name: 'Ada' } { id: 2, name: 'Lee' }`

## Practice task

If a full `User` object is passed where `PublicUser` is expected, does the `email` disappear?

<details>
<summary>Answer / check</summary>

No. The extra property stays on the value at runtime; only the type hides it. Build a new object if you must really remove data.

</details>

## Next lesson

- [27. keyof and typeof](../27-keyof-and-typeof/)
