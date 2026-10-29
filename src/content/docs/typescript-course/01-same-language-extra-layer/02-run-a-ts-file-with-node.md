---
title: "2. Run a .ts File with Node"
description: "Execute a TypeScript file directly with Node.js, with no build step."
sidebar:
  order: 2
---

**Estimated time:** 10 minutes

## Prerequisites

Lesson 1 and Node.js installed.

## Plain-language explanation

Recent versions of Node can run `.ts` files directly through **type stripping**: Node replaces the type syntax with whitespace and runs what is left. According to the Node documentation, it is enabled by default from v23.6.0 and v22.18.0, and it became stable in v24.12.0 and v25.2.0. Node performs no type checking and ignores `tsconfig.json`, so it will happily run code that has type errors. You get the checking from your editor and from `tsc` (next lesson).

## Focused example / procedure

Setup lab — about 10 minutes.

```shell
node --version          # confirm you have a version listed above
mkdir ts-vs-js && cd ts-vs-js
npm init -y
npm pkg set type=module
mkdir src
```

Create `src/hello.ts`:

```ts
const name: string = "Morgan";
const visits: number = 3;
console.log(`Hello, ${name}. Visit number ${visits}.`);
```

Run it:

```shell
node src/hello.ts
```

`"type": "module"` makes `.ts` files use `import`/`export` the same way `.js` files do. To switch the feature off, Node provides `--no-strip-types`.

## Expected output or behaviour

`Hello, Morgan. Visit number 3.`

## Practice task

Change `visits` to `"three"` (a string) and run it again. What happens?

<details>
<summary>Answer / check</summary>

It still runs and prints `Visit number three.` Node does not check types. Lesson 3 adds the checker that would flag it.

</details>

## Next lesson

- [3. Type Checking with tsc](../03-type-checking-with-tsc/)
