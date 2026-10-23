---
title: "22. GroupBy: Composite Keys and Filtering Groups"
description: "Group by one or more keys and keep only groups that qualify."
sidebar:
  order: 12
---

**Estimated time:** 9 minutes

## Prerequisites

Lesson 21.

## Plain-language explanation

`GroupBy` splits a sequence into groups; each group has a `Key` and the items that share it. Group by an anonymous object to use several columns as a composite key. Filtering on a group's aggregate with `Where(g => g.Count() >= 2)` is the LINQ version of SQL's `HAVING`. Group by a stable identifier (like an `Id`) rather than a name when two different items can share a name; otherwise they get merged.

## Focused example / procedure

```csharp
var tracks = Music.Tracks;

var byGenre = tracks
    .GroupBy(t => t.Genre)
    .OrderBy(g => g.Key)
    .Select(g => new { Genre = g.Key, Count = g.Count(), Avg = g.Average(t => t.Price) });
foreach (var x in byGenre)
    Console.WriteLine($"{x.Genre}: {x.Count} tracks, avg {x.Avg:F2}");

var repeated = tracks
    .GroupBy(t => new { t.Genre, t.Price })
    .Where(g => g.Count() >= 2)
    .OrderBy(g => g.Key.Genre).ThenBy(g => g.Key.Price)
    .Select(g => $"{g.Key.Genre} {g.Key.Price:F2}: {g.Count()}");
foreach (var line in repeated) Console.WriteLine(line);
```

## Expected output or behaviour

```
Indie: 3 tracks, avg 1.19
Jazz: 3 tracks, avg 1.19
Pop: 2 tracks, avg 0.99
Indie 1.29: 2
Jazz 1.29: 2
Pop 0.99: 2
```

## Practice task

How many tracks are in each (Genre, Price) group that has only one track?

<details>
<summary>Answer / check</summary>

Those are Indie 0.99 (Tide Table) and Jazz 0.99 (Late Train): one track each, removed by the `Count() >= 2` filter.

</details>

## Next lesson

- [23. Deferred Execution and ToList](../13-deferred-execution-and-tolist/)
