---
title: "12. Lambdas and Where"
description: "Filter a sequence with a predicate written as a lambda."
sidebar:
  order: 2
---

**Estimated time:** 6 minutes

## Prerequisites

Lesson 11.

## Plain-language explanation

A lambda is a tiny inline function: `t => t.Genre == "Indie"` reads as "given a track `t`, is its genre Indie?". `Where` keeps every element for which the lambda returns true and drops the rest. The name before `=>` is just a parameter name; use something short but meaningful.

## Focused example / procedure

```csharp
var tracks = Music.Tracks;

var indie = tracks.Where(t => t.Genre == "Indie");
foreach (var t in indie)
    Console.WriteLine(t.Title);
```

## Expected output or behaviour

```
Glass
River Run
Tide Table
```

## Practice task

List the titles of tracks longer than 300 seconds.

<details>
<summary>Answer / check</summary>

`tracks.Where(t => t.Seconds > 300).Select(t => t.Title)` gives `River Run`, `Late Train`, `Night Platform`.

</details>

## Next lesson

- [13. AND/OR Filters](../03-and-or-filters/)
