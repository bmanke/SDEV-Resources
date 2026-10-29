---
title: "28. String Unions Instead of Enums"
description: "Replace enum with patterns that Node can run."
sidebar:
  order: 5
---

**Estimated time:** 8 minutes

## Prerequisites

Lessons 5 and 27.

## Plain-language explanation

An `enum` creates a real JavaScript object, so it cannot be stripped. A `const` object with `as const` plus a type derived from its values gives you the same convenience (named constants, a closed set of values) using erasable syntax. A plain union of string literals is even lighter when you do not need the named object.

## Focused example / procedure

```ts
const Role = { Admin: "admin", User: "user" } as const;
type Role = (typeof Role)[keyof typeof Role];   // "admin" | "user"

function can(role: Role): boolean {
  return role === Role.Admin;
}

console.log(can("admin"), can(Role.User));
console.log(Object.values(Role));
```

The same name `Role` is used for a value and a type; that is allowed because they live in different spaces.

## Expected output or behaviour

```
true false
[ 'admin', 'user' ]
```

## Practice task

Why does `as const` matter?

<details>
<summary>Answer / check</summary>

Without it the values widen to `string`, so `Role` would be just `string`. `as const` keeps the exact literals.

</details>

## Next lesson

- [29. Classes Without Parameter Properties](../29-classes-without-parameter-properties/)
