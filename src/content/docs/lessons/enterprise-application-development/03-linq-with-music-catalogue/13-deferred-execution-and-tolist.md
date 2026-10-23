---
title: "23. Deferred Execution and ToList"
description: "Understand when a query actually runs."
sidebar:
  order: 13
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 12.

## Plain-language explanation

A LINQ query like `Where` does not run when you write it; it runs when you enumerate it (with `foreach`, `Count()`, `ToList()` and so on). That means the query sees the data as it is at that moment. `ToList()` runs the query once and stores a snapshot. Call it after filtering and projecting, never before, or you may pull far more data than you need.

## Focused example / procedure

```csharp
var nums = new List<int> { 1, 2, 3 };
var query = nums.Where(n => n > 1);   // not executed yet

nums.Add(4);
Console.WriteLine(query.Count());     // runs now

var snapshot = query.ToList();        // runs again and stores the result
nums.Add(5);
Console.WriteLine(snapshot.Count);    // unchanged
Console.WriteLine(query.Count());     // sees the new data
```

## Expected output or behaviour

```
3
3
4
```

## Practice task

Why is `db.Customers.ToList().Where(c => c.LastName == "Lee")` a poor idea with a database?

<details>
<summary>Answer / check</summary>

`ToList()` downloads every customer first, and the filter then runs in memory. Put `Where` before `ToList()` so the database does the filtering.

</details>

## Next lesson

- [24. IEnumerable versus IQueryable](../14-ienumerable-vs-iqueryable/)
