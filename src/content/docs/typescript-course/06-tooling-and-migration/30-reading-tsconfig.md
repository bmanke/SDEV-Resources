---
title: "30. Reading tsconfig.json"
description: "Understand the settings you copied in Lesson 3."
sidebar:
  order: 1
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 3.

## Plain-language explanation

`tsconfig.json` configures the **checker**, not Node (Node ignores it). The options you used: `noEmit` writes no files; `target`/`module` describe the JavaScript and module system you run on; `rewriteRelativeImportExtensions` and `verbatimModuleSyntax` keep imports honest for Node; `erasableSyntaxOnly` flags code that cannot be stripped; `strict` enables the whole family of strict checks; `include` limits which files are checked. A dependency on `paths` aliases will not work in Node's type stripping, because they are not transformed.

## Focused example / procedure

```shell
npx tsc --showConfig        # prints the final configuration tsc is using
npx tsc --version           # confirm 5.8 or newer
npm run check
```

## Expected output or behaviour

`--showConfig` prints the resolved settings. `npm run check` prints nothing when there are no errors.

## Practice task

Set `strict` to `false`, then re-run the null-safety example from Lesson 20. What changes?

<details>
<summary>Answer / check</summary>

`user.name` on a possibly-undefined value is no longer reported, even though it can crash at runtime. Turn `strict` back on.

</details>

## Next lesson

- [31. Importing Types and File Extensions](../31-importing-types-and-extensions/)
