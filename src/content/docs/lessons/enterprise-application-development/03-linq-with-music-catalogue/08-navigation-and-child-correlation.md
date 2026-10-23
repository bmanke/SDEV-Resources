---
title: "18. Navigation Properties and Child Correlation"
description: "Correlate parent/child data by foreign key or navigation, not by unrelated fields."
sidebar:
  order: 8
---

**Estimated time:** 8 minutes

## Prerequisites

- Lessons 11–17.

## Plain-language explanation

Correlate parent/child data by foreign key or navigation, not by unrelated fields.

## Focused example / procedure

```csharp
var albumWithTracks = albums.Select(a => new
{
    a.Name,
    Tracks = tracks.Where(t => t.AlbumId == a.Id).Select(t => t.Title).ToList()
});
```

## Expected output or behaviour

Each album only includes its own tracks.

## Practice task

Show track count per album.

<details>
<summary>Answer / check</summary>


Add `Count = tracks.Count(t => t.AlbumId == a.Id)` in the projection.


</details>


## Next lesson

- [19. Named Result Models](/lessons/enterprise-application-development/03-linq-with-music-catalogue/09-named-result-models/)
