---
title: "28. Distinct, Union, Intersect, Except, and Concat"
description: "Set operators depend on equality rules."
sidebar:
  order: 18
---

**Estimated time:** 8 minutes

## Prerequisites

- Lessons 14 and 24.

## Plain-language explanation

Set operators depend on equality rules. Records compare by value by default; classes often need custom comparer/overrides.

## Focused example / procedure

```csharp
var a = new[] { "Indie", "Ambient", "Indie" };
var b = new[] { "Ambient", "Country" };

var distinct = a.Distinct();
var union = a.Union(b);
var both = a.Intersect(b);
var onlyA = a.Except(b);
var combined = a.Concat(b);
```

## Expected output or behaviour

`Concat` keeps duplicates/order; set operators treat values as sets.

## Practice task

When do you prefer `Concat` over `Union`?

<details>
<summary>Answer / check</summary>


When you must preserve all rows, including duplicates, in sequence order.


</details>


## Next lesson

- [29. Razor vs Blazor and Modern Hosting Terms](/lessons/enterprise-application-development/04-blazor-ui-building-blocks/01-razor-vs-blazor/)
