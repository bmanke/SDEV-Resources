---
title: "5. What Node Cannot Strip"
description: "Know which TypeScript features need code generation and use erasable alternatives."
sidebar:
  order: 5
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 4.

## Plain-language explanation

Type stripping works because removing the types leaves valid JavaScript. A few TypeScript features need *new* JavaScript generated, so they cannot be stripped. The Node documentation lists the main ones: `enum` declarations, `namespace` with runtime code, parameter properties and import aliases. Node reports them with `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`. The `erasableSyntaxOnly` option you turned on in Lesson 3 makes `tsc` flag them too, so you find out in the editor instead of at run time.

## Focused example / procedure

**Not erasable** (fails under Node and is flagged by `tsc`):

```ts
enum Color { Red, Green }

class Point {
  constructor(public x: number, public y: number) {}   // parameter properties
}
```

**Erasable replacements** (these run as-is):

```ts
const Color = { Red: "red", Green: "green" } as const;
type Color = (typeof Color)[keyof typeof Color];

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const p = new Point(1, 2);
const c: Color = Color.Green;
console.log(p.x, p.y, c);
```

## Expected output or behaviour

`1 2 green`

## Practice task

Rewrite `enum Status { Open, Closed }` so Node can run it.

<details>
<summary>Answer / check</summary>

`const Status = { Open: "open", Closed: "closed" } as const; type Status = (typeof Status)[keyof typeof Status];` — Lesson 28 explains why this pattern works. If you must keep a full-featured `enum`, use a tool such as `tsx` instead of plain Node stripping.

</details>

## Next lesson

- [6. Annotations and Inference](../../02-types-you-write-and-infer/06-annotations-and-inference/)
