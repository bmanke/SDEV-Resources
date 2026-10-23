---
title: "4. Methods"
description: "Wrap logic in a method with parameters, a return value and a default argument."
sidebar:
  order: 4
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 3.

## Plain-language explanation

A method gives a piece of logic a name, inputs and an output. Parameters can have default values, so callers may leave them out. Small methods like this one are what you will later move into a service class, which is why the course trains you to write them as pure functions first: the same inputs always produce the same output, so they are easy to test.

## Focused example / procedure

```csharp
static decimal AddTax(decimal subtotal, decimal rate = 0.05m)
{
    decimal tax = decimal.Round(subtotal * rate, 2, MidpointRounding.AwayFromZero);
    return subtotal + tax;
}

Console.WriteLine(AddTax(80m));
Console.WriteLine(AddTax(2.97m));
Console.WriteLine(AddTax(80m, 0.10m));
```

## Expected output or behaviour

```
84.00
3.12
88.00
```
`2.97 × 0.05 = 0.1485`, which rounds to `0.15`, so the total is `3.12`. The 5% rate is an exercise rule, not tax advice.

## Practice task

Write `Discount(decimal price, int percent)` that returns the discounted price rounded to two decimals.

<details>
<summary>Answer / check</summary>

`static decimal Discount(decimal price, int percent) => decimal.Round(price * (100 - percent) / 100m, 2, MidpointRounding.AwayFromZero);` — `Discount(80m, 25)` returns `60.00`.

</details>

## Next lesson

- [5. Classes and Properties](../05-classes-and-properties/)
