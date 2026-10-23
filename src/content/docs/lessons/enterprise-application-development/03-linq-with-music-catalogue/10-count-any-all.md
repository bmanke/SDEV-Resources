---
title: "20. Count, Any, and All on Empty Sequences"
description: "`Any()` is fastest for existence checks."
sidebar:
  order: 10
---

**Estimated time:** 7 minutes

## Prerequisites

- Lesson 11 fixture.

## Plain-language explanation

`Any()` is fastest for existence checks. `All()` returns `true` for empty sequences (vacuous truth), so handle that intentionally.

## Focused example / procedure

```csharp
var hasAmbient = tracks.Any(t => t.Genre == "Ambient");
var allRecent = tracks.Where(t => t.Genre == "Jazz").All(t => t.Year >= 2020);
```

## Expected output or behaviour

`allRecent` is `true` if no Jazz tracks exist, which is mathematically correct but easy to misuse.

## Practice task

Require at least one Jazz track and all Jazz tracks recent.

<details>
<summary>Answer / check</summary>


`var jazz = tracks.Where(t => t.Genre=="Jazz"); var ok = jazz.Any() && jazz.All(t => t.Year >= 2020);`


</details>


## Next lesson

- [21. Sum, Min, Max, Average with Empty Inputs](/lessons/enterprise-application-development/03-linq-with-music-catalogue/11-sum-min-max-average-empty/)
