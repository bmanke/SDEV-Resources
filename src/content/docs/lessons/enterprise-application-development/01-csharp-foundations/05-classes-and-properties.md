---
title: "5. Classes and Properties"
description: "A class models a concept with properties."
sidebar:
  order: 5
---

**Estimated time:** 7 minutes

## Prerequisites

- Lessons 1–4.

## Plain-language explanation

A class models a concept with properties. Use clear defaults so objects start valid instead of null-heavy.

## Focused example / procedure

```csharp
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool IsDeleted { get; set; }
}

var customer = new Customer { Id = 7, Name = "Miko" };
Console.WriteLine(customer.Name);
```

## Expected output or behaviour

The object prints `Miko`; `Name` is never null by default.

## Practice task

Add a read-only computed property `Display => $"{Id} - {Name}"`.

<details>
<summary>Answer / check</summary>


Add `public string Display => $"{Id} - {Name}";` in the class body.


</details>


## Next lesson

- [6. Two-Project Solutions and Reference Direction](/lessons/enterprise-application-development/01-csharp-foundations/06-two-project-solution-references/)
