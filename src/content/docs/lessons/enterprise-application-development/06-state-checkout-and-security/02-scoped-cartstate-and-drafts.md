---
title: "51. Scoped CartState and Draft Copies"
description: "Share a cart across pages and let the user cancel edits."
sidebar:
  order: 2
---

**Estimated time:** 10 minutes

## Prerequisites

Lesson 50.

## Plain-language explanation

A small state class registered as scoped holds the shared cart. On Interactive Server a scoped service normally lives as long as the user's circuit, so it is not durable storage: a refresh, a new tab or a server restart can start with an empty cart. Never use a static field or a singleton for a private cart; that would share it between users. Pages should edit a **copy** and write it back only on Continue; copying must be a deep copy of each mutable line, because assigning or `ToList()` copies only the list, not the objects inside.

## Focused example / procedure

```csharp
// CartState.cs
public class CartLine
{
    public int PartId { get; set; }
    public int Quantity { get; set; } = 1;
    public decimal UnitPrice { get; set; }
}

public class CartState
{
    public List<CartLine> Lines { get; set; } = new();
}

// Program.cs
// builder.Services.AddScoped<CartState>();
```

```csharp
static List<CartLine> Copy(IEnumerable<CartLine> source) =>
    source.Select(l => new CartLine { PartId = l.PartId, Quantity = l.Quantity, UnitPrice = l.UnitPrice }).ToList();

var state = new CartState { Lines = { new CartLine { PartId = 1, Quantity = 1, UnitPrice = 32m } } };

var deep = Copy(state.Lines);
deep[0].Quantity = 5;
Console.WriteLine(state.Lines[0].Quantity);

var shallow = state.Lines.ToList();
shallow[0].Quantity = 7;
Console.WriteLine(state.Lines[0].Quantity);
```

## Expected output or behaviour

```
1
7
```
The deep copy left the real cart alone; the shallow copy changed it.

## Practice task

On Cancel, what do you do with the draft?

<details>
<summary>Answer / check</summary>

Discard it and navigate away without assigning it to `CartState`. Only Continue copies the draft back.

</details>

## Next lesson

- [52. The Three-Page Checkout Flow](../03-three-page-checkout-flow/)
