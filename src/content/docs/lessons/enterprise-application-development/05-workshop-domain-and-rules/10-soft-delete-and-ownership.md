---
title: "47. Soft Delete and Child Ownership"
description: "Hide customers without deleting them, and make sure children belong to their parent."
sidebar:
  order: 10
---

**Estimated time:** 9 minutes

## Prerequisites

Lesson 38.

## Plain-language explanation

A soft delete sets a flag (`RemoveFromView`) instead of removing the row, so history stays intact; every query that lists customers must filter on it. It is not a permission system and not an audit log. Invoice lines are different: the course permits actually removing a line from an invoice. When saving, verify each incoming line belongs to **this** invoice before updating or deleting it, or a crafted request could change another invoice's lines. An omitted line means "delete it" only if the contract says the client sends the complete list.

## Focused example / procedure

```csharp
// In-memory sketch
var invoice = new Invoice(10, 1, DateOnly.FromDateTime(DateTime.Today));
var storedLines = new List<InvoiceLine>
{
    new(1, 10, 1, 2, 32.00m),
    new(2, 11, 2, 1, 24.00m)      // belongs to another invoice
};

int incomingLineId = 2;
var line = storedLines.FirstOrDefault(l => l.Id == incomingLineId && l.InvoiceId == invoice.Id);
Console.WriteLine(line is null ? "Rejected: line does not belong to this invoice." : "OK");

var visible = Workshop.Customers.Count(c => !c.RemoveFromView);
Console.WriteLine(visible);
```

## Expected output or behaviour

```
Rejected: line does not belong to this invoice.
2
```

## Practice task

Why filter on `InvoiceId` as well as the line id?

<details>
<summary>Answer / check</summary>

Ids are unique across the table, but a caller might send an id from a different invoice. The extra condition enforces ownership.

</details>

## Next lesson

- [48. Totals, Rounding and Atomic Save](../11-totals-rounding-and-atomic-save/)
