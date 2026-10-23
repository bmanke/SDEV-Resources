---
title: "28. Distinct, Union, Intersect, Except and Concat"
description: "Combine and de-duplicate sequences and know how equality is decided."
sidebar:
  order: 18
---

**Estimated time:** 9 minutes

## Prerequisites

Lesson 27.

## Plain-language explanation

`Distinct` removes duplicates. `Union` joins two sequences without duplicates, `Intersect` keeps items in both, `Except` keeps items only in the first, and `Concat` simply appends and keeps duplicates. All of them compare items using equality: numbers and strings compare by value, records compare by all their properties, but ordinary classes compare by reference unless you override equality. Use `DistinctBy` (in .NET 6+) to de-duplicate by one property.

## Focused example / procedure

```csharp
var a = new[] { 1, 2, 3, 3 };
var b = new[] { 3, 4 };

Console.WriteLine(string.Join(",", a.Distinct()));
Console.WriteLine(string.Join(",", a.Union(b)));
Console.WriteLine(string.Join(",", a.Intersect(b)));
Console.WriteLine(string.Join(",", a.Except(b)));
Console.WriteLine(string.Join(",", a.Concat(b)));
Console.WriteLine(string.Join(", ", Music.Tracks.Select(t => t.Genre).Distinct()));
```

## Expected output or behaviour

```
1,2,3
1,2,3,4
3
1,2
1,2,3,3,3,4
Pop, Indie, Jazz
```

## Practice task

Get one track per genre.

<details>
<summary>Answer / check</summary>

`Music.Tracks.DistinctBy(t => t.Genre)` returns the first track of each genre: Aurora, Glass, Late Train.

</details>

## Next lesson

- [29. Razor versus Blazor](../../04-blazor-ui-building-blocks/01-razor-vs-blazor/)
