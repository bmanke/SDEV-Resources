---
title: "13. AND/OR Filters"
description: "Combine conditions with && and ||, and choose range boundaries on purpose."
sidebar:
  order: 3
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 12.

## Plain-language explanation

`&&` requires both conditions; `||` requires at least one. Mixing them without parentheses is a classic bug because `&&` binds tighter than `||`. For ranges, decide whether each end is inclusive (`>=`, `<=`) or exclusive (`<`, `>`). A common pattern for "the 1990s" is `>= 1990 && < 2000`, which avoids ever writing 1999.

## Focused example / procedure

```csharp
var tracks = Music.Tracks;
var albums = Music.Albums;

var cheapJazz = tracks.Where(t => t.Genre == "Jazz" && t.Price < 1.00m);
Console.WriteLine(string.Join(", ", cheapJazz.Select(t => t.Title)));

var nineties = albums.Where(a => a.Year >= 1990 && a.Year < 2000);
Console.WriteLine(string.Join(", ", nineties.Select(a => a.Title)));

var jazzOrPopCheap = tracks.Where(t => (t.Genre == "Jazz" || t.Genre == "Pop") && t.Price < 1.00m);
Console.WriteLine(jazzOrPopCheap.Count());
```

## Expected output or behaviour

```
Late Train
Northern Lights, Late Train
3
```
The 0.99 tracks in Jazz or Pop are Aurora, Ice Bloom and Late Train.

## Practice task

List albums from 2000 up to and including 2021.

<details>
<summary>Answer / check</summary>

`albums.Where(a => a.Year >= 2000 && a.Year <= 2021)` returns `Glass Rivers` and `Harbor Notes`.

</details>

## Next lesson

- [14. Select and OrderBy](../04-select-and-orderby/)
