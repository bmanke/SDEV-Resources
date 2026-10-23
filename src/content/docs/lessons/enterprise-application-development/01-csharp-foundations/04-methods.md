---
title: "4. Methods for Reuse"
description: "Methods isolate one job and return predictable results."
sidebar:
  order: 4
---

**Estimated time:** 6 minutes

## Prerequisites

- Lesson 3.

## Plain-language explanation

Methods isolate one job and return predictable results. Small methods are easier to test and compose in services.

## Focused example / procedure

```csharp
static decimal ApplyTax(decimal subtotal)
{
    return Math.Round(subtotal * 1.05m, 2, MidpointRounding.AwayFromZero);
}

Console.WriteLine(ApplyTax(100m));
```

## Expected output or behaviour

Output is `105.00`, showing the 5% exercise tax rule with explicit rounding.

## Practice task

Create `ApplyDiscount(decimal subtotal, decimal percent)` and round to two decimals.

<details>
<summary>Answer / check</summary>


Multiply by `(1 - percent)` and use the same `Math.Round(..., 2, MidpointRounding.AwayFromZero)` rule.


</details>


## Next lesson

- [5. Classes and Properties](/lessons/enterprise-application-development/01-csharp-foundations/05-classes-and-properties/)
