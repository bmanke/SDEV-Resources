---
title: "26. Skip/Take Pagination Windows"
description: "`Skip` and `Take` define deterministic windows for pagination once ordering is stable."
sidebar:
  order: 16
---

**Estimated time:** 7 minutes

## Prerequisites

- Lessons 15 and 23.

## Plain-language explanation

`Skip` and `Take` define deterministic windows for pagination once ordering is stable.

## Focused example / procedure

```csharp
int page = 2, size = 2;
var pageRows = tracks
    .OrderBy(t => t.Title).ThenBy(t => t.Id)
    .Skip((page - 1) * size)
    .Take(size);
```

## Expected output or behaviour

Page 2 returns the second window of stable rows.

## Practice task

Get page 3 with size 1.

<details>
<summary>Answer / check</summary>


Set `page = 3`, `size = 1`, keep deterministic ordering.


</details>


## Next lesson

- [27. TakeWhile and SkipWhile](/lessons/enterprise-application-development/03-linq-with-music-catalogue/17-takewhile-and-skipwhile/)
