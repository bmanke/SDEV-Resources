---
title: "21. Sum, Min, Max, Average with Empty Inputs"
description: "Aggregate methods behave differently on empty sequences; guard before `Min/Max/Average`."
sidebar:
  order: 11
---

**Estimated time:** 7 minutes

## Prerequisites

- Lesson 20.

## Plain-language explanation

Aggregate methods behave differently on empty sequences; guard before `Min/Max/Average`.

## Focused example / procedure

```csharp
var ambientPrices = tracks.Where(t => t.Genre == "Ambient").Select(t => t.Price);
var avg = ambientPrices.Any() ? ambientPrices.Average() : 0m;
```

## Expected output or behaviour

No exception occurs when a category has no rows.

## Practice task

Return nullable average instead of 0 for empty input.

<details>
<summary>Answer / check</summary>


Use `decimal? avg = ambientPrices.Any() ? ambientPrices.Average() : null;`


</details>


## Next lesson

- [22. GroupBy with Composite Keys and Aggregate Filtering](/lessons/enterprise-application-development/03-linq-with-music-catalogue/12-groupby-composite-and-having/)
