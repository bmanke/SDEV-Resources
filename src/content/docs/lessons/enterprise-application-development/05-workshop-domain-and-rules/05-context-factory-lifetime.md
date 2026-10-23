---
title: "42. Context Factory and Per-Operation Lifetime"
description: "Create a short-lived DbContext for each operation."
sidebar:
  order: 5
---

**Estimated time:** 9 minutes

## Prerequisites

Lesson 41.

## Plain-language explanation

A `DbContext` is not thread-safe and is meant to be short-lived. In Blazor Server, a normal scoped service lives as long as the user's circuit, which can last the whole session, and two quick clicks can use the same context at once. The safe pattern is to inject `IDbContextFactory<TContext>`, create a context for one operation and dispose it right after. Do not run two operations in parallel on the same context.

## Focused example / procedure

```csharp
using Microsoft.EntityFrameworkCore;

public class CustomerService
{
    private readonly IDbContextFactory<WorkshopContext> _factory;
    public CustomerService(IDbContextFactory<WorkshopContext> factory) => _factory = factory;

    public async Task<List<CustomerSearchView>> SearchAsync(string lastName, CancellationToken ct = default)
    {
        await using var db = await _factory.CreateDbContextAsync(ct);
        return await db.Customers
            .AsNoTracking()
            .Where(c => !c.RemoveFromViewFlag && c.LastName.Contains(lastName))
            .OrderBy(c => c.LastName).ThenBy(c => c.CustomerID)
            .Select(c => new CustomerSearchView
            {
                CustomerId = c.CustomerID,
                FullName = c.FirstName + " " + c.LastName,
                Phone = c.Phone
            })
            .ToListAsync(ct);
    }
}
```

## Expected output or behaviour

Each call opens, uses and disposes its own context, so concurrent clicks cannot corrupt each other's work.

## Practice task

Why `AsNoTracking()` here?

<details>
<summary>Answer / check</summary>

The query is read-only. Tracking would store each entity for change detection that you never use.

</details>

## Next lesson

- [43. Customer Search States](../06-customer-search-states/)
