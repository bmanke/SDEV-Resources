---
title: "33. Component Lifecycle"
description: "Run start-up work at the right moment and show a loading state."
sidebar:
  order: 5
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 32.

## Plain-language explanation

A component has lifecycle methods. `OnInitialized`/`OnInitializedAsync` run once when the component is created, `OnParametersSet`/`OnParametersSetAsync` run when parameters change (use it when a route id can change without recreating the component), and `OnAfterRender` is for work that needs the rendered page, such as JavaScript. These are not constructors. With prerendering, initialisation can run once on the server for the first HTML and again when the interactive circuit starts, so do not put one-off side effects there without guarding them.

## Focused example / procedure

```razor
@page "/loading-demo"
@rendermode InteractiveServer

@if (loading)
{
    <p>Loading...</p>
}
else
{
    <p>Loaded @items.Count items.</p>
}

@code {
    private bool loading = true;
    private List<string> items = new();

    protected override async Task OnInitializedAsync()
    {
        await Task.Delay(500);          // stand-in for a service call
        items = new() { "Chain", "Tyre" };
        loading = false;
    }
}
```

## Expected output or behaviour

`Loading...` shows briefly, then `Loaded 2 items.`

## Practice task

Where should you reload data when only the `{CustomerId:int}` parameter changes?

<details>
<summary>Answer / check</summary>

`OnParametersSetAsync`. `OnInitializedAsync` does not run again if Blazor reuses the same component instance for the new URL.

</details>

## Next lesson

- [34. MudBlazor Installation](../06-mudblazor-installation/)
