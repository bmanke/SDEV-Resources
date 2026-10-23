---
title: "11. Music Catalogue Fixture"
description: "This fixture provides runnable in-memory data for LINQ lessons when course databases are unavailable."
sidebar:
  order: 1
---

**Estimated time:** 10 minutes

## Prerequisites

- C# list and class basics.

## Plain-language explanation

This fixture provides runnable in-memory data for LINQ lessons when course databases are unavailable.

## Focused example / procedure

```csharp
public record Track(int Id, string Title, string Artist, string Genre, int Year, decimal Price, int AlbumId);
public record Album(int Id, string Name, string Label);

var albums = new List<Album>
{
    new(1, "Northern Lights", "Aurora Records"),
    new(2, "City Echoes", "Signal Works"),
    new(3, "Prairie Drive", "Open Road Audio")
};

var tracks = new List<Track>
{
    new(1, "Late Train", "Mara Cole", "Indie", 2021, 1.29m, 2),
    new(2, "Glass River", "Aden Fox", "Ambient", 2020, 0.99m, 1),
    new(3, "Sunlit Exit", "Mara Cole", "Indie", 2021, 1.29m, 2),
    new(4, "Dustline", "R.K. Hale", "Country", 2019, 1.19m, 3),
    new(5, "Signal Bloom", "Aden Fox", "Ambient", 2024, 1.49m, 1)
};
```

## Expected output or behaviour

You have 3 albums and 5 tracks ready for every LINQ page in this module.

## Practice task

Add one Jazz track and rerun future examples.

<details>
<summary>Answer / check</summary>


Create a new `Track` with `Genre = "Jazz"` and a valid `AlbumId`.


</details>


## Next lesson

- [12. Lambdas and Where](/lessons/enterprise-application-development/03-linq-with-music-catalogue/02-lambdas-and-where/)
