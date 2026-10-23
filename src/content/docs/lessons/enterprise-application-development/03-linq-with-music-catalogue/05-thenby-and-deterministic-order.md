---
title: "15. ThenBy and Deterministic Ordering"
description: "Pagination must use deterministic ordering."
sidebar:
  order: 5
---

**Estimated time:** 6 minutes

## Prerequisites

- Lesson 14.

## Plain-language explanation

Pagination must use deterministic ordering. Add a tie-breaker key with `ThenBy` so equal primary values have stable order.

## Focused example / procedure

```csharp
var ordered = tracks
    .OrderBy(t => t.Year)
    .ThenBy(t => t.Title)
    .ThenBy(t => t.Id);
```

## Expected output or behaviour

Repeated runs keep identical sequence even when years match.

## Practice task

Add a deterministic descending sort by price with stable title tie-breaker.

<details>
<summary>Answer / check</summary>


`OrderByDescending(t => t.Price).ThenBy(t => t.Title).ThenBy(t => t.Id)`.


</details>


## Next lesson

- [16. Anonymous Projections Are Strongly Typed](/lessons/enterprise-application-development/03-linq-with-music-catalogue/06-anonymous-projections/)
