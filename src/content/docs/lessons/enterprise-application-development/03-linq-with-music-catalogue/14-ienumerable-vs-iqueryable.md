---
title: "24. IEnumerable vs IQueryable"
description: "`IQueryable` builds provider-translatable expressions (often SQL)."
sidebar:
  order: 14
---

**Estimated time:** 8 minutes

## Prerequisites

- Lesson 23.

## Plain-language explanation

`IQueryable` builds provider-translatable expressions (often SQL). `IEnumerable` runs in-memory. Translation limits depend on provider, not LINQPad itself.

## Focused example / procedure

```csharp
IQueryable<Track> dbQuery = context.Tracks;
var projected = dbQuery.Where(t => t.Price > 1.00m).Select(t => new { t.Title });
```

## Expected output or behaviour

Database filters happen server-side before rows are materialized.

## Practice task

When should you call `AsEnumerable()`?

<details>
<summary>Answer / check</summary>


After provider-side filtering/projection when you need client-only logic.


</details>


## Next lesson

- [25. First vs Single Contracts](/lessons/enterprise-application-development/03-linq-with-music-catalogue/15-first-vs-single/)
