---
title: "14. Select and OrderBy"
description: "Shape each item with Select and sort the result with OrderBy."
sidebar:
  order: 4
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 13.

## Plain-language explanation

`Select` transforms each element into something new, such as just its title. `OrderBy` sorts ascending and `OrderByDescending` sorts descending. LINQ operators are chained left to right, and sorting before or after a `Select` is only the same if the sort key still exists after projecting, so sort first when in doubt.

## Focused example / procedure

```csharp
var tracks = Music.Tracks;

var titles = tracks.OrderBy(t => t.Title).Select(t => t.Title);
Console.WriteLine(string.Join(", ", titles));
```

## Expected output or behaviour

`Aurora, Glass, Harbor, Ice Bloom, Late Train, Night Platform, River Run, Tide Table`

## Practice task

Show titles from longest to shortest track.

<details>
<summary>Answer / check</summary>

`tracks.OrderByDescending(t => t.Seconds).Select(t => t.Title)` → `Late Train, Night Platform, River Run, Harbor, Ice Bloom, Aurora, Glass, Tide Table`.

</details>

## Next lesson

- [15. ThenBy and Deterministic Order](../05-thenby-and-deterministic-order/)
