---
title: "34. MudBlazor Installation"
description: "Add a component library and verify it with one button."
sidebar:
  order: 6
---

**Estimated time:** 12 minutes

## Prerequisites

Lesson 33 and a working WorkshopWeb project.

## Plain-language explanation

MudBlazor is a free Material Design component library. It needs a NuGet package, a service registration, a stylesheet and script, and a set of provider components in the layout. Follow the installation guide for the exact MudBlazor and .NET versions you use, because details such as asset paths change between releases. Missing the script reference or providers is the usual reason styled components look right but do nothing.

## Focused example / procedure

Setup lab — about 12 minutes.

1. Install the package compatible with your .NET version: `dotnet add WorkshopWeb package MudBlazor`.
2. In `Program.cs` add `using MudBlazor.Services;` and `builder.Services.AddMudServices();` before `builder.Build()`.
3. In `Components/_Imports.razor` add `@using MudBlazor`. (If you also use QuickGrid and see name clashes, qualify names or import MudBlazor per page instead.)
4. In `App.razor`, add the Roboto font and `_content/MudBlazor/MudBlazor.min.css` to `<head>`, and `_content/MudBlazor/MudBlazor.min.js` after the Blazor script. Use the exact tags shown in the installation guide for your version.
5. In `MainLayout.razor` add `<MudThemeProvider />`, `<MudPopoverProvider />`, `<MudDialogProvider />` and `<MudSnackbarProvider />`.
6. Interactive MudBlazor components need an interactive render mode; the simplest course setup is global Server interactivity.
7. Remove Bootstrap links if you are not using them, to avoid conflicting styles.
8. Test on a page:

```razor
<MudButton Variant="Variant.Filled" Color="Color.Primary">Hello MudBlazor</MudButton>
```

## Expected output or behaviour

A filled primary-colour button in the Roboto font, with no console errors.

## Practice task

The button is styled but a dialog never opens. What do you check?

<details>
<summary>Answer / check</summary>

That the JavaScript file is referenced after the Blazor script, that `MudDialogProvider` is in the layout, and that the page is interactive.

</details>

## Next lesson

- [35. Typed Input Controls](../07-typed-input-controls/)
