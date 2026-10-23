---
title: "52. The Three-Page Checkout Flow"
description: "Move through landing, edit and checkout while keeping the server in charge."
sidebar:
  order: 3
---

**Estimated time:** 10 minutes

## Prerequisites

Lesson 51.

## Plain-language explanation

The workflow has three pages. **CartLanding** loads available parts and lets the user add or remove items from a local draft. **CartEdit** lets them set quantities and blocks Continue until every quantity is valid. **CartCheckout** shows a read-only summary from the shared state. The pages cooperate through the scoped `CartState`, but checkout must still revalidate prices, quantities and stock on the server when the order is placed; what the browser displayed is only a preview.

## Focused example / procedure

```csharp
// Validation used by CartEdit (also run again on the server)
static string? ValidateQuantity(int quantity) =>
    quantity >= 1 ? null : "Quantity must be at least 1.";

Console.WriteLine(ValidateQuantity(0) ?? "ok");
Console.WriteLine(ValidateQuantity(3) ?? "ok");
```

```razor
@* CartLanding.razor (fragment) *@
@inject CartState State
@inject NavigationManager Navigation

<button type="button" @onclick="Continue">Continue</button>

@code {
    private List<CartLine> draft = new();
    protected override void OnInitialized() => draft = Copy(State.Lines);

    private void Continue()
    {
        State.Lines = Copy(draft);                      // commit the draft
        Navigation.NavigateTo("cart/edit");
    }
}
```

## Expected output or behaviour

```
Quantity must be at least 1.
ok
```

## Practice task

Why compute the order total again at checkout?

<details>
<summary>Answer / check</summary>

Because prices or stock may have changed, and the client could have been tampered with. The server's calculation is the one that counts.

</details>

## Next lesson

- [53. AppState and Change Notifications](../04-appstate-notifications/)
