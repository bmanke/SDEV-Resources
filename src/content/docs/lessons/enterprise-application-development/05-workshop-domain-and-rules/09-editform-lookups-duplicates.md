---
title: "46. EditForm, Lookups and Duplicate Rules"
description: "Validate the form, load dropdown choices and prevent duplicates safely."
sidebar:
  order: 9
---

**Estimated time:** 11 minutes

## Prerequisites

Lessons 37 and 45.

## Plain-language explanation

`EditForm` with `DataAnnotationsValidator` runs the attributes on your view model and shows messages. Lookups (provinces, statuses) come from a service and fill dropdowns; the server must still verify that a posted id is a valid choice. A duplicate check (same first name, last name and phone) must exclude the record being edited, or editing a customer without changes would conflict with itself. A query check gives friendly feedback but is not enough: two simultaneous saves can both pass it. If uniqueness is a true rule, also create a unique index and handle the failure.

## Focused example / procedure

```razor
<EditForm Model="model" OnValidSubmit="SaveAsync" FormName="customer-edit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <label>First name <InputText @bind-Value="model.FirstName" /></label>
    <ValidationMessage For="() => model.FirstName" />
    <label>Last name <InputText @bind-Value="model.LastName" /></label>
    <label>Phone <InputText @bind-Value="model.Phone" /></label>
    <label>Email <InputText @bind-Value="model.Email" /></label>
    <button type="submit" disabled="@saving">Save</button>
</EditForm>
```

```csharp
// Service-side duplicate check (database fragment)
bool duplicate = await db.Customers.AnyAsync(c =>
    c.CustomerID != request.CustomerId &&
    c.FirstName == request.FirstName &&
    c.LastName == request.LastName &&
    c.Phone == request.Phone, ct);

// Schema backstop (EF Core model configuration)
// modelBuilder.Entity<CustomerEntity>().HasIndex(c => new { c.FirstName, c.LastName, c.Phone }).IsUnique();
```

## Expected output or behaviour

Invalid fields show messages and block the save; a real duplicate returns "A customer with this name and phone already exists."

## Practice task

Why does the check use `c.CustomerID != request.CustomerId`?

<details>
<summary>Answer / check</summary>

So an edit to an existing customer does not count that same row as a duplicate of itself. For a new customer (id 0) every existing row is compared.

</details>

## Next lesson

- [47. Soft Delete and Child Ownership](../10-soft-delete-and-ownership/)
