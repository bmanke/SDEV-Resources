---
title: "30. Component Routing"
description: "`@page` maps URL routes to components."
sidebar:
  order: 2
---

**Estimated time:** 6 minutes

## Prerequisites

- Lesson 29.

## Plain-language explanation

`@page` maps URL routes to components. Route parameters should be typed and validated.

## Focused example / procedure

```razor
@page "/customers/{id:int}"
<h1>Customer @id</h1>

@code { [Parameter] public int id { get; set; } }
```

## Expected output or behaviour

Invalid non-numeric ids do not match this route.

## Practice task

Add an optional id route.

<details>
<summary>Answer / check</summary>


Use two directives: `@page "/customers"` and `@page "/customers/{id:int}"`.


</details>


## Next lesson

- [31. Binding, Click Events, and Conditional Rendering](/lessons/enterprise-application-development/04-blazor-ui-building-blocks/03-binding-events-conditional/)
