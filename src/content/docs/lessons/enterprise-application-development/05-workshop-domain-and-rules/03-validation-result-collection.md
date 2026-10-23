---
title: "40. Collecting Validation Results"
description: "Gather every problem before reporting, instead of stopping at the first."
sidebar:
  order: 3
---

**Estimated time:** 8 minutes

## Prerequisites

Lessons 37 and 39.

## Plain-language explanation

A good message tells the user everything wrong at once. Build a list of errors as you check each rule, then return after all rules have run. Stop early only when continuing is meaningless, such as when the request itself is null. Service validation is not optional even if the screen also validates: anyone can call the service with unvalidated data.

## Focused example / procedure

```csharp
static List<string> Validate(CustomerEditView? c)
{
    var errors = new List<string>();
    if (c is null) { errors.Add("No customer was supplied."); return errors; }

    if (string.IsNullOrWhiteSpace(c.FirstName)) errors.Add("First name is required.");
    if (string.IsNullOrWhiteSpace(c.LastName))  errors.Add("Last name is required.");
    if (string.IsNullOrWhiteSpace(c.Phone))     errors.Add("Phone is required.");
    if (string.IsNullOrWhiteSpace(c.Email))     errors.Add("Email is required.");
    if (c.FirstName.Length > 20) errors.Add("First name is limited to 20 characters.");
    return errors;
}

Console.WriteLine(string.Join(" | ", Validate(new CustomerEditView())));
```

## Expected output or behaviour

`First name is required. | Last name is required. | Phone is required. | Email is required.`

## Practice task

Why does the null check return immediately but the field checks do not?

<details>
<summary>Answer / check</summary>

With a null request there is nothing to inspect, so more checks would throw. With a real object every rule can run independently.

</details>

## Next lesson

- [41. EF Core Entities, Context and Dependency Injection](../04-ef-entities-context-di/)
