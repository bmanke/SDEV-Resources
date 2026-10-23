---
title: "16. Anonymous Projections"
description: "Return a quick custom shape with an anonymous type."
sidebar:
  order: 6
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 14.

## Plain-language explanation

`new { t.Title, Minutes = ... }` creates an object of a type the compiler invents. It is still fully typed at compile time (not dynamic), so you get IntelliSense and errors on misspelled properties. Anonymous types are ideal inside a single method, but they cannot be named in a method signature, so use a named class or record when a service must hand data to a page.

## Focused example / procedure

```csharp
var tracks = Music.Tracks;

var rows = tracks.Select(t => new
{
    t.Title,
    Minutes = Math.Round(t.Seconds / 60.0, 1)
});

foreach (var r in rows.Take(3))
    Console.WriteLine($"{r.Title}: {r.Minutes}");
```

## Expected output or behaviour

```
Aurora: 3.5
Ice Bloom: 4.1
Glass: 3.3
```

## Practice task

Project each track's title and a `bool` named `IsLong` that is true for 300 seconds or more.

<details>
<summary>Answer / check</summary>

`tracks.Select(t => new { t.Title, IsLong = t.Seconds >= 300 })` — three tracks are long: River Run, Late Train, Night Platform.

</details>

## Next lesson

- [17. Ternary and Whitespace Checks](../07-ternary-and-whitespace/)
