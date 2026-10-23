---
title: "2. Conditions and Interpolation"
description: "Branch with if/else and the conditional operator, and format numbers in text."
sidebar:
  order: 2
---

**Estimated time:** 6 minutes

## Prerequisites

Lesson 1.

## Plain-language explanation

`if`/`else` runs one block or another depending on a `bool` expression. The conditional (ternary) operator `condition ? a : b` is the expression form: use it when you only need to pick one of two values. Inside an interpolated string, a format specifier after a colon controls presentation, so `{total:F2}` shows two decimal places. Formatting only changes how a value is displayed; it does not change the stored value.

## Focused example / procedure

```csharp
decimal total = 120.456m;

if (total > 100m)
    Console.WriteLine("Free shipping");
else
    Console.WriteLine("Standard shipping");

string tier = total >= 100m ? "Preferred" : "Standard";
Console.WriteLine($"Total {total:F2} ({tier})");
```

## Expected output or behaviour

```
Free shipping
Total 120.46 (Preferred)
```

## Practice task

Add a third tier, `"Platinum"`, for totals of 500 or more. Use two nested conditional operators.

<details>
<summary>Answer / check</summary>

`string tier = total >= 500m ? "Platinum" : total >= 100m ? "Preferred" : "Standard";`. Order matters: test the largest threshold first, or every large total would match the first condition.

</details>

## Next lesson

- [3. Lists and Loops](../03-lists-and-loops/)
