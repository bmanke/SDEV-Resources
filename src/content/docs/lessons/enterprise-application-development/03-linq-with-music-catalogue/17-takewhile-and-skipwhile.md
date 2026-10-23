---
title: "27. TakeWhile and SkipWhile"
description: "Stop or start at the first item that fails a condition."
sidebar:
  order: 17
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 26.

## Plain-language explanation

`TakeWhile` returns items from the start until one fails the test, then stops. `SkipWhile` skips items from the start while the test is true, then returns everything that remains, even items that would pass later. That makes both different from `Where`, which checks every item. They depend on order, so sort first, and they work on in-memory sequences; a database provider may not translate them.

## Focused example / procedure

```csharp
var seconds = Music.Tracks.OrderBy(t => t.Id).Select(t => t.Seconds).ToList();
// 210, 245, 198, 305, 402, 355, 280, 190

Console.WriteLine(string.Join(", ", seconds.TakeWhile(s => s < 300)));
Console.WriteLine(string.Join(", ", seconds.SkipWhile(s => s < 300)));
Console.WriteLine(string.Join(", ", seconds.Where(s => s < 300)));
```

## Expected output or behaviour

```
210, 245, 198
305, 402, 355, 280, 190
210, 245, 198, 280, 190
```

## Practice task

Why does `TakeWhile` miss 280 and 190?

<details>
<summary>Answer / check</summary>

It stops permanently at 305, the first value that fails `s < 300`. `Where` keeps checking, so it finds them.

</details>

## Next lesson

- [28. Distinct, Union, Intersect, Except and Concat](../18-set-operators-and-equality/)
