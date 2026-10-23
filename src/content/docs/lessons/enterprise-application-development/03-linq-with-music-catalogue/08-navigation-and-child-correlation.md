---
title: "18. Navigation and Child Correlation"
description: "Attach each artist's own albums, never everyone's."
sidebar:
  order: 8
---

**Estimated time:** 9 minutes

## Prerequisites

Lessons 11 and 16.

## Plain-language explanation

In a database model, an artist's albums are reached through a navigation property (`artist.Albums` in EF) or by matching the foreign key. The in-memory fixture has no navigation properties, so we correlate by hand with `al.ArtistId == a.Id`. Forgetting that predicate is a real mistake that attaches every album to every artist. Always include artists with no children, and count on getting an empty list rather than null.

## Focused example / procedure

```csharp
var rows = Music.Artists
    .OrderBy(a => a.Name)
    .Select(a => new
    {
        a.Name,
        Albums = Music.Albums
            .Where(al => al.ArtistId == a.Id)
            .OrderBy(al => al.Year)
            .Select(al => al.Title)
            .ToList()
    });

foreach (var r in rows)
    Console.WriteLine($"{r.Name}: {(r.Albums.Count == 0 ? "(none)" : string.Join(", ", r.Albums))}");
```
With EF you would write `a.Albums.OrderBy(...)` and let the provider generate the join. Projecting this way fetches what you need and avoids the "N+1" pattern of one extra query per parent.

## Expected output or behaviour

```
Aurora Vale: Northern Lights, Glass Rivers
Brick Lane Trio: Late Train, Harbor Notes
Cobalt Sky: (none)
```

## Practice task

What would the output look like if you removed the `Where` line?

<details>
<summary>Answer / check</summary>

Every artist would list all four albums, including Cobalt Sky, who has none. The correlating predicate is what makes the nesting correct.

</details>

## Next lesson

- [19. Named Result Models](../09-named-result-models/)
