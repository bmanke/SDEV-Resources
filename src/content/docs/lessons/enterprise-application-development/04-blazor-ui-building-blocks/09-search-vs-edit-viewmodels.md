---
title: "37. Search vs Edit View Models"
description: "Search and edit have different responsibilities."
sidebar:
  order: 9
---

**Estimated time:** 6 minutes

## Prerequisites

- Lesson 35.

## Plain-language explanation

Search and edit have different responsibilities. Do not expose every database column in UI view models.

## Focused example / procedure

```csharp
public record CustomerSearchRow(int Id, string Name, string City);
public class CustomerEditModel { public int Id { get; set; } public string Name { get; set; } = ""; }
```

## Expected output or behaviour

Search payload stays small; edit model carries only fields required for form logic.

## Practice task

Name one risk of reusing entity types directly as UI models.

<details>
<summary>Answer / check</summary>


Over-posting and accidental exposure of internal fields.


</details>


## Next lesson

- [38. Workshop Fixture: Customers, Parts, and Invoices](/lessons/enterprise-application-development/05-workshop-domain-and-rules/01-workshop-fixture/)
