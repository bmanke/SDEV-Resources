---
title: "24. IEnumerable versus IQueryable"
description: "Know where your filter executes: in memory or in the database."
sidebar:
  order: 14
---

**Estimated time:** 9 minutes

## Prerequisites

Lesson 23.

## Plain-language explanation

`IEnumerable<T>` operators run in your application's memory, one item at a time. `IQueryable<T>` operators build an expression tree that a provider such as EF Core translates to SQL, so the database does the work and only the results travel. Once you call `AsEnumerable()` or `ToList()` you leave the database behind. A very common performance bug is doing that too early. A provider also cannot translate every C# method, so a query that works in memory may fail against a database.

## Focused example / procedure

```csharp
// Database-bound fragment (assumes a WorkshopContext with a Customers DbSet)
// Good: filter and shape in SQL, then materialise only what is needed.
var page = await db.Customers
    .Where(c => !c.RemoveFromView && c.LastName.Contains(term))
    .OrderBy(c => c.LastName).ThenBy(c => c.Id)
    .Select(c => new CustomerSearchView { CustomerId = c.Id, FullName = c.FirstName + " " + c.LastName })
    .ToListAsync();

// Poor: downloads every row first.
var worse = db.Customers.AsEnumerable().Where(c => c.LastName.Contains(term)).ToList();
```

## Expected output or behaviour

The first version sends one SQL query with a `WHERE`; the second reads the whole table and filters in memory.

## Practice task

You see `could not be translated` from EF. What are two sensible fixes?

<details>
<summary>Answer / check</summary>

Rewrite the condition with operations the provider supports, or retrieve a database-filtered subset first and then use `AsEnumerable()` for the remaining in-memory step.

</details>

## Next lesson

- [25. First versus Single](../15-first-vs-single/)
