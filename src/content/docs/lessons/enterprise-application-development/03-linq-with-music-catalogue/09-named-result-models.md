---
title: "19. Named Result Models"
description: "Use named models for reusable query results, especially in services/UI boundaries."
sidebar:
  order: 9
---

**Estimated time:** 6 minutes

## Prerequisites

- Lesson 18.

## Plain-language explanation

Use named models for reusable query results, especially in services/UI boundaries.

## Focused example / procedure

```csharp
public record AlbumCard(string Name, int TrackCount);

var cards = albums.Select(a => new AlbumCard(
    a.Name,
    tracks.Count(t => t.AlbumId == a.Id)));
```

## Expected output or behaviour

Results can be passed to another method/component without anonymous-type scope limits.

## Practice task

Add a `CheapestTrackPrice` property to `AlbumCard`.

<details>
<summary>Answer / check</summary>


Compute `tracks.Where(...).Min(t => t.Price)` with empty handling as needed.


</details>


## Next lesson

- [20. Count, Any, and All on Empty Sequences](/lessons/enterprise-application-development/03-linq-with-music-catalogue/10-count-any-all/)
