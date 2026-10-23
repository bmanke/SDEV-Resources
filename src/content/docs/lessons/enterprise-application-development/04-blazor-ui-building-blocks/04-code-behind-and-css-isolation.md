---
title: "32. Partial Code-Behind and CSS Isolation"
description: "Use `."
sidebar:
  order: 4
---

**Estimated time:** 7 minutes

## Prerequisites

- Lesson 31.

## Plain-language explanation

Use `.razor` for markup and `.razor.cs` partial classes for logic. Match file names for CSS isolation (`Component.razor.css`).

## Focused example / procedure

```text
CustomerSearch.razor
CustomerSearch.razor.cs
CustomerSearch.razor.css
```

## Expected output or behaviour

Logic, markup, and styles stay organized without leaking CSS globally.

## Practice task

What happens if CSS file name does not match component name?

<details>
<summary>Answer / check</summary>


Isolation will not apply to that component because generated scope mapping will differ.


</details>


## Next lesson

- [33. Component Lifecycle and Async Loading](/lessons/enterprise-application-development/04-blazor-ui-building-blocks/05-component-lifecycle/)
