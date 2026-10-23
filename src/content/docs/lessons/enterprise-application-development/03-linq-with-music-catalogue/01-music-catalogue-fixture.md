---
title: "11. The Music Catalogue Fixture"
description: "Create the in-memory data set every LINQ lesson uses."
sidebar:
  order: 1
---

**Estimated time:** 8 minutes

## Prerequisites

Lessons 1–5.

## Plain-language explanation

Every LINQ lesson in this module runs against the same tiny, original catalogue so you can predict each result by hand. It has three artists, four albums and eight tracks, and it deliberately includes edge cases: an album with no label, an artist (Cobalt Sky) with no albums, two albums from the same year, and ties on price. These are the situations that trip up real queries.

## Focused example / procedure

```csharp
// Fixture.cs  (add to a new console project; implicit usings must be on)
public record Artist(int Id, string Name);
public record Album(int Id, int ArtistId, string Title, int Year, string? Label);
public record Track(int Id, int AlbumId, string Title, string Genre, decimal Price, int Seconds);

public static class Music
{
    public static readonly List<Artist> Artists = new()
    {
        new(1, "Aurora Vale"), new(2, "Brick Lane Trio"), new(3, "Cobalt Sky")
    };

    public static readonly List<Album> Albums = new()
    {
        new(1, 1, "Northern Lights", 1998, "Polar"),
        new(2, 1, "Glass Rivers",    2004, null),
        new(3, 2, "Late Train",      1998, "Polar"),
        new(4, 2, "Harbor Notes",    2021, "Tidewater")
    };

    public static readonly List<Track> Tracks = new()
    {
        new(1, 1, "Aurora",         "Pop",   0.99m, 210),
        new(2, 1, "Ice Bloom",      "Pop",   0.99m, 245),
        new(3, 2, "Glass",          "Indie", 1.29m, 198),
        new(4, 2, "River Run",      "Indie", 1.29m, 305),
        new(5, 3, "Late Train",     "Jazz",  0.99m, 402),
        new(6, 3, "Night Platform", "Jazz",  1.29m, 355),
        new(7, 4, "Harbor",         "Jazz",  1.29m, 280),
        new(8, 4, "Tide Table",     "Indie", 0.99m, 190)
    };
}
```

```csharp
// Program.cs
foreach (var t in Music.Tracks)
    Console.WriteLine($"{t.Id} {t.Title} ({t.Genre}) {t.Price:F2} {t.Seconds}s");
```

## Expected output or behaviour

Eight lines, from `1 Aurora (Pop) 0.99 210s` to `8 Tide Table (Indie) 0.99 190s`. Later lessons begin with `var tracks = Music.Tracks;`.

## Practice task

Which artist has no albums, and why is that useful for testing?

<details>
<summary>Answer / check</summary>

Cobalt Sky. A query that joins or nests children must still return the artist with an empty list; code that assumes at least one child breaks on this row.

</details>

## Next lesson

- [12. Lambdas and Where](../02-lambdas-and-where/)
