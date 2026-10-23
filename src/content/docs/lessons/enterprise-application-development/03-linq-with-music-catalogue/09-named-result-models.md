---
title: "19. Named Result Models"
description: "Replace an anonymous projection with a named type a service can return."
sidebar:
  order: 9
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 18.

## Plain-language explanation

When one layer returns data to another, the receiver needs a type it can name. A record with only the fields the screen needs is a view model. Naming the shape also makes the service easy to test, because you can compare results to expected records.

## Focused example / procedure

```csharp
// ArtistSummary.cs
public record ArtistSummary(string Name, int AlbumCount, List<string> Albums);
```

```csharp
// Program.cs
static List<ArtistSummary> GetArtistSummaries() =>
    Music.Artists
        .OrderBy(a => a.Name)
        .Select(a => new ArtistSummary(
            a.Name,
            Music.Albums.Count(al => al.ArtistId == a.Id),
            Music.Albums.Where(al => al.ArtistId == a.Id).Select(al => al.Title).ToList()))
        .ToList();

foreach (var s in GetArtistSummaries())
    Console.WriteLine($"{s.Name}: {s.AlbumCount}");
```

## Expected output or behaviour

```
Aurora Vale: 2
Brick Lane Trio: 2
Cobalt Sky: 0
```

## Practice task

Add `LatestYear` (nullable) to the record. What should it be for Cobalt Sky?

<details>
<summary>Answer / check</summary>

`int?`, and it should be `null` for Cobalt Sky because there is no album to take a maximum from. See the empty-sequence rules in Lesson 21.

</details>

## Next lesson

- [20. Count, Any and All](../10-count-any-all/)
