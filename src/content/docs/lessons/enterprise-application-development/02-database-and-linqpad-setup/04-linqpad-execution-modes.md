---
title: "10. LINQPad Execution Modes"
description: "Choose Expression, Statements or Program mode for the job at hand."
sidebar:
  order: 4
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 9.

## Plain-language explanation

LINQPad has three language modes. **C# Expression** runs a single expression with no trailing semicolon. **C# Statements** runs several semicolon-terminated statements from top to bottom. **C# Program** wraps your code in `void Main()` and lets you write helper methods below it, which is how you prototype a service method before pasting it into your project. `.Dump()` prints a result and is a LINQPad feature; in Visual Studio use `Console.WriteLine`.

## Focused example / procedure

```csharp
// Expression mode (no semicolon)
Customers.Where(c => c.LastName == "Lee")
```

```csharp
// Statements mode
var lees = Customers.Where(c => c.LastName == "Lee").ToList();
lees.Dump("Lee customers");
```

```csharp
// Program mode
void Main()
{
    CountByLastName("Lee").Dump();
}

int CountByLastName(string last) =>
    Customers.Count(c => c.LastName == last);
```

## Expected output or behaviour

All three show the matching data; the Program version prints a single number. Changing the language drop-down changes whether `Main` is required.

## Practice task

You get a compile error mentioning `Dump` in a Visual Studio project. Why?

<details>
<summary>Answer / check</summary>

`Dump()` is added by LINQPad and does not exist in a normal .NET project. Replace it with `Console.WriteLine` or return the value.

</details>

## Next lesson

- [11. The Music Catalogue Fixture](../../03-linq-with-music-catalogue/01-music-catalogue-fixture/)
