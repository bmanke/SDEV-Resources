---
title: "29. Razor vs Blazor and Modern Hosting Terms"
description: "Razor Pages (`."
sidebar:
  order: 1
---

**Estimated time:** 6 minutes

## Prerequisites

- Basic ASP.NET awareness.

## Plain-language explanation

Razor Pages (`.cshtml`) and Blazor components (`.razor`) are different. Use modern Blazor Web App guidance with Interactive Server; avoid legacy `_Host.cshtml` instructions in new setups.

## Focused example / procedure

```text
Razor Page:  Pages/Index.cshtml
Blazor Component: Components/Pages/Customers.razor
```

## Expected output or behaviour

You can correctly classify files and follow compatible .NET 8/9 setup docs.

## Practice task

Is a `.razor` component the same thing as a `.cshtml` Razor Page?

<details>
<summary>Answer / check</summary>


No. They use related syntax but different runtime/component models.


</details>


## Next lesson

- [30. Component Routing](/lessons/enterprise-application-development/04-blazor-ui-building-blocks/02-routing/)
