---
title: "42. DbContext Factory and Per-Operation Lifetime"
description: "In Interactive Server UI, create/dispose context per operation."
sidebar:
  order: 5
---

**Estimated time:** 7 minutes

## Prerequisites

- Lesson 41.

## Plain-language explanation

In Interactive Server UI, create/dispose context per operation. Clearing change tracking does not roll back committed writes.

## Focused example / procedure

```csharp
await using var db = await dbFactory.CreateDbContextAsync();
var customer = await db.Customers.FindAsync(id);
```

## Expected output or behaviour

Each operation gets an isolated context, reducing stale tracking issues.

## Practice task

Can `ChangeTracker.Clear()` undo already saved data?

<details>
<summary>Answer / check</summary>


No. It only detaches tracked entities; committed writes remain in the database.


</details>


## Next lesson

- [43. Customer Search Service States](/lessons/enterprise-application-development/05-workshop-domain-and-rules/06-customer-search-states/)
