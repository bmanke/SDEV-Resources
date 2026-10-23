---
title: "1. C# Variables and Types"
description: "A variable stores one value of a specific type."
sidebar:
  order: 1
---

**Estimated time:** 6 minutes

## Prerequisites

- Comfort using the terminal and `dotnet new console`.

## Plain-language explanation

A variable stores one value of a specific type. Strong typing catches mistakes at compile time, so `int`, `decimal`, `string`, and `bool` should match the data meaning.

## Focused example / procedure

```csharp
string customerName = "Amina";
int openInvoices = 3;
decimal creditLimit = 2500.00m;
bool isPreferred = true;

Console.WriteLine($"{customerName} | Invoices: {openInvoices} | Limit: {creditLimit:C} | Preferred: {isPreferred}");
```

## Expected output or behaviour

The app prints one line with correctly formatted values and no runtime conversion errors.

## Practice task

Add a `DateTime` variable for `lastPayment` and print it as `yyyy-MM-dd`.

<details>
<summary>Answer / check</summary>


Use `DateTime lastPayment = new(2026, 10, 20);` and interpolate with `{lastPayment:yyyy-MM-dd}`.


</details>


## Next lesson

- [2. Conditions and String Interpolation](/lessons/enterprise-application-development/01-csharp-foundations/02-conditions-and-interpolation/)
