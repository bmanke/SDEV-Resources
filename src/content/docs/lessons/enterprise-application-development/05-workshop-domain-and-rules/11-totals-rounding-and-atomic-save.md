---
title: "48. Totals, Rounding and Atomic Save"
description: "Compute money on the server and save the parent and children together."
sidebar:
  order: 11
---

**Estimated time:** 10 minutes

## Prerequisites

Lessons 4 and 38.

## Plain-language explanation

Prices, subtotals, tax and totals are calculated by the server from trusted data; never accept totals sent by the browser. Use `decimal` and round once, with an explicit rule. The 5% tax here is an exercise rule, not tax advice. "Atomic" means all changes succeed together or none do: one `SaveChanges()` call runs in a single transaction, so add the invoice and its lines to the context and save once. If you need several saves or other systems in one unit of work, wrap them in an explicit transaction. Clearing the change tracker does not undo anything that has already been committed.

## Focused example / procedure

```csharp
static (decimal Subtotal, decimal Tax, decimal Total) Totals(
    IEnumerable<(decimal Price, int Qty, bool Taxable)> lines)
{
    var list = lines.ToList();
    decimal subtotal = list.Sum(l => l.Price * l.Qty);
    decimal taxable  = list.Where(l => l.Taxable).Sum(l => l.Price * l.Qty);
    decimal tax = decimal.Round(taxable * 0.05m, 2, MidpointRounding.AwayFromZero);
    return (subtotal, tax, subtotal + tax);
}

var t = Totals(new[] { (0.99m, 3, true) });
Console.WriteLine($"{t.Subtotal} {t.Tax} {t.Total}");
```

```csharp
// Database fragment: one SaveChanges is one transaction
db.Invoices.Add(invoiceEntity);           // lines are added through the navigation property
await db.SaveChangesAsync(ct);
```

## Expected output or behaviour

`2.97 0.15 3.12`

## Practice task

Why round the tax once on the taxable total instead of per line?

<details>
<summary>Answer / check</summary>

That is the rule this exercise chose; it keeps one visible rounding step. A real system must follow its jurisdiction's rule and document it.

</details>

## Next lesson

- [49. Inventory Deltas and Concurrency](../12-inventory-deltas-and-concurrency/)
