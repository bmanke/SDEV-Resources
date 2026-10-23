---
title: "29. Razor versus Blazor"
description: "Separate the Razor syntax from the Blazor framework and from Razor Pages."
sidebar:
  order: 1
---

**Estimated time:** 6 minutes

## Prerequisites

Lesson 6 (the WorkshopWeb project).

## Plain-language explanation

Razor is a markup syntax that mixes HTML with C# using the `@` symbol. Blazor is the framework that uses Razor to build interactive user-interface **components** in `.razor` files. Razor Pages (`.cshtml`) is a different, older page model; a `.razor` file is not a Razor Page. Without `@` you are writing HTML; with `@` you are in C#. In a modern Blazor Web App the entry files are `Components/App.razor` and `Components/Routes.razor`, not the old `_Host.cshtml`.

## Focused example / procedure

```razor
@* Components/Pages/Hello.razor *@
@page "/hello"

<PageTitle>Hello</PageTitle>
<h1>Hello, @name</h1>
<p>The year is @DateTime.Now.Year.</p>

@code {
    private string name = "Workshop";
}
```

## Expected output or behaviour

Browse to `/hello`: the heading reads `Hello, Workshop` and the paragraph shows the current year.

## Practice task

Change `name` to your own name and refresh. Which part of the file is C#?

<details>
<summary>Answer / check</summary>

Only `@name`, `@DateTime.Now.Year` and the `@code { }` block are C#; the rest is HTML.

</details>

## Next lesson

- [30. Routing](../02-routing/)
