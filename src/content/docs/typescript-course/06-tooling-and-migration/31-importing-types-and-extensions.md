---
title: "31. Importing Types and File Extensions"
description: "Share code between .ts files the way Node expects."
sidebar:
  order: 2
---

**Estimated time:** 9 minutes

## Prerequisites

Lesson 30.

## Plain-language explanation

Two Node rules matter. First, import specifiers must include the real extension, `./user.ts`, not `./user`. Second, because the type syntax is removed without knowing what a name refers to, type-only imports must be marked with `type`. Otherwise Node tries to import a value that does not exist and fails at runtime. `verbatimModuleSyntax` makes `tsc` enforce this.

## Focused example / procedure

`src/user.ts`:

```ts
export type User = { id: number; name: string };

export function makeUser(id: number, name: string): User {
  return { id, name };
}
```

`src/main.ts`:

```ts
import { makeUser, type User } from "./user.ts";

const u: User = makeUser(1, "Ada");
console.log(u);
```

Run `node src/main.ts`. If you write `import { makeUser, User }` instead, `tsc` objects and Node fails at runtime with an error about a missing export named `User`.

## Expected output or behaviour

`{ id: 1, name: 'Ada' }`

## Practice task

Write the import for a type `Order` and a function `total` from `./order.ts`.

<details>
<summary>Answer / check</summary>

`import { total, type Order } from "./order.ts";` (or `import type { Order }` on its own line).

</details>

## Next lesson

- [32. Type Declarations and @types](../32-type-declarations-and-types-packages/)
