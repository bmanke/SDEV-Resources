---
title: "40. Collecting Validation Results"
description: "Collect multiple validation messages instead of failing fast on first issue to improve user correction speed."
sidebar:
  order: 3
---

**Estimated time:** 7 minutes

## Prerequisites

- Lesson 39.

## Plain-language explanation

Collect multiple validation messages instead of failing fast on first issue to improve user correction speed.

## Focused example / procedure

```csharp
var errors = new List<string>();
if (line.Qty <= 0) errors.Add("Quantity must be greater than zero.");
if (line.UnitPrice < 0) errors.Add("Price cannot be negative.");
```

## Expected output or behaviour

Caller receives all actionable issues in one response.

## Practice task

Add validation that `PartId` exists in allowed lookup values.

<details>
<summary>Answer / check</summary>


Check `parts.Any(p => p.Id == line.PartId)` and add an error when false.


</details>


## Next lesson

- [41. EF Entities, DbContext, and DI Registration](/lessons/enterprise-application-development/05-workshop-domain-and-rules/04-ef-entities-context-di/)
