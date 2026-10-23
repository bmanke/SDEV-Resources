---
title: "47. Soft Delete, Ownership, and Delete Contracts"
description: "Soft-delete customers for history retention, but allow permitted hard-delete of invoice lines with ownership checks."
sidebar:
  order: 10
---

**Estimated time:** 8 minutes

## Prerequisites

- Lessons 38 and 46.

## Plain-language explanation

Soft-delete customers for history retention, but allow permitted hard-delete of invoice lines with ownership checks.

## Focused example / procedure

```csharp
customer.IsDeleted = true; // soft delete customer

var line = invoice.Lines.Single(l => l.Id == lineId);
invoice.Lines.Remove(line); // hard delete line within invoice contract
```

## Expected output or behaviour

Customer history remains; line deletion is constrained to its parent invoice.

## Practice task

Why validate line ownership before delete?

<details>
<summary>Answer / check</summary>


To prevent deleting a line that belongs to another invoice by tampered IDs.


</details>


## Next lesson

- [48. Totals, Rounding, and Atomic Aggregate Saving](/lessons/enterprise-application-development/05-workshop-domain-and-rules/11-totals-rounding-and-atomic-save/)
