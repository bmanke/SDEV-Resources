---
title: "52. Three-Page Checkout Flow"
description: "Split checkout into staged pages (cart, review, confirm) and pass state intentionally between them."
sidebar:
  order: 3
---

**Estimated time:** 7 minutes

## Prerequisites

- Lesson 51.

## Plain-language explanation

Split checkout into staged pages (cart, review, confirm) and pass state intentionally between them.

## Focused example / procedure

```text
/cart -> /checkout/review -> /checkout/confirm
```

## Expected output or behaviour

Users can review before final commit and restart safely when validation fails.

## Practice task

What should happen after successful confirm?

<details>
<summary>Answer / check</summary>


Persist order/invoice, clear scoped draft cart state, and navigate to receipt page.


</details>


## Next lesson

- [53. AppState, EmployeeView, and Event Unsubscription](/lessons/enterprise-application-development/06-state-checkout-and-security/04-appstate-notifications/)
