---
title: "32. Type Declarations and @types"
description: "Get types for libraries and Node itself."
sidebar:
  order: 3
---

**Estimated time:** 9 minutes

## Prerequisites

Lesson 31.

## Plain-language explanation

Plain JavaScript libraries can ship their own `.d.ts` files, which contain only types, or have community types published as `@types/<name>` packages. You installed `@types/node` in Lesson 3 so the checker knows about modules such as `node:fs`. If a library has no types at all, `tsc` reports that it cannot find a declaration file, and you can write a small `.d.ts` yourself.

## Focused example / procedure

```ts
import { readFileSync } from "node:fs";

const text: string = readFileSync(import.meta.filename, "utf8");
console.log(text.split("\n").length > 0);
```

Uninstall `@types/node` temporarily and run `npm run check` to see the checker lose its knowledge of `node:fs`; the program itself still runs.

## Expected output or behaviour

`true`

## Practice task

A library has no types. Name two options.

<details>
<summary>Answer / check</summary>

Install `@types/<name>` if one exists, or add a minimal `declare module "<name>";` in a `.d.ts` file to silence the error (at the cost of using `any`).

</details>

## Next lesson

- [33. JSDoc Types in Plain JavaScript](../33-jsdoc-and-checkjs/)
