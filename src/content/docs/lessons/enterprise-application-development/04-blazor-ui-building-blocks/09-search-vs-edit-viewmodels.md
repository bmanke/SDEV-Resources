---
title: "37. Search versus Edit View Models"
description: "Design a different shape for each screen's job."
sidebar:
  order: 9
---

**Estimated time:** 9 minutes

## Prerequisites

Lesson 36.

## Plain-language explanation

A view model is a class shaped for one screen or operation. A search result needs only enough to identify and display a row, so `CustomerSearchView` holds an id, a display name, a phone number and a calculated total. An edit screen needs the editable fields, so `CustomerEditView` holds those, with validation attributes. A view model does not have to mirror every database column; leaving out fields the user must not change also prevents over-posting.

## Focused example / procedure

```csharp
// ViewModels/CustomerSearchView.cs
public class CustomerSearchView
{
    public int CustomerId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public decimal TotalSales { get; set; }
}
```

```csharp
// ViewModels/CustomerEditView.cs
using System.ComponentModel.DataAnnotations;

public class CustomerEditView
{
    public int CustomerId { get; set; }          // 0 means new

    [Required, StringLength(20)]
    public string FirstName { get; set; } = string.Empty;

    [Required, StringLength(50)]
    public string LastName { get; set; } = string.Empty;

    [Required, StringLength(30)]
    public string Phone { get; set; } = string.Empty;

    [Required, EmailAddress, StringLength(254)]
    public string Email { get; set; } = string.Empty;
}
```
The length limits are teaching choices; match them to your real schema.

## Expected output or behaviour

Two small classes: one for lists, one for forms.

## Practice task

Which view model should carry `TotalSales`, and why?

<details>
<summary>Answer / check</summary>

The search view: it is a calculated display value. It should not be on the edit model, where a user could post a value the server must compute itself.

</details>

## Next lesson

- [38. The Workshop Fixture](../../05-workshop-domain-and-rules/01-workshop-fixture/)
