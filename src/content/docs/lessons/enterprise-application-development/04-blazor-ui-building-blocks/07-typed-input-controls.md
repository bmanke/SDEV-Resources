---
title: "35. Typed Text and Numeric Controls"
description: "Use typed controls (`InputNumber<T>`, validated models) so parsing and validation happen consistently."
sidebar:
  order: 7
---

**Estimated time:** 7 minutes

## Prerequisites

- Lessons 31 and 34.

## Plain-language explanation

Use typed controls (`InputNumber<T>`, validated models) so parsing and validation happen consistently.

## Focused example / procedure

```razor
<InputText @bind-Value="model.Name" />
<InputNumber @bind-Value="model.CreditLimit" />
<ValidationMessage For="@(() => model.CreditLimit)" />
```

## Expected output or behaviour

Invalid numeric input shows validation feedback instead of silent conversion bugs.

## Practice task

Require credit limit to be >= 0.

<details>
<summary>Answer / check</summary>


Add `[Range(0, double.MaxValue)]` on the model property.


</details>


## Next lesson

- [36. Select Inputs and Date Values](/lessons/enterprise-application-development/04-blazor-ui-building-blocks/08-select-and-date-controls/)
