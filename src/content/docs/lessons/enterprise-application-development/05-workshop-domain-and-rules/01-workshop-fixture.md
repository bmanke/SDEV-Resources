---
title: "38. Workshop Fixture: Customers, Parts, and Invoices"
description: "This original fixture powers application lessons without external course databases."
sidebar:
  order: 1
---

**Estimated time:** 9 minutes

## Prerequisites

- C# classes and lists.

## Plain-language explanation

This original fixture powers application lessons without external course databases.

## Focused example / procedure

```csharp
public class WorkshopCustomer { public int Id { get; set; } public string Name { get; set; } = ""; public bool IsDeleted { get; set; } }
public class WorkshopPart { public int Id { get; set; } public string Name { get; set; } = ""; public int StockQty { get; set; } public decimal UnitPrice { get; set; } }
public class WorkshopInvoice { public int Id { get; set; } public int CustomerId { get; set; } public List<WorkshopInvoiceLine> Lines { get; set; } = new(); }
public class WorkshopInvoiceLine { public int Id { get; set; } public int PartId { get; set; } public int Qty { get; set; } public decimal UnitPrice { get; set; } }
```

## Expected output or behaviour

You have baseline models for customer search, invoice editing, and inventory updates.

## Practice task

Seed at least two customers and three parts with stock quantities.

<details>
<summary>Answer / check</summary>


Create list initializers with fixed Id values for deterministic examples.


</details>


## Next lesson

- [39. Service + Test-Driver Pattern](/lessons/enterprise-application-development/05-workshop-domain-and-rules/02-service-pattern-and-test-driver/)
