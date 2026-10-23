---
title: "36. Select and Date Controls"
description: "Bind dropdowns and date pickers, including nullable values."
sidebar:
  order: 8
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 35.

## Plain-language explanation

`MudSelect<T>` binds the chosen item's value, and `MudSelectItem<T>` must use the same `T`. Use a nullable type (`int?`) for a dropdown that can be empty. `MudDatePicker` binds with `@bind-Date` to a `DateTime?`, because the user may not pick a date. Remember the nullable when you format or compare the result.

## Focused example / procedure

```razor
@page "/select-date"
@rendermode InteractiveServer

<MudSelect T="int?" Label="Province" @bind-Value="provinceId" Clearable="true">
    @foreach (var p in provinces)
    {
        <MudSelectItem T="int?" Value="@((int?)p.Id)">@p.Name</MudSelectItem>
    }
</MudSelect>
<MudDatePicker Label="Joined" @bind-Date="joined" />
<MudText>@(provinceId?.ToString() ?? "none") / @(joined?.ToString("yyyy-MM-dd") ?? "no date")</MudText>

@code {
    private int? provinceId;
    private DateTime? joined;
    private readonly List<(int Id, string Name)> provinces = new() { (1, "Alberta"), (2, "British Columbia") };
}
```

## Expected output or behaviour

Choosing Alberta and a date prints `1 / 2026-...`; clearing the select prints `none`.

## Practice task

Why is `provinceId` an `int?`?

<details>
<summary>Answer / check</summary>

Because "nothing selected" must be representable. A plain `int` would force a fake value such as 0.

</details>

## Next lesson

- [37. Search versus Edit View Models](../09-search-vs-edit-viewmodels/)
