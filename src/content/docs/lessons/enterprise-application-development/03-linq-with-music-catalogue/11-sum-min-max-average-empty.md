---
title: "21. Sum, Min, Max, Average and Empty Inputs"
description: "Aggregate numbers and handle the case where nothing matched."
sidebar:
  order: 11
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 20.

## Plain-language explanation

`Sum`, `Min`, `Max` and `Average` reduce a sequence to one number. On an empty sequence `Sum` returns 0, but `Min`, `Max` and `Average` of non-nullable values throw `InvalidOperationException`. Project to a nullable value (`(int?)t.Seconds`) and the aggregate returns `null` instead, which you can handle explicitly.

## Focused example / procedure

```csharp
var tracks = Music.Tracks;

Console.WriteLine(tracks.Sum(t => t.Price));
Console.WriteLine(tracks.Min(t => t.Seconds));
Console.WriteLine(tracks.Max(t => t.Seconds));
Console.WriteLine(tracks.Average(t => t.Seconds));

var rock = tracks.Where(t => t.Genre == "Rock");
Console.WriteLine(rock.Sum(t => t.Price));
int? longest = rock.Max(t => (int?)t.Seconds);
Console.WriteLine(longest is null ? "no rock tracks" : longest.ToString());
```

## Expected output or behaviour

```
9.12
190
402
273.125
0
no rock tracks
```

## Practice task

What would `rock.Average(t => t.Seconds)` do?

<details>
<summary>Answer / check</summary>

It throws `InvalidOperationException` because there are no elements to average. Use `(double?)t.Seconds` or check `Any()` first.

</details>

## Next lesson

- [22. GroupBy: Composite Keys and Filtering Groups](../12-groupby-composite-and-having/)
