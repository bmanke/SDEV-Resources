---
title: "16. Anonymous Projections Are Strongly Typed"
description: "Anonymous types are compile-time typed, not dynamic."
sidebar:
  order: 6
---

**Estimated time:** 6 minutes

## Prerequisites

- Lesson 14.

## Plain-language explanation

Anonymous types are compile-time typed, not dynamic. The compiler knows exact property names and types.

## Focused example / procedure

```csharp
var summary = tracks.Select(t => new { t.Title, Cost = t.Price });
// summary element type is compiler-generated with string Title and decimal Cost
```

## Expected output or behaviour

You can access `item.Title` and `item.Cost` safely in the same method scope.

## Practice task

When should you switch from anonymous type to named model?

<details>
<summary>Answer / check</summary>


When returning data across method/component boundaries or API contracts.


</details>


## Next lesson

- [17. Ternary and Null/Whitespace Guards](/lessons/enterprise-application-development/03-linq-with-music-catalogue/07-ternary-and-whitespace/)
