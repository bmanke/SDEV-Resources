---
title: "50. List Selection and Stable Identifiers"
description: "Move items between a catalogue and a cart without duplicates or id collisions."
sidebar:
  order: 1
---

**Estimated time:** 9 minutes

## Prerequisites

Lessons 3 and 38.

## Plain-language explanation

In a list-to-list screen, a part appears either in the catalogue or in the cart. Derive the available list from the catalogue minus the cart instead of keeping two separately edited copies in sync. For new, unsaved rows use a temporary unique key (a `Guid`) and use it for `@key`. Avoid `Count + 1` for ids: after removing a middle row it repeats an existing id. `Max + 1` avoids that in one local list but is not a safe way to allocate persistent ids when several users save at once; let the database generate those.

## Focused example / procedure

```csharp
var catalogue = new List<(int Id, string Name)> { (1, "Chain"), (2, "Brake pads"), (3, "Tyre") };
var cart = new List<(Guid RowId, int PartId)>();

void Add(int partId)
{
    if (cart.Any(l => l.PartId == partId)) return;       // no duplicates
    cart.Add((Guid.NewGuid(), partId));
}

Add(1); Add(1); Add(3);
var available = catalogue.Where(p => !cart.Any(l => l.PartId == p.Id)).Select(p => p.Name);
Console.WriteLine(cart.Count);
Console.WriteLine(string.Join(", ", available));

var ids = new List<int> { 1, 2, 3 };
ids.Remove(2);
Console.WriteLine(ids.Contains(ids.Count + 1));
```

## Expected output or behaviour

```
2
Brake pads
True
```
The last line shows that `Count + 1` (3) already exists.

## Practice task

What should the Remove action receive: the part id or the row id?

<details>
<summary>Answer / check</summary>

The row id. A row id uniquely identifies one cart line, which is what you want to remove, even if the same part could appear twice in another design.

</details>

## Next lesson

- [51. Scoped CartState and Draft Copies](../02-scoped-cartstate-and-drafts/)
