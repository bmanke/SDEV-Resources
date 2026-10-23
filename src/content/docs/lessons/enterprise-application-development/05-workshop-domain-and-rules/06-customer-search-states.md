---
title: "43. Customer Search Service States"
description: "Represent loading, empty, and error states explicitly so users understand what happened."
sidebar:
  order: 6
---

**Estimated time:** 8 minutes

## Prerequisites

- Lessons 39 and 41.

## Plain-language explanation

Represent loading, empty, and error states explicitly so users understand what happened.

## Focused example / procedure

```csharp
try { isLoading = true; rows = await service.SearchAsync(term); }
catch { error = "Search failed."; }
finally { isLoading = false; }
```

## Expected output or behaviour

UI can display spinner, no-results, or error message predictably.

## Practice task

Add a retry button strategy for error state.

<details>
<summary>Answer / check</summary>


Bind a button to rerun the same search term and clear previous error first.


</details>


## Next lesson

- [44. Results Tables: Simple, QuickGrid, MudTable](/lessons/enterprise-application-development/05-workshop-domain-and-rules/07-results-table-options/)
