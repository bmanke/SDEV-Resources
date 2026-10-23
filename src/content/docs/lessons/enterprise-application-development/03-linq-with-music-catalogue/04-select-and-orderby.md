---
title: "14. Select and OrderBy"
description: "`Select` projects shape; `OrderBy` defines a primary sort key."
sidebar:
  order: 4
---

**Estimated time:** 7 minutes

## Prerequisites

- Lesson 12.

## Plain-language explanation

`Select` projects shape; `OrderBy` defines a primary sort key.

## Focused example / procedure

```csharp
var cards = tracks
    .Select(t => new { t.Title, t.Price })
    .OrderBy(t => t.Price);
```

## Expected output or behaviour

Output rows are title/price pairs sorted by price ascending.

## Practice task

Sort descending by year instead.

<details>
<summary>Answer / check</summary>


Use `.OrderByDescending(t => t.Year)`.


</details>


## Next lesson

- [15. ThenBy and Deterministic Ordering](/lessons/enterprise-application-development/03-linq-with-music-catalogue/05-thenby-and-deterministic-order/)
