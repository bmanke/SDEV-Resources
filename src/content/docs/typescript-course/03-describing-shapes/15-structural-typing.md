---
title: "15. Structural Typing"
description: "Understand that compatibility depends on shape, not on names."
sidebar:
  order: 4
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 14.

## Plain-language explanation

JavaScript uses *duck typing*: if it has the properties, it works. TypeScript formalises this as **structural typing**: a value fits a type when it has at least the required properties, regardless of what the type is called. The one place it is stricter is **excess property checks**: a *fresh object literal* with unknown properties is rejected because it is probably a typo.

## Focused example / procedure

```ts
type Point = { x: number; y: number };

function show(p: Point): void {
  console.log(p.x, p.y);
}

const point3d = { x: 1, y: 2, z: 3 };
show(point3d);                 // fine: it has x and y

// @ts-expect-error: excess property in a fresh object literal
show({ x: 1, y: 2, z: 3 });
```

## Expected output or behaviour

```
1 2
1 2
```
Both calls run; only the second is reported by `tsc`.

## Practice task

Why is the first call allowed but the second rejected?

<details>
<summary>Answer / check</summary>

A variable's extra properties may be intentional, but writing an object literal directly in the call suggests a typo, so TypeScript checks it more strictly.

</details>

## Next lesson

- [16. Index Signatures and Record](../16-index-signatures-and-record/)
