---
title: "41. EF Entities, DbContext, and DI Registration"
description: "Register `DbContext` and related services with dependency injection; keep entity configuration explicit."
sidebar:
  order: 4
---

**Estimated time:** 8 minutes

## Prerequisites

- Basic EF Core package setup.

## Plain-language explanation

Register `DbContext` and related services with dependency injection; keep entity configuration explicit.

## Focused example / procedure

```csharp
builder.Services.AddDbContextFactory<WorkshopDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Workshop")));

builder.Services.AddScoped<CustomerSearchService>();
```

## Expected output or behaviour

Services resolve through DI and can create per-operation contexts safely.

## Practice task

Why prefer factory for Interactive Server operations?

<details>
<summary>Answer / check</summary>


`DbContext` is not thread-safe; a factory creates short-lived contexts per operation/event.


</details>


## Next lesson

- [42. DbContext Factory and Per-Operation Lifetime](/lessons/enterprise-application-development/05-workshop-domain-and-rules/05-context-factory-lifetime/)
