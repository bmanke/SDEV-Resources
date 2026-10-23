---
title: "38. The Workshop Fixture"
description: "Create an in-memory customer, part and invoice data set."
sidebar:
  order: 1
---

**Estimated time:** 8 minutes

## Prerequisites

Lessons 1–5.

## Plain-language explanation

The application lessons use a second original data set, Workshop, for a small bike-parts-and-service shop. It includes a soft-deleted customer (`RemoveFromView = true`) and a part with no stock so that business rules have something to reject. All people and emails are fictional.

## Focused example / procedure

```csharp
// Fixture.cs (separate console project, or the WorkshopSystem project)
public record Customer(int Id, string FirstName, string LastName, string Phone, string Email, bool RemoveFromView);
public record Part(int Id, string Description, decimal Price, int QuantityOnHand, bool Taxable);
public record Invoice(int Id, int CustomerId, DateOnly Date);
public record InvoiceLine(int Id, int InvoiceId, int PartId, int Quantity, decimal UnitPrice);

public static class Workshop
{
    public static readonly List<Customer> Customers = new()
    {
        new(1, "Morgan", "Lee",   "780-555-0101", "morgan@example.com", false),
        new(2, "Priya",  "Singh", "780-555-0102", "priya@example.com",  false),
        new(3, "Sam",    "Lee",   "780-555-0103", "sam@example.com",    true)
    };

    public static readonly List<Part> Parts = new()
    {
        new(1, "Chain",      32.00m, 10, true),
        new(2, "Brake pads", 24.00m,  4, true),
        new(3, "Tyre",       45.00m,  0, true)
    };
}
```

```csharp
// Program.cs
foreach (var c in Workshop.Customers.Where(c => !c.RemoveFromView))
    Console.WriteLine($"{c.Id}: {c.FirstName} {c.LastName}");
```

## Expected output or behaviour

```
1: Morgan Lee
2: Priya Singh
```

## Practice task

Why is Sam Lee not in the output?

<details>
<summary>Answer / check</summary>

`RemoveFromView` is true: Sam is hidden by a soft delete. The row still exists; the query chooses not to show it.

</details>

## Next lesson

- [39. Service Pattern and Test Driver](../02-service-pattern-and-test-driver/)
