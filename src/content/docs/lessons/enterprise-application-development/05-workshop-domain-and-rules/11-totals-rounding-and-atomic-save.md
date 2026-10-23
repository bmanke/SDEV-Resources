---
title: "48. Totals, Rounding, and Atomic Aggregate Saving"
description: "Server computes line totals/subtotals/tax (5% exercise rule) with explicit rounding and saves aggregate changes atomically."
sidebar:
  order: 11
---

**Estimated time:** 8 minutes

## Prerequisites

- Lesson 47 and transaction basics.

## Plain-language explanation

Server computes line totals/subtotals/tax (5% exercise rule) with explicit rounding and saves aggregate changes atomically.

## Focused example / procedure

```csharp
lineTotal = Math.Round(line.Qty * line.UnitPrice, 2, MidpointRounding.AwayFromZero);
var tax = Math.Round(subtotal * 0.05m, 2, MidpointRounding.AwayFromZero);
```

## Expected output or behaviour

Displayed totals match persisted totals and remain consistent across clients.

## Practice task

Why should clients not be source-of-truth for totals?

<details>
<summary>Answer / check</summary>


Client values can be stale or tampered; server must authoritatively recompute.


</details>


## Next lesson

- [49. Inventory Deltas and Concurrency Safeguards](/lessons/enterprise-application-development/05-workshop-domain-and-rules/12-inventory-deltas-and-concurrency/)
