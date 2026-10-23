---
title: "27. TakeWhile and SkipWhile"
description: "`TakeWhile` and `SkipWhile` are sequence-based, not global filters."
sidebar:
  order: 17
---

**Estimated time:** 6 minutes

## Prerequisites

- Lesson 26.

## Plain-language explanation

`TakeWhile` and `SkipWhile` are sequence-based, not global filters. They depend on current order.

## Focused example / procedure

```csharp
var orderedByYear = tracks.OrderBy(t => t.Year).ThenBy(t => t.Id);
var legacy = orderedByYear.TakeWhile(t => t.Year < 2021);
```

## Expected output or behaviour

Rows stop at first non-matching element in sequence order.

## Practice task

Why can `TakeWhile(t => t.Price < 2)` miss later cheap rows?

<details>
<summary>Answer / check</summary>


Because it stops at first expensive row; it is not equivalent to `Where`.


</details>


## Next lesson

- [28. Distinct, Union, Intersect, Except, and Concat](/lessons/enterprise-application-development/03-linq-with-music-catalogue/18-set-operators-and-equality/)
