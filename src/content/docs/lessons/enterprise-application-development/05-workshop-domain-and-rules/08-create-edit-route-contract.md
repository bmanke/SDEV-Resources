---
title: "45. Create/Edit Route ID Contracts"
description: "Edit routes must reject missing/non-positive ids instead of silently creating new records."
sidebar:
  order: 8
---

**Estimated time:** 7 minutes

## Prerequisites

- Lesson 30 routing.

## Plain-language explanation

Edit routes must reject missing/non-positive ids instead of silently creating new records.

## Focused example / procedure

```csharp
if (Id is null || Id <= 0)
{
    nav.NavigateTo("/customers");
    return;
}
```

## Expected output or behaviour

Invalid edit URLs are handled safely and clearly.

## Practice task

What bug appears if missing ID falls through to create logic silently?

<details>
<summary>Answer / check</summary>


Users can overwrite expectations and accidentally create duplicates from bad links.


</details>


## Next lesson

- [46. EditForm Validation, Lookups, and Duplicate Rules](/lessons/enterprise-application-development/05-workshop-domain-and-rules/09-editform-lookups-duplicates/)
