---
title: "5. Classes and Properties"
description: "Model a thing with a class, properties and an object initializer."
sidebar:
  order: 5
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 4.

## Plain-language explanation

A class groups related data and behaviour into a new type. Properties (`{ get; set; }`) are the public data of the object; a computed property like `FullName` has only a getter and is calculated every time you read it. An object initializer sets properties right after `new`. Give string properties a default of `string.Empty` so they are never null by accident. Records (used later for fixtures) are classes with value-based equality and a short syntax.

## Focused example / procedure

```csharp
// Customer.cs
public class Customer
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName => $"{FirstName} {LastName}";
}
```

```csharp
// Program.cs
var customer = new Customer { Id = 1, FirstName = "Morgan", LastName = "Lee" };
Console.WriteLine(customer.FullName);
```

## Expected output or behaviour

`Morgan Lee`

## Practice task

Add an `Email` property and a `bool HasEmail` getter that is true when `Email` is not blank.

<details>
<summary>Answer / check</summary>

`public string Email { get; set; } = string.Empty;` and `public bool HasEmail => !string.IsNullOrWhiteSpace(Email);`

</details>

## Next lesson

- [6. Two-Project Solution and References](../06-two-project-solution-references/)
