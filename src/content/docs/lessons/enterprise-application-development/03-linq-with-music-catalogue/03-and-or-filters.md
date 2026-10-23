---
title: "13. AND/OR Filters"
description: "Combine conditions with `&&` and `||` to model real search criteria exactly."
sidebar:
  order: 3
---

**Estimated time:** 6 minutes

## Prerequisites

- Lesson 12.

## Plain-language explanation

Combine conditions with `&&` and `||` to model real search criteria exactly.

## Focused example / procedure

```csharp
var filtered = tracks.Where(t => t.Genre == "Ambient" && t.Price <= 1.49m
                              || t.Artist == "Mara Cole");
```

## Expected output or behaviour

Result includes either Mara Cole tracks or affordable Ambient tracks per operator precedence.

## Practice task

Require both artist and year (no OR).

<details>
<summary>Answer / check</summary>


Use `tracks.Where(t => t.Artist == "Mara Cole" && t.Year == 2021)`.


</details>


## Next lesson

- [14. Select and OrderBy](/lessons/enterprise-application-development/03-linq-with-music-catalogue/04-select-and-orderby/)
