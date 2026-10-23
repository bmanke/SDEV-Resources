---
title: "51. Scoped CartState and Deep-Copy Cancel"
description: "Scoped state in Interactive Server is typically per circuit, not durable per-user storage."
sidebar:
  order: 2
---

**Estimated time:** 8 minutes

## Prerequisites

- Lesson 50.

## Plain-language explanation

Scoped state in Interactive Server is typically per circuit, not durable per-user storage. For cancel flows, deep-copy mutable child objects.

## Focused example / procedure

```csharp
var draft = original with { Lines = original.Lines.Select(l => l with { }).ToList() };
```

## Expected output or behaviour

Cancel restores previous values instead of partially mutated shared references.

## Practice task

Why avoid singleton/static carts for private user state?

<details>
<summary>Answer / check</summary>


They leak data across users/sessions and create security bugs.


</details>


## Next lesson

- [52. Three-Page Checkout Flow](/lessons/enterprise-application-development/06-state-checkout-and-security/03-three-page-checkout-flow/)
