---
title: "41. EF Core Entities, Context and Dependency Injection"
description: "Describe tables as classes and register the data context."
sidebar:
  order: 4
---

**Estimated time:** 12 minutes

## Prerequisites

Lessons 6 and 39. SQL Server practice database from module 2.

## Plain-language explanation

Entity Framework Core maps classes (entities) to tables through a `DbContext`. Dependency injection (DI) is the system that creates objects for you and hands them to classes that ask for them in their constructors. For a Blazor Server app the service lifetime matters; Lesson 42 explains why we register a context **factory**. Pick one workflow: scaffold from the existing teaching database (reverse engineer), or write entities first and use migrations. Never run migrations against a database you did not create. Match EF Core package versions to your .NET version.

## Focused example / procedure

Assumptions (database fragment): table `Customers` with columns `CustomerID`, `FirstName`, `LastName`, `Phone`, `Email`, `RemoveFromViewFlag`.

```shell
dotnet add WorkshopSystem package Microsoft.EntityFrameworkCore.SqlServer
dotnet add WorkshopWeb package Microsoft.EntityFrameworkCore.Design
```

```csharp
// WorkshopSystem/DAL/WorkshopContext.cs
using Microsoft.EntityFrameworkCore;

public class WorkshopContext : DbContext
{
    public WorkshopContext(DbContextOptions<WorkshopContext> options) : base(options) { }
    public DbSet<CustomerEntity> Customers => Set<CustomerEntity>();
}

// WorkshopSystem/Entities/CustomerEntity.cs
public class CustomerEntity
{
    public int CustomerID { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool RemoveFromViewFlag { get; set; }
}
```

```csharp
// WorkshopSystem/BackendServiceCollectionExtensions.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

public static class BackendServiceCollectionExtensions
{
    public static IServiceCollection AddWorkshopServices(
        this IServiceCollection services, Action<DbContextOptionsBuilder> options)
    {
        services.AddDbContextFactory<WorkshopContext>(options);
        services.AddTransient<CustomerService>();
        return services;
    }
}
```

```csharp
// WorkshopWeb/Program.cs
var cs = builder.Configuration.GetConnectionString("Workshop")
    ?? throw new InvalidOperationException("Missing connection string 'Workshop'.");
builder.Services.AddWorkshopServices(o => o.UseSqlServer(cs));
```
Store the connection string with User Secrets (Lesson 55), not in source control.

## Expected output or behaviour

`dotnet build` succeeds, and starting the app resolves `CustomerService` from DI without error.

## Practice task

Why do the web project and the library both need EF packages?

<details>
<summary>Answer / check</summary>

The library uses EF types to build the context; the web project needs the Design package for tooling such as migrations, and the SQL Server provider is chosen at registration time.

</details>

## Next lesson

- [42. Context Factory and Per-Operation Lifetime](../05-context-factory-lifetime/)
