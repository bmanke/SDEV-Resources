---
title: "31. Binding, Events and Conditional Rendering"
description: "Connect inputs to fields, react to clicks and show content conditionally."
sidebar:
  order: 3
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 30.

## Plain-language explanation

`@bind` keeps a field and an input in sync in both directions. By default a text box updates when it loses focus; add `@bind:event="oninput"` to update on every key press. `@onclick` runs a method. `@if` shows markup only when a condition holds. In a Blazor Web App a page is statically rendered unless it uses an interactive render mode, so add `@rendermode InteractiveServer` to a page whose buttons must respond (or enable interactivity globally).

## Focused example / procedure

```razor
@page "/greet"
@rendermode InteractiveServer

<input @bind="name" @bind:event="oninput" placeholder="Your name" />
<button type="button" @onclick="Save">Save</button>

@if (saved)
{
    <p role="status">Saved @name.</p>
}

@code {
    private string name = string.Empty;
    private bool saved;

    private void Save() => saved = !string.IsNullOrWhiteSpace(name);
}
```

## Expected output or behaviour

Type a name and click **Save**: the status line appears. Saving with an empty box leaves it hidden. No `StateHasChanged()` call is needed after a normal event handler.

## Practice task

The button does nothing. Name two likely causes.

<details>
<summary>Answer / check</summary>

The page is not interactive (missing `@rendermode`, or interactivity was not enabled for the project), or the handler name does not match the method.

</details>

## Next lesson

- [32. Code-Behind and CSS Isolation](../04-code-behind-and-css-isolation/)
