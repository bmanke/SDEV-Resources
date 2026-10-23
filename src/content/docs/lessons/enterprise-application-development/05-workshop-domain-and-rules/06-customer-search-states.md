---
title: "43. Customer Search States"
description: "Model the five states of a search screen."
sidebar:
  order: 6
---

**Estimated time:** 9 minutes

## Prerequisites

Lesson 42, or the in-memory service from Lesson 39.

## Plain-language explanation

A search page is a small state machine: not yet searched, loading, results, empty, or error. Showing "No customers found" before the user searches, or leaving stale results on screen after a failed search, are both bugs. Block a second submission while one is running, and log unexpected exceptions on the server while showing the user a safe message.

## Focused example / procedure

```razor
@page "/customers"
@rendermode InteractiveServer
@inject CustomerService Service

<input @bind="lastName" />
<button type="button" @onclick="SearchAsync" disabled="@(state == SearchState.Loading)">Search</button>

@switch (state)
{
    case SearchState.NotSearched: <p>Enter a last name and search.</p> break;
    case SearchState.Loading:     <p>Searching...</p> break;
    case SearchState.Empty:       <p>No customers found.</p> break;
    case SearchState.Error:       <p role="alert">@message</p> break;
    case SearchState.Results:
        <ul>@foreach (var c in results) { <li @key="c.CustomerId">@c.FullName</li> }</ul>
        break;
}

@code {
    private enum SearchState { NotSearched, Loading, Empty, Error, Results }
    private SearchState state = SearchState.NotSearched;
    private string lastName = string.Empty;
    private string message = string.Empty;
    private List<CustomerSearchView> results = new();

    private async Task SearchAsync()
    {
        if (state == SearchState.Loading) return;
        if (string.IsNullOrWhiteSpace(lastName)) { state = SearchState.Error; message = "Enter a last name."; return; }
        state = SearchState.Loading;
        try
        {
            results = await Service.SearchAsync(lastName.Trim());
            state = results.Count == 0 ? SearchState.Empty : SearchState.Results;
        }
        catch (Exception)
        {
            results = new();
            state = SearchState.Error;
            message = "The search failed. Please try again.";
        }
    }
}
```

## Expected output or behaviour

Each of the five states shows exactly one message, and stale results never survive an error.

## Practice task

Where would you add logging of the exception?

<details>
<summary>Answer / check</summary>

Inject `ILogger<Customers>` and log inside the `catch`, before showing the generic message.

</details>

## Next lesson

- [44. Results Table Options](../07-results-table-options/)
