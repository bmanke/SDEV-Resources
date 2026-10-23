---
title: "35. Typed Input Controls"
description: "Bind text and numbers with MudBlazor's generic fields."
sidebar:
  order: 7
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 34.

## Plain-language explanation

MudBlazor inputs are generic: `MudTextField<string>` and `MudNumericField<int>` bind to a field of exactly that type, and a mismatch is a compile error rather than a runtime surprise. `Immediate="true"` updates the field on every keystroke. `Required` shows a visual hint but it is not a security check; your service must still validate.

## Focused example / procedure

```razor
@page "/typed"
@rendermode InteractiveServer

<MudTextField T="string" Label="Last name" @bind-Value="lastName" Immediate="true" />
<MudNumericField T="int" Label="Quantity" @bind-Value="quantity" Min="1" />
<MudText>@lastName x @quantity</MudText>

@code {
    private string lastName = string.Empty;
    private int quantity = 1;
}
```

## Expected output or behaviour

Typing in the first box updates the text line immediately; the number box rejects values below 1 using the spin buttons.

## Practice task

Which field type would you use for an optional quantity that can be blank?

<details>
<summary>Answer / check</summary>

`int?`: `MudNumericField<int?>` with a nullable field, so "blank" is `null` rather than 0.

</details>

## Next lesson

- [36. Select and Date Controls](../08-select-and-date-controls/)
