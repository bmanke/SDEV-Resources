---
title: "26. Skip and Take for Paging"
description: "Return one page of results from a stable ordering."
sidebar:
  order: 16
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 15.

## Plain-language explanation

`Skip(n)` ignores the first `n` items and `Take(n)` keeps the next `n`. For page `p` of size `s`, skip `(p - 1) * s`. This only works when the order is deterministic, so sort with a unique tie-breaker first. The total page count is the item count divided by the page size, rounded up.

## Focused example / procedure

```csharp
var tracks = Music.Tracks.OrderBy(t => t.Id).ToList();
int pageSize = 3, page = 2;

var items = tracks.Skip((page - 1) * pageSize).Take(pageSize);
Console.WriteLine(string.Join(", ", items.Select(t => t.Title)));
Console.WriteLine((int)Math.Ceiling(tracks.Count / (double)pageSize));
```

## Expected output or behaviour

```
River Run, Late Train, Night Platform
3
```

## Practice task

Which tracks are on page 3?

<details>
<summary>Answer / check</summary>

`Skip(6).Take(3)` returns the last two tracks, `Harbor` and `Tide Table`, because only 8 exist.

</details>

## Next lesson

- [27. TakeWhile and SkipWhile](../17-takewhile-and-skipwhile/)
