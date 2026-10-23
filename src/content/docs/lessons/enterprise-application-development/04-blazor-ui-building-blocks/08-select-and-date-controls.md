---
title: "36. Select Inputs and Date Values"
description: "Use typed select/date binding and parse-safe value types (`int`, `DateOnly`, `DateTime`)."
sidebar:
  order: 8
---

**Estimated time:** 7 minutes

## Prerequisites

- Lesson 35.

## Plain-language explanation

Use typed select/date binding and parse-safe value types (`int`, `DateOnly`, `DateTime`).

## Focused example / procedure

```razor
<InputSelect @bind-Value="model.StatusId">
  @foreach (var s in statuses) { <option value="@s.Id">@s.Name</option> }
</InputSelect>
<InputDate @bind-Value="model.DueDate" />
```

## Expected output or behaviour

Selection and date input map to strongly typed properties.

## Practice task

Default a missing due date to 7 days from today.

<details>
<summary>Answer / check</summary>


Set in model init: `DueDate = DateOnly.FromDateTime(DateTime.Today.AddDays(7));`.


</details>


## Next lesson

- [37. Search vs Edit View Models](/lessons/enterprise-application-development/04-blazor-ui-building-blocks/09-search-vs-edit-viewmodels/)
