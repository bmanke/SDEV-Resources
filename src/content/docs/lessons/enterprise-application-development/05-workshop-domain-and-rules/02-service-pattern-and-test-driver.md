---
title: "39. Service + Test-Driver Pattern"
description: "Keep business rules in services and test them with a simple driver or unit tests, not only UI clicks."
sidebar:
  order: 2
---

**Estimated time:** 7 minutes

## Prerequisites

- Lesson 38.

## Plain-language explanation

Keep business rules in services and test them with a simple driver or unit tests, not only UI clicks.

## Focused example / procedure

```csharp
public sealed class CustomerSearchService
{
    public IEnumerable<WorkshopCustomer> Search(IEnumerable<WorkshopCustomer> customers, string? term) =>
        string.IsNullOrWhiteSpace(term)
            ? customers
            : customers.Where(c => c.Name.Contains(term.Trim(), StringComparison.OrdinalIgnoreCase));
}
```

## Expected output or behaviour

Search behavior is reproducible and testable without UI framework dependencies.

## Practice task

Write one test case for blank search term.

<details>
<summary>Answer / check</summary>


Assert that blank term returns all non-deleted rows from provided data.


</details>


## Next lesson

- [40. Collecting Validation Results](/lessons/enterprise-application-development/05-workshop-domain-and-rules/03-validation-result-collection/)
