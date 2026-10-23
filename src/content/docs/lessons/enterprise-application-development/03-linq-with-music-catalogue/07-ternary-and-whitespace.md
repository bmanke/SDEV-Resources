---
title: "17. Ternary and Whitespace Checks"
description: "Replace missing text with a default and derive a sortable key."
sidebar:
  order: 7
---

**Estimated time:** 7 minutes

## Prerequisites

Lessons 2 and 11.

## Plain-language explanation

`condition ? a : b` picks one of two values, which is perfect for display defaults. `string.IsNullOrWhiteSpace` catches `null`, empty and spaces-only text; `??` only catches `null`. When you group or sort by a derived value like a decade, keep a numeric key (`1990`) and format the label (`1990s`) afterwards, because sorting the text "2000s" before "1990s" can misorder things in other formats.

## Focused example / procedure

```csharp
foreach (var a in Music.Albums)
{
    string label = string.IsNullOrWhiteSpace(a.Label) ? "Unknown" : a.Label;
    int decade = a.Year / 10 * 10;
    Console.WriteLine($"{a.Title} | {label} | {decade}s");
}
```

## Expected output or behaviour

```
Northern Lights | Polar | 1990s
Glass Rivers | Unknown | 2000s
Late Train | Polar | 1990s
Harbor Notes | Tidewater | 2020s
```

## Practice task

Sort the albums by decade (numeric) and then title.

<details>
<summary>Answer / check</summary>

`Music.Albums.OrderBy(a => a.Year / 10 * 10).ThenBy(a => a.Title)` — Late Train, Northern Lights, Glass Rivers, Harbor Notes.

</details>

## Next lesson

- [18. Navigation and Child Correlation](../08-navigation-and-child-correlation/)
