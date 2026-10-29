---
title: "35. Runtime Validation"
description: "Check untrusted data at runtime, because types cannot."
sidebar:
  order: 6
---

**Estimated time:** 9 minutes

## Prerequisites

Lessons 10, 11 and 23.

## Plain-language explanation

Data from users, files and network requests is only a string or a parsed object when it arrives. Its type is a hope, not a fact. To make it a fact, check it at runtime with a type guard, or use a validation library that checks the data and gives you the type at once (Zod is a common example). This is the other half of TypeScript's contract: types for code you control, validation at the edges.

## Focused example / procedure

```ts
type Item = { price: number; qty: number };

function isItem(v: unknown): v is Item {
  if (typeof v !== "object" || v === null) return false;
  const r = v as Record<string, unknown>;
  return typeof r.price === "number" && typeof r.qty === "number";
}

const incoming: unknown = JSON.parse('{"price":"2.5","qty":2}');
console.log(isItem(incoming) ? "valid" : "invalid");
```

## Expected output or behaviour

`invalid` (because `price` is a string).

## Practice task

Why would `JSON.parse(text) as Item` have accepted the same data?

<details>
<summary>Answer / check</summary>

An assertion checks nothing (Lesson 11). Only the runtime check catches the string price.

</details>

## Next lesson

- [36. Capstone: The JavaScript App](../../07-capstone/36-capstone-the-javascript-app/)
