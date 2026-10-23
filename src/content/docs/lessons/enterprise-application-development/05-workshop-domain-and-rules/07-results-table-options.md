---
title: "44. Results Tables: Simple, QuickGrid, MudTable"
description: "Start with a simple table, then add QuickGrid paging for built-in light tables or MudTable for richer interactions."
sidebar:
  order: 7
---

**Estimated time:** 8 minutes

## Prerequisites

- Lesson 43.

## Plain-language explanation

Start with a simple table, then add QuickGrid paging for built-in light tables or MudTable for richer interactions.

## Focused example / procedure

```razor
<QuickGrid Items="rows.AsQueryable()" Pagination="pagination">
  <PropertyColumn Property="x => x.Name" Title="Customer" />
</QuickGrid>
```

## Expected output or behaviour

Rows render with pageable UI using deterministic ordering from query/service layer.

## Practice task

Name one case where MudTable is preferable.

<details>
<summary>Answer / check</summary>


When you need richer built-in features such as templated row actions and integrated styling.


</details>


## Next lesson

- [45. Create/Edit Route ID Contracts](/lessons/enterprise-application-development/05-workshop-domain-and-rules/08-create-edit-route-contract/)
