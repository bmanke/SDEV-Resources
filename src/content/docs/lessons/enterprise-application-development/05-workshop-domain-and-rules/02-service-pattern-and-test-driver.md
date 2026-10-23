---
title: "39. Service Pattern and Test Driver"
description: "Write a service method and a driver that tries valid and invalid input."
sidebar:
  order: 2
---

**Estimated time:** 10 minutes

## Prerequisites

Lesson 38 and Lessons 12–13.

## Plain-language explanation

Prototype the logic as a driver (the entry point that calls your method), the method itself (a service), and a result type. A small `Result<T>` carries either a value or a list of error messages, so expected problems (bad input) do not have to be exceptions. Run many cases in one pass: the driver prints what happened and keeps going. A search with no matches is a **successful** call with an empty list, not an error. (The course also uses a package called BYSResults; check its documentation for its API. This lesson uses a tiny equivalent type.)

## Focused example / procedure

```csharp
// Result.cs
public record Result<T>(T? Value, List<string> Errors)
{
    public bool IsSuccess => Errors.Count == 0;
}

// CustomerService.cs
public class CustomerService
{
    public Result<List<Customer>> Search(string? lastName, string? phone)
    {
        var errors = new List<string>();
        if (string.IsNullOrWhiteSpace(lastName) && string.IsNullOrWhiteSpace(phone))
            errors.Add("Enter a last name or phone number.");
        if (errors.Count > 0)
            return new Result<List<Customer>>(null, errors);

        var query = Workshop.Customers.Where(c => !c.RemoveFromView);
        if (!string.IsNullOrWhiteSpace(lastName))
            query = query.Where(c => c.LastName.Contains(lastName.Trim(), StringComparison.OrdinalIgnoreCase));
        if (!string.IsNullOrWhiteSpace(phone))
            query = query.Where(c => c.Phone.Contains(phone.Trim()));

        var list = query.OrderBy(c => c.LastName).ThenBy(c => c.Id).ToList();
        return new Result<List<Customer>>(list, errors);
    }
}
```

```csharp
// Program.cs  (the driver)
var service = new CustomerService();
foreach (var (last, phone) in new[] { ("", ""), ("lee", ""), ("zzz", "") })
{
    var r = service.Search(last, phone);
    Console.WriteLine(r.IsSuccess
        ? $"'{last}': {r.Value!.Count} match(es)"
        : $"'{last}': {string.Join("; ", r.Errors)}");
}
```
The two filters combine with AND when both are supplied.

## Expected output or behaviour

```
'': Enter a last name or phone number.
'lee': 1 match(es)
'zzz': 0 match(es)
```
`lee` finds only Morgan, because Sam is soft-deleted.

## Practice task

Add a case that supplies a phone number only.

<details>
<summary>Answer / check</summary>

`("", "0102")` returns one match (Priya) because `Contains` finds `0102` in her number.

</details>

## Next lesson

- [40. Collecting Validation Results](../03-validation-result-collection/)
