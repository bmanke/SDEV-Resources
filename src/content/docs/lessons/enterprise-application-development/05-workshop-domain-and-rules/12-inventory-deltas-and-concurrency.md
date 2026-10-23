---
title: "49. Inventory Deltas and Concurrency"
description: "Adjust stock by the difference in quantity, and detect conflicting edits."
sidebar:
  order: 12
---

**Estimated time:** 10 minutes

## Prerequisites

Lesson 48.

## Plain-language explanation

When an invoice line changes from quantity 2 to 5, only the **difference** (+3) should come off stock. Removing a line returns its whole quantity. Two users can both read the same stock level and both succeed unless the database notices: add a concurrency token such as a `rowversion` column and handle `DbUpdateConcurrencyException`. Some course versions leave stock updates for later, so treat this as an exercise in the rule, not a finished stock system.

## Focused example / procedure

```csharp
static int? NewStock(int onHand, int oldQty, int newQty)
{
    int delta = newQty - oldQty;          // positive = customer takes more
    int result = onHand - delta;
    return result < 0 ? null : result;    // null = not enough stock
}

Console.WriteLine(NewStock(10, 2, 5));
Console.WriteLine(NewStock(2, 2, 5)?.ToString() ?? "rejected");
Console.WriteLine(NewStock(10, 5, 2));
```

```csharp
// Concurrency token (EF Core fragment)
public class PartEntity
{
    public int PartID { get; set; }
    public int QuantityOnHand { get; set; }
    [Timestamp] public byte[] RowVersion { get; set; } = Array.Empty<byte>();
}
```

## Expected output or behaviour

```
7
rejected
13
```

## Practice task

What should the user see on a `DbUpdateConcurrencyException`?

<details>
<summary>Answer / check</summary>

A message that the record changed since they loaded it, with a way to reload and retry. Do not silently overwrite the other user's change.

</details>

## Next lesson

- [50. List Selection and Stable Identifiers](../../06-state-checkout-and-security/01-list-selection-and-temp-ids/)
