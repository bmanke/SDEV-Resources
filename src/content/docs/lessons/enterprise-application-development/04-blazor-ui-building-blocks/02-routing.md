---
title: "30. Routing"
description: "Map a URL to a component, including a typed route parameter."
sidebar:
  order: 2
---

**Estimated time:** 7 minutes

## Prerequisites

Lesson 29.

## Plain-language explanation

The `@page` directive gives a component a URL. A segment in braces, such as `{CustomerId:int}`, is a route parameter, and `:int` is a constraint: the URL only matches when the segment is a whole number. The component receives the value through a property marked `[Parameter]`. Use `NavLink` for menu links because it highlights the current page.

## Focused example / procedure

```razor
@page "/customers/{CustomerId:int}"

<h1>Customer @CustomerId</h1>
<NavLink href="customers/7">Go to customer 7</NavLink>

@code {
    [Parameter] public int CustomerId { get; set; }
}
```

## Expected output or behaviour

`/customers/5` shows `Customer 5`. `/customers/abc` does not match, so the router shows its not-found content.

## Practice task

Add an optional route so `/customers` (no id) also loads the component.

<details>
<summary>Answer / check</summary>

Add a second directive, `@page "/customers"`. Because `CustomerId` is an `int`, it defaults to `0` when the URL has no id; make it `int?` if you want to test for `null` instead.

</details>

## Next lesson

- [31. Binding, Events and Conditional Rendering](../03-binding-events-conditional/)
