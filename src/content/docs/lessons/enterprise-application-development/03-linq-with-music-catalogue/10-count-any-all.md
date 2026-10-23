---
title: "20. Count, Any and All"
description: "Ask yes/no and how-many questions about a sequence."
sidebar:
  order: 10
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 11.

## Plain-language explanation

`Count()` returns how many items match. `Any()` is true when at least one matches and is cheaper than comparing `Count() > 0`. `All()` is true when every item matches, and it is true for an empty sequence, because there is no counter-example. That last fact surprises people and is a source of bugs in validation.

## Focused example / procedure

```csharp
var tracks = Music.Tracks;
var albums = Music.Albums;

Console.WriteLine(tracks.Count());
Console.WriteLine(tracks.Count(t => t.Genre == "Jazz"));
Console.WriteLine(albums.Any(a => a.Year == 1998));
Console.WriteLine(albums.Any(a => a.Year == 1400));
Console.WriteLine(albums.All(a => a.Year >= 1998));
Console.WriteLine(new List<Album>().All(a => a.Year > 3000));
```

## Expected output or behaviour

```
8
3
True
False
True
True
```

## Practice task

Write a check that there is at least one Jazz track and that all Jazz tracks cost under 1.30.

<details>
<summary>Answer / check</summary>

`var jazz = tracks.Where(t => t.Genre == "Jazz"); bool ok = jazz.Any() && jazz.All(t => t.Price < 1.30m);` The `Any()` guard prevents an empty set from passing vacuously.

</details>

## Next lesson

- [21. Sum, Min, Max, Average and Empty Inputs](../11-sum-min-max-average-empty/)
