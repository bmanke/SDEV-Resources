---
title: "22. GroupBy with Composite Keys and Aggregate Filtering"
description: "Group with one or multiple keys, then filter groups by computed aggregates (SQL HAVING equivalent)."
sidebar:
  order: 12
---

**Estimated time:** 8 minutes

## Prerequisites

- Lessons 14 and 21.

## Plain-language explanation

Group with one or multiple keys, then filter groups by computed aggregates (SQL HAVING equivalent).

## Focused example / procedure

```csharp
var groups = tracks
    .GroupBy(t => new { t.Genre, t.Year })
    .Select(g => new { g.Key.Genre, g.Key.Year, Count = g.Count() })
    .Where(g => g.Count >= 2);
```

## Expected output or behaviour

Only genre-year groups with at least 2 tracks remain.

## Practice task

Group by artist only and keep artists with total revenue > 2.00.

<details>
<summary>Answer / check</summary>


Group by `t.Artist`, sum `t.Price`, then filter with `> 2.00m`.


</details>


## Next lesson

- [23. Deferred Execution and ToList](/lessons/enterprise-application-development/03-linq-with-music-catalogue/13-deferred-execution-and-tolist/)
