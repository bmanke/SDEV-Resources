---
title: "45. Create/Edit Route Contract"
description: "Use one page for both new and existing records with a clear id rule."
sidebar:
  order: 8
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 30.

## Plain-language explanation

A single edit page can handle both cases: id `0` means "new", and a positive id means "edit this existing record". The key rule is that a positive id that does not exist must show a not-found message. It must never quietly turn into a new record, or a mistyped URL creates data. Load in `OnParametersSetAsync` so the page reloads when navigating between ids.

## Focused example / procedure

```razor
@page "/customers/edit/{CustomerId:int}"
@inject CustomerService Service

<h3>@(CustomerId == 0 ? "New customer" : $"Edit customer {CustomerId}")</h3>

@if (notFound)
{
    <p role="alert">Customer @CustomerId was not found.</p>
}

@code {
    [Parameter] public int CustomerId { get; set; }
    private CustomerEditView? model;
    private bool notFound;

    protected override async Task OnParametersSetAsync()
    {
        notFound = false;
        if (CustomerId == 0) { model = new CustomerEditView(); return; }

        model = await Service.GetAsync(CustomerId);   // returns null when missing or hidden
        notFound = model is null;
    }
}
```

## Expected output or behaviour

`/customers/edit/0` shows an empty form; `/customers/edit/9999` shows the not-found message and no form.

## Practice task

What should happen for a negative id?

<details>
<summary>Answer / check</summary>

Treat it as not found (or a bad request), the same as any non-existent id.

</details>

## Next lesson

- [46. EditForm, Lookups and Duplicate Rules](../09-editform-lookups-duplicates/)
