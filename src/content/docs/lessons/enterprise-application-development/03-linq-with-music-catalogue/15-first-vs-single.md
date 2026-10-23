---
title: "25. First versus Single"
description: "Pick the single-item operator whose contract matches your intent."
sidebar:
  order: 15
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 12.

## Plain-language explanation

The four operators make different promises. `First` needs at least one match and throws if there are none. `FirstOrDefault` returns `null` (or default) when none match. `Single` demands exactly one match and throws on zero or more than one. `SingleOrDefault` allows zero or one but throws on more than one. Use `Single` when duplicates would be a data error you want to know about, and `FirstOrDefault` when "any one" is fine. Add an `OrderBy` when "first" must mean something.

## Focused example / procedure

```csharp
var tracks = Music.Tracks;

Console.WriteLine(tracks.Single(t => t.Id == 3).Title);
Console.WriteLine(tracks.FirstOrDefault(t => t.Genre == "Rock")?.Title ?? "none");
Console.WriteLine(tracks.OrderBy(t => t.Title).First(t => t.Genre == "Jazz").Title);

try { tracks.Single(t => t.Genre == "Jazz"); }
catch (InvalidOperationException ex) { Console.WriteLine("Single failed: " + ex.Message); }
```

## Expected output or behaviour

```
Glass
none
Harbor
Single failed: Sequence contains more than one matching element
```
(The exact exception wording can vary by .NET version.)

## Practice task

A customer lookup by primary key should find exactly one. Which operator?

<details>
<summary>Answer / check</summary>

`SingleOrDefault` (or `FirstOrDefault`): zero is a normal "not found", and two rows with one key would indicate corrupt data worth failing on.

</details>

## Next lesson

- [26. Skip and Take for Paging](../16-skip-take-and-windowing/)
