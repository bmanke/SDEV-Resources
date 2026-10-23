---
title: "3. Lists and Loops"
description: "A `List<T>` stores a dynamic collection."
sidebar:
  order: 3
---

**Estimated time:** 7 minutes

## Prerequisites

- Lessons 1–2.

## Plain-language explanation

A `List<T>` stores a dynamic collection. `for` is useful when you need index positions, while `foreach` is simpler for read-only iteration.

## Focused example / procedure

```csharp
List<string> parts = ["Brake pad", "Oil filter", "Wiper blade"];

for (int i = 0; i < parts.Count; i++)
{
    Console.WriteLine($"{i + 1}. {parts[i]}");
}
```

## Expected output or behaviour

The list prints in order with one-based numbering.

## Practice task

Print only items containing the word "Oil" using `foreach`.

<details>
<summary>Answer / check</summary>


`foreach (var part in parts) if (part.Contains("Oil")) Console.WriteLine(part);`


</details>


## Next lesson

- [4. Methods for Reuse](/lessons/enterprise-application-development/01-csharp-foundations/04-methods/)
