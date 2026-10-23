---
title: "23. Deferred Execution and ToList"
description: "LINQ queries are deferred until enumeration."
sidebar:
  order: 13
---

**Estimated time:** 7 minutes

## Prerequisites

- Lesson 12.

## Plain-language explanation

LINQ queries are deferred until enumeration. Materialize with `ToList()` after filters/projection to avoid repeated work and mismatched timing.

## Focused example / procedure

```csharp
var query = tracks.Where(t => t.Price >= 1.20m); // not executed yet
var snapshot = query.ToList();                    // executes now
```

## Expected output or behaviour

`snapshot` is a stable list even if source data changes later.

## Practice task

Explain why materializing before filtering can hurt performance with databases.

<details>
<summary>Answer / check</summary>


It can fetch too many rows; filter/project in provider first, then materialize.


</details>


## Next lesson

- [24. IEnumerable vs IQueryable](/lessons/enterprise-application-development/03-linq-with-music-catalogue/14-ienumerable-vs-iqueryable/)
