---
title: "53. AppState and Change Notifications"
description: "Pass a typed object between pages and notify components of changes."
sidebar:
  order: 4
---

**Estimated time:** 10 minutes

## Prerequisites

Lesson 51.

## Plain-language explanation

AppState is a service that holds shared state so unrelated components need not know about each other. A page stores a typed object, such as an `EmployeeView`, and navigates; the destination reads it and must handle `null`, because the user can browse straight to that URL. To make other components refresh, expose an event and raise it after changes. A component that subscribes **must unsubscribe in `Dispose`**, or it stays alive after the user leaves. Events run on arbitrary threads, so refresh with `InvokeAsync(StateHasChanged)`. Notification is not persistence: refresh the page and an in-memory AppState is gone.

## Focused example / procedure

```csharp
public record EmployeeView(string FirstName, string LastName, int Age);

public class AppState
{
    private EmployeeView? _employee;
    public event Action? OnChange;

    public EmployeeView? Employee
    {
        get => _employee;
        set { _employee = value; OnChange?.Invoke(); }
    }
}
// builder.Services.AddScoped<AppState>();
```

```razor
@* ToPage.razor *@
@page "/to"
@implements IDisposable
@inject AppState State

@if (State.Employee is null)
{
    <p>No employee selected.</p>
}
else
{
    <p>@State.Employee.FirstName @State.Employee.LastName (@State.Employee.Age)</p>
}

@code {
    protected override void OnInitialized() => State.OnChange += Refresh;
    private void Refresh() => InvokeAsync(StateHasChanged);
    public void Dispose() => State.OnChange -= Refresh;
}
```

## Expected output or behaviour

`FromPage` sets `State.Employee` and navigates to `/to`, which shows the name; opening `/to` directly shows the fallback text.

## Practice task

What is the leak if you forget `-=`?

<details>
<summary>Answer / check</summary>

The state object keeps a reference to the old component through the event, so it is never released and may still try to update a page that is gone.

</details>

## Next lesson

- [54. Authentication and Identity Setup](../05-authentication-and-identity-setup/)
