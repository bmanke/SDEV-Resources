---
title: "2. Conditions and String Interpolation"
description: "`if/else` branches behavior, while interpolation keeps output readable."
sidebar:
  order: 2
---

**Estimated time:** 7 minutes

## Prerequisites

- Lesson 1.

## Plain-language explanation

`if/else` branches behavior, while interpolation keeps output readable. Use ternary only for short, single-decision expressions.

## Focused example / procedure

```csharp
int stock = 0;
string state = stock > 0 ? "In stock" : "Out of stock";

if (stock == 0)
{
    Console.WriteLine($"Status: {state}. Reorder today.");
}
else
{
    Console.WriteLine($"Status: {state}. Sell normally.");
}
```

## Expected output or behaviour

With `stock = 0`, output says reorder today. Changing `stock` to a positive number changes branch text.

## Practice task

Show "Low stock" for values from 1 to 5 and "Healthy stock" above 5.

<details>
<summary>Answer / check</summary>


Use `if (stock == 0)`, `else if (stock <= 5)`, then `else`.


</details>


## Next lesson

- [3. Lists and Loops](/lessons/enterprise-application-development/01-csharp-foundations/03-lists-and-loops/)
