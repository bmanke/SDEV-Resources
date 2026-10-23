---
title: "17. Ternary and Null/Whitespace Guards"
description: "Use ternary for concise display labels; use `string."
sidebar:
  order: 7
---

**Estimated time:** 6 minutes

## Prerequisites

- String basics and Lesson 12.

## Plain-language explanation

Use ternary for concise display labels; use `string.IsNullOrWhiteSpace` for safe input filtering.

## Focused example / procedure

```csharp
string? search = "  ";
var normalized = string.IsNullOrWhiteSpace(search) ? null : search.Trim();
var label = normalized is null ? "Showing all tracks" : $"Filter: {normalized}";
```

## Expected output or behaviour

Blank input becomes null and does not create accidental empty-string filters.

## Practice task

Normalize a user genre input before query.

<details>
<summary>Answer / check</summary>


`var g = string.IsNullOrWhiteSpace(genre) ? null : genre.Trim();`


</details>


## Next lesson

- [18. Navigation Properties and Child Correlation](/lessons/enterprise-application-development/03-linq-with-music-catalogue/08-navigation-and-child-correlation/)
