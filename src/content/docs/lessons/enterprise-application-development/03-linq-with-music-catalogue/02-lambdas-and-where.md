---
title: "12. Lambdas and Where"
description: "A lambda defines filter logic inline."
sidebar:
  order: 2
---

**Estimated time:** 6 minutes

## Prerequisites

- Lesson 11 fixture loaded.

## Plain-language explanation

A lambda defines filter logic inline. `Where` keeps all elements that satisfy the predicate.

## Focused example / procedure

```csharp
var indie = tracks.Where(t => t.Genre == "Indie");
foreach (var t in indie)
    Console.WriteLine(t.Title);
```

## Expected output or behaviour

Only Indie tracks are printed.

## Practice task

Filter tracks released after 2020.

<details>
<summary>Answer / check</summary>


`tracks.Where(t => t.Year > 2020)`.


</details>


## Next lesson

- [13. AND/OR Filters](/lessons/enterprise-application-development/03-linq-with-music-catalogue/03-and-or-filters/)
