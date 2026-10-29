---
title: "3. Type Checking with tsc"
description: "Install the TypeScript compiler as a checker that never writes files."
sidebar:
  order: 3
---

**Estimated time:** 10 minutes

## Prerequisites

Lesson 2.

## Plain-language explanation

Since Node only strips types, you need a separate step to *check* them: the TypeScript compiler, `tsc`. With `noEmit` it reads your code, reports type errors and writes nothing. The Node documentation recommends TypeScript 5.8 or newer with a small set of `tsconfig.json` options. They line up the checker with what Node can actually run (for example `erasableSyntaxOnly`, which reports syntax that Node cannot strip). Add `strict` so you get the full safety net.

## Focused example / procedure

```shell
npm install --save-dev typescript @types/node
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "noEmit": true,
    "target": "esnext",
    "module": "nodenext",
    "rewriteRelativeImportExtensions": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

Add scripts with `npm pkg set scripts.check="tsc" scripts.start="node src/hello.ts"`, then edit `src/hello.ts` so `visits` is `"three"` and run:

```shell
npm run check
```

## Expected output or behaviour

`tsc` reports an error on the `visits` line saying type `string` is not assignable to type `number` (code TS2322) and exits with a non-zero status. With the original `3` it prints nothing, which means success.

## Practice task

Which command runs the program and which one checks it?

<details>
<summary>Answer / check</summary>

`node src/hello.ts` runs it; `npx tsc` (or `npm run check`) checks it. They are independent steps.

</details>

## Next lesson

- [4. Types Are Erased](../04-types-are-erased/)
