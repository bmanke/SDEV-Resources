---
title: "31. Binding, Click Events, and Conditional Rendering"
description: "`@bind` syncs value and state; event handlers update model; `@if` controls conditional UI."
sidebar:
  order: 3
---

**Estimated time:** 7 minutes

## Prerequisites

- Lesson 30.

## Plain-language explanation

`@bind` syncs value and state; event handlers update model; `@if` controls conditional UI. Standard events already trigger rerendering, so extra `StateHasChanged` is usually unnecessary.

## Focused example / procedure

```razor
<InputText @bind-Value="search" />
<button @onclick="RunSearch">Search</button>
@if (isLoading) { <p>Loading...</p> }
```

## Expected output or behaviour

Clicking Search updates state and UI rerenders automatically.

## Practice task

Add an empty-state message when no rows are returned.

<details>
<summary>Answer / check</summary>


Render `@if (!isLoading && rows.Count == 0) { <p>No matches.</p> }`.


</details>


## Next lesson

- [32. Partial Code-Behind and CSS Isolation](/lessons/enterprise-application-development/04-blazor-ui-building-blocks/04-code-behind-and-css-isolation/)
