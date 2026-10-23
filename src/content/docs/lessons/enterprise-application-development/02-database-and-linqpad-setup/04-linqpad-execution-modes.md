---
title: "10. LINQPad Expression, Statements, and Program Modes"
description: "Expression mode is fastest for one-result snippets, Statements mode supports blocks, and Program mode supports full classes/methods."
sidebar:
  order: 4
---

**Estimated time:** 7 minutes

## Prerequisites

- Lesson 9.

## Plain-language explanation

Expression mode is fastest for one-result snippets, Statements mode supports blocks, and Program mode supports full classes/methods. `Dump()` is LINQPad-only display output.

## Focused example / procedure

```csharp
// Statements mode
var totals = new[] { 10m, 20m, 30m };
var sum = totals.Sum();
sum.Dump(); // LINQPad-only
```

## Expected output or behaviour

`Dump()` shows formatted results in LINQPad; the same call is not used in normal app code.

## Practice task

Convert the sample to regular C# console output.

<details>
<summary>Answer / check</summary>


Replace `sum.Dump();` with `Console.WriteLine(sum);`.


</details>


## Next lesson

- [11. Music Catalogue Fixture](/lessons/enterprise-application-development/03-linq-with-music-catalogue/01-music-catalogue-fixture/)
