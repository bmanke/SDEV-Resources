---
title: "15. ThenBy and Deterministic Order"
description: "Add tie-breakers so results always come back in the same order."
sidebar:
  order: 5
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 14.

## Plain-language explanation

When two items have the same sort key, their relative order is not something to rely on, especially from a database. Add `ThenBy` for secondary keys and finish with a unique value such as the `Id`. This matters most for paging: if the order can change between requests, a record can appear on two pages or none. Never write a second `OrderBy` to add a tie-breaker: it replaces the first sort instead of refining it.

## Focused example / procedure

```csharp
var tracks = Music.Tracks;

var ordered = tracks
    .OrderBy(t => t.Genre)
    .ThenByDescending(t => t.Price)
    .ThenBy(t => t.Id)
    .Select(t => $"{t.Genre}: {t.Title}");
foreach (var line in ordered) Console.WriteLine(line);
```

## Expected output or behaviour

```
Indie: Glass
Indie: River Run
Indie: Tide Table
Jazz: Night Platform
Jazz: Harbor
Jazz: Late Train
Pop: Aurora
Pop: Ice Bloom
```

## Practice task

Sort by genre, then by title alphabetically.

<details>
<summary>Answer / check</summary>

`tracks.OrderBy(t => t.Genre).ThenBy(t => t.Title)` — Indie: Glass, River Run, Tide Table; Jazz: Harbor, Late Train, Night Platform; Pop: Aurora, Ice Bloom.

</details>

## Next lesson

- [16. Anonymous Projections](../06-anonymous-projections/)
