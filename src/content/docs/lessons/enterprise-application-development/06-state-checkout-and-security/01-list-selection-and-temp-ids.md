---
title: "50. List-to-List Selection and Stable Temporary IDs"
description: "Use stable temporary IDs (GUID/int counter in scoped state) for client-side draft rows; never rely on `Count+1` for persistent IDs."
sidebar:
  order: 1
---

**Estimated time:** 7 minutes

## Prerequisites

- Basic component state.

## Plain-language explanation

Use stable temporary IDs (GUID/int counter in scoped state) for client-side draft rows; never rely on `Count+1` for persistent IDs.

## Focused example / procedure

```csharp
var tempId = Guid.NewGuid();
selectedParts.Add(new DraftLine { TempId = tempId, PartId = part.Id, Qty = 1 });
```

## Expected output or behaviour

Rows remain addressable for edit/remove operations even when reordered.

## Practice task

Explain why removing one row breaks index-based identity.

<details>
<summary>Answer / check</summary>


Indexes shift after deletion; stable IDs do not.


</details>


## Next lesson

- [51. Scoped CartState and Deep-Copy Cancel](/lessons/enterprise-application-development/06-state-checkout-and-security/02-scoped-cartstate-and-drafts/)
