---
title: "33. Component Lifecycle and Async Loading"
description: "Use lifecycle hooks intentionally (`OnInitializedAsync`, `OnParametersSetAsync`) and avoid duplicate loading."
sidebar:
  order: 5
---

**Estimated time:** 7 minutes

## Prerequisites

- Lesson 31 plus async basics.

## Plain-language explanation

Use lifecycle hooks intentionally (`OnInitializedAsync`, `OnParametersSetAsync`) and avoid duplicate loading.

## Focused example / procedure

```csharp
protected override async Task OnParametersSetAsync()
{
    if (CustomerId > 0)
    {
        model = await service.GetCustomerAsync(CustomerId);
    }
}
```

## Expected output or behaviour

Data refreshes when route parameters change, not on every random rerender.

## Practice task

When should you unsubscribe from events?

<details>
<summary>Answer / check</summary>


In `Dispose()` for long-lived subscriptions to avoid memory leaks.


</details>


## Next lesson

- [34. MudBlazor Installation Lab (Interactive Server)](/lessons/enterprise-application-development/04-blazor-ui-building-blocks/06-mudblazor-installation/)
