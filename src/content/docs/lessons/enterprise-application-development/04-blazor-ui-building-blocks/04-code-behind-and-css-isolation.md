---
title: "32. Code-Behind and CSS Isolation"
description: "Move C# into a partial class and scope styles to one component."
sidebar:
  order: 4
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 31.

## Plain-language explanation

A component's C# can live in a code-behind file named `Basics.razor.cs`. The class must be `partial`, have the same name as the component, and use the same namespace the compiler generates (project name plus folder path). A file named `Basics.razor.css` beside the component is automatically scoped: its rules apply only to that component. The matching filename is what links them; `@page` has nothing to do with it.

## Focused example / procedure

```razor
@* Components/Pages/Basics.razor *@
@page "/basics"
@rendermode InteractiveServer

<h3>Clicks: @clicks</h3>
<button class="big" @onclick="Click">Click me</button>
```

```csharp
// Components/Pages/Basics.razor.cs
namespace WorkshopWeb.Components.Pages;

public partial class Basics
{
    private int clicks;
    private void Click() => clicks++;
}
```

```css
/* Components/Pages/Basics.razor.css */
.big { font-size: 1.25rem; padding: 0.5rem 1rem; }
```

## Expected output or behaviour

The counter increments on each click and only this page's button gets the larger style.

## Practice task

You get "The type Basics already contains a definition". What is missing?

<details>
<summary>Answer / check</summary>

The `partial` keyword on the code-behind class (or the namespace does not match the component's).

</details>

## Next lesson

- [33. Component Lifecycle](../05-component-lifecycle/)
