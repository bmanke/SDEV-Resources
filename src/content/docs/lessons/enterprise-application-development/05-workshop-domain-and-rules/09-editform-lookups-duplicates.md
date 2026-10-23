---
title: "46. EditForm Validation, Lookups, and Duplicate Rules"
description: "Validate in UI and on server."
sidebar:
  order: 9
---

**Estimated time:** 8 minutes

## Prerequisites

- Lessons 35–36 and 40.

## Plain-language explanation

Validate in UI and on server. Enforce true uniqueness with DB constraints and handle race-condition failures.

## Focused example / procedure

```csharp
model.Name = model.Name.Trim();
if (await db.Customers.AnyAsync(c => c.Name == model.Name && c.Id != model.Id))
    errors.Add("Customer name must be unique.");
```

## Expected output or behaviour

Duplicate names are blocked with both friendly validation and durable database enforcement.

## Practice task

Why is pre-check alone insufficient for uniqueness?

<details>
<summary>Answer / check</summary>


Concurrent saves can pass pre-check simultaneously; DB unique index is still required.


</details>


## Next lesson

- [47. Soft Delete, Ownership, and Delete Contracts](/lessons/enterprise-application-development/05-workshop-domain-and-rules/10-soft-delete-and-ownership/)
