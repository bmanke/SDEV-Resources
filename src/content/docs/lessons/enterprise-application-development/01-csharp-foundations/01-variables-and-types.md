---
title: "1. Variables and Types"
description: "Declare typed values and print them with string interpolation."
sidebar:
  order: 1
---

**Estimated time:** 5 minutes

## Prerequisites

A .NET console project (`dotnet new console`).

## Plain-language explanation

A variable is a named place to keep a value, and every C# variable has a type that decides what it can hold. Use `string` for text, `int` for whole numbers, `decimal` for money, `bool` for true/false and `DateOnly` for calendar dates. The `m` suffix marks a decimal literal (`25.50m`); without it the compiler treats `25.50` as a `double`, which is binary floating point and a poor fit for currency. `var` lets the compiler infer the type from the right-hand side, but the variable is still strongly typed.

## Focused example / procedure

```csharp
string name = "Morgan";
int visits = 3;
decimal rate = 25.50m;
bool active = true;
DateOnly joined = new(2026, 9, 1);
var city = "Edmonton";   // inferred as string

Console.WriteLine($"{name} {visits} {rate} {active} {joined:yyyy-MM-dd} {city}");
```

## Expected output or behaviour

`Morgan 3 25.50 True 2026-09-01 Edmonton`

## Practice task

Add a `decimal` named `balance` set to `0m` and print it. Then try `visits = "three";` and read the compiler error.

<details>
<summary>Answer / check</summary>

`decimal balance = 0m; Console.WriteLine(balance);` prints `0`. The assignment fails to compile because a `string` cannot be stored in an `int` variable: the type is checked before the program runs.

</details>

## Next lesson

- [2. Conditions and Interpolation](../02-conditions-and-interpolation/)
