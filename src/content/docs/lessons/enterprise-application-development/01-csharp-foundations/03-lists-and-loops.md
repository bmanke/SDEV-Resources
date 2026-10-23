---
title: "3. Lists and Loops"
description: "Store several values in a List<T> and visit each one with foreach and for."
sidebar:
  order: 3
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 2.

## Plain-language explanation

`List<T>` is a resizable collection where every item has the same type. `foreach` is the simplest way to visit every item when you do not need its position. Use `for` when you need the index, for example to number a list. Never add to or remove from a list while a `foreach` is walking it: the loop will throw because the collection changed underneath it.

## Focused example / procedure

```csharp
List<string> parts = new() { "Chain", "Brake pads" };
parts.Add("Tyre");

foreach (string part in parts)
    Console.WriteLine(part);

for (int i = 0; i < parts.Count; i++)
    Console.WriteLine($"{i + 1}: {parts[i]}");
```

## Expected output or behaviour

```
Chain
Brake pads
Tyre
1: Chain
2: Brake pads
3: Tyre
```

## Practice task

Print only the parts whose name is longer than 5 characters, using `foreach` and an `if`.

<details>
<summary>Answer / check</summary>

`foreach (var p in parts) { if (p.Length > 5) Console.WriteLine(p); }` prints `Brake pads`. Lesson 12 shows the same idea with LINQ's `Where`.

</details>

## Next lesson

- [4. Methods](../04-methods/)
