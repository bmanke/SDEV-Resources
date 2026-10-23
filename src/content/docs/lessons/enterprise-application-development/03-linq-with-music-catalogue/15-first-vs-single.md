---
title: "25. First vs Single Contracts"
description: "Use `Single` only when data contract guarantees exactly one row; use `First`/`FirstOrDefault` when many rows are acceptable and you need the first."
sidebar:
  order: 15
---

**Estimated time:** 6 minutes

## Prerequisites

- Lesson 24.

## Plain-language explanation

Use `Single` only when data contract guarantees exactly one row; use `First`/`FirstOrDefault` when many rows are acceptable and you need the first.

## Focused example / procedure

```csharp
var track = tracks.Single(t => t.Id == 1);      // exactly one expected
var firstAmbient = tracks.FirstOrDefault(t => t.Genre == "Ambient");
```

## Expected output or behaviour

`Single` throws if zero or many matches, exposing broken uniqueness assumptions.

## Practice task

Would replacing all `Single` calls with `FirstOrDefault` be safer?

<details>
<summary>Answer / check</summary>


No. It can hide data integrity problems that `Single` should surface.


</details>


## Next lesson

- [26. Skip/Take Pagination Windows](/lessons/enterprise-application-development/03-linq-with-music-catalogue/16-skip-take-and-windowing/)
