---
title: "44. Results Table Options"
description: "Pick a simple table, QuickGrid or a MudBlazor table, and page correctly."
sidebar:
  order: 7
---

**Estimated time:** 10 minutes

## Prerequisites

Lesson 43.

## Plain-language explanation

Start with a plain HTML table, which is easy to understand and test. QuickGrid (`Microsoft.AspNetCore.Components.QuickGrid`) adds sorting and paging with little code; MudBlazor's table or data grid adds richer features. They are alternatives: pick one per page. Be clear about what paging does. Paging a list that is already in memory only affects the display; true server-side paging uses `Skip`/`Take` in the database query with a stable `OrderBy` (Lesson 26).

## Focused example / procedure

```razor
@using Microsoft.AspNetCore.Components.QuickGrid

<QuickGrid Items="results.AsQueryable()" Pagination="pagination">
    <PropertyColumn Property="@(c => c.FullName)" Title="Name" Sortable="true" />
    <PropertyColumn Property="@(c => c.Phone)" Title="Phone" />
    <TemplateColumn Title="Actions" Context="customer">
        <a href="@($"customers/edit/{customer.CustomerId}")">Edit</a>
    </TemplateColumn>
</QuickGrid>
<Paginator State="pagination" />

@code {
    private List<CustomerSearchView> results = new();
    private PaginationState pagination = new() { ItemsPerPage = 10 };
}
```
Install the QuickGrid package for your .NET version first.

## Expected output or behaviour

Ten rows per page with sortable columns and a pager below the grid.

## Practice task

A new search returns 3 rows while you are on page 4. What goes wrong and how do you avoid it?

<details>
<summary>Answer / check</summary>

The grid shows an empty page. Reset to the first page when you replace the results: `await pagination.SetCurrentPageIndexAsync(0);`.

</details>

## Next lesson

- [45. Create/Edit Route Contract](../08-create-edit-route-contract/)
