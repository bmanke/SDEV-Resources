---
title: "Optional Reference: C# Basics and Blazor in Visual Studio"
description: "Optional long-form reference for core C# syntax and a beginner Blazor task page."
sidebar:
  order: 999
---

> This page is retained as optional background reference. The primary learning path is the bite-sized module sequence in this course section.

This lesson introduces practical C# basics and then applies them in a small Blazor Web App page built in Visual Studio on Windows.

## Learning goals

By the end of this lesson, you will be able to:

- Declare variables and common C# types.
- Use string interpolation, conditions, lists, loops and methods.
- Define classes, properties and namespaces.
- Create a Blazor Web App named **EnterpriseTasks** with **Server** interactivity.
- Build a validated `/tasks` page with add, complete and delete behavior.
- Explain how routing, binding, events, lambdas and render modes work in this example.

## Part 1: C# fundamentals with runnable console examples

Create a new console app in Visual Studio or with `dotnet new console`, then replace `Program.cs` with each example and run it.

### Variables, types and string interpolation

```csharp title="Program.cs"
using System;

namespace CSharpBasicsDemo;

internal class Program
{
    private static void Main()
    {
        string studentName = "Avery";
        int completedLabs = 5;
        double averageScore = 91.75;
        bool isPassing = averageScore >= 70.0;

        Console.WriteLine($"Student: {studentName}");
        Console.WriteLine($"Completed labs: {completedLabs}");
        Console.WriteLine($"Average score: {averageScore:F1}");
        Console.WriteLine($"Passing: {isPassing}");
    }
}
```

### Conditions

```csharp title="Program.cs"
using System;

namespace CSharpBasicsDemo;

internal class Program
{
    private static void Main()
    {
        int score = 84;
        string letterGrade;

        if (score >= 90)
        {
            letterGrade = "A";
        }
        else if (score >= 80)
        {
            letterGrade = "B";
        }
        else if (score >= 70)
        {
            letterGrade = "C";
        }
        else
        {
            letterGrade = "Needs improvement";
        }

        Console.WriteLine($"Score {score} => {letterGrade}");
    }
}
```

### Lists and loops

```csharp title="Program.cs"
using System;
using System.Collections.Generic;

namespace CSharpBasicsDemo;

internal class Program
{
    private static void Main()
    {
        List<string> tasks = new()
        {
            "Review pull request",
            "Write test cases",
            "Update release notes"
        };

        Console.WriteLine("Task list:");
        for (int index = 0; index < tasks.Count; index++)
        {
            Console.WriteLine($"{index + 1}. {tasks[index]}");
        }

        Console.WriteLine();
        Console.WriteLine("Using foreach:");
        foreach (string task in tasks)
        {
            Console.WriteLine($"- {task}");
        }
    }
}
```

### Methods, classes, properties and namespaces

```csharp title="Program.cs"
using System;
using System.Collections.Generic;

namespace EnterpriseTasks.ConsoleDemo;

public class WorkItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public bool IsComplete { get; set; }
}

internal class Program
{
    private static void Main()
    {
        List<WorkItem> items = new()
        {
            new WorkItem { Id = 1, Title = "Set up solution", IsComplete = true },
            new WorkItem { Id = 2, Title = "Build tasks page", IsComplete = false }
        };

        PrintSummary(items);
    }

    private static void PrintSummary(List<WorkItem> items)
    {
        int completedCount = 0;
        foreach (WorkItem item in items)
        {
            if (item.IsComplete)
            {
                completedCount++;
            }
        }

        Console.WriteLine($"Completed {completedCount} of {items.Count} work items.");
    }
}
```

## Part 2: Create an EnterpriseTasks Blazor Web App in Visual Studio

## Prerequisites

- Windows with Visual Studio 2022 (or later) installed.
- Visual Studio Installer workload: **ASP.NET and web development**.
- A course-compatible, supported .NET SDK (for most courses, .NET 8 LTS is typical; follow your instructor's required version).

Official references:

- [Install Visual Studio workloads](https://learn.microsoft.com/visualstudio/install/modify-visual-studio)
- [Download .NET](https://dotnet.microsoft.com/download)
- [Blazor fundamentals](https://learn.microsoft.com/aspnet/core/blazor/)

## Create the project

1. Open Visual Studio.
2. Select **Create a new project**.
3. Choose **Blazor Web App**.
4. Name the project **EnterpriseTasks** and pick a local folder.
5. On Additional information:
   - Framework: choose your course-compatible supported .NET SDK.
   - Authentication type: **None** (local exercise).
   - Configure for HTTPS: **checked**.
   - Interactive render mode: **Server**.
   - Interactivity location: **Per page/component**.
6. Click **Create**.

This creates a server-interactive Blazor app that runs locally as its own ASP.NET Core application. It is separate from this static Starlight documentation site, which is published to GitHub Pages.

## Project structure at a glance

```text
EnterpriseTasks/
├── Components/
│   ├── Layout/
│   │   └── NavMenu.razor
│   └── Pages/
│       ├── Home.razor
│       └── Tasks.razor          <-- add this
├── Models/
│   └── WorkItem.cs              <-- add this
├── Program.cs
└── wwwroot/
```

- `Program.cs` configures services and app startup.
- `Components/Pages` holds routed pages.
- `Models` holds domain models.
- `NavMenu.razor` contains app navigation links.

## Add the model

Create `Models/WorkItem.cs`:

```csharp title="Models/WorkItem.cs"
using System.ComponentModel.DataAnnotations;

namespace EnterpriseTasks.Models;

public class WorkItem
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Title is required.")]
    [StringLength(80, ErrorMessage = "Title cannot be longer than 80 characters.")]
    public required string Title { get; set; }

    public bool IsComplete { get; set; }
}
```

`[Required]` and `[StringLength]` are read by Blazor validation components when the form is submitted.

## Add the tasks page

Create `Components/Pages/Tasks.razor`:

```razor title="Components/Pages/Tasks.razor"
@page "/tasks"
@rendermode InteractiveServer
@using System.Collections.Generic
@using System.Linq
@using EnterpriseTasks.Models
@using Microsoft.AspNetCore.Components.Forms

<PageTitle>Tasks</PageTitle>

<h1>Enterprise Tasks</h1>
<p>Add and track simple in-memory work items.</p>

<EditForm Model="@newWorkItem" OnValidSubmit="@AddTask">
    <DataAnnotationsValidator />

    <div class="task-form-row">
        <label for="titleInput">Title</label>
        <InputText id="titleInput" class="task-input" @bind-Value="newWorkItem.Title" />
        <ValidationMessage For="@(() => newWorkItem.Title)" />
    </div>

    <button type="submit">Add task</button>
</EditForm>

@if (!string.IsNullOrWhiteSpace(statusMessage))
{
    <p class="status-message">@statusMessage</p>
}

<p class="summary">@CompletedCount of @tasks.Count tasks completed.</p>

@if (tasks.Count == 0)
{
    <p class="empty-state">No tasks yet. Add your first task above.</p>
}
else
{
    <ul class="task-list">
        @foreach (WorkItem task in tasks)
        {
            <li @key="task.Id" class="task-item">
                <label class="task-label">
                    <input type="checkbox" @bind="task.IsComplete" />
                    <span class="@(task.IsComplete ? "completed" : string.Empty)">
                        @task.Title
                    </span>
                </label>
                <button type="button" @onclick="() => DeleteTask(task.Id)">Delete</button>
            </li>
        }
    </ul>
}

@code {
    private readonly List<WorkItem> tasks = new();
    private WorkItem newWorkItem = CreateEmptyWorkItem();
    private string statusMessage = "Ready to add a task.";
    private int nextId = 1;

    private int CompletedCount => tasks.Count(task => task.IsComplete);

    private static WorkItem CreateEmptyWorkItem()
    {
        return new WorkItem
        {
            Title = string.Empty
        };
    }

    private void AddTask()
    {
        string normalizedTitle = (newWorkItem.Title ?? string.Empty).Trim();

        if (string.IsNullOrWhiteSpace(normalizedTitle))
        {
            statusMessage = "Task title cannot be blank or whitespace.";
            return;
        }

        WorkItem itemToAdd = new()
        {
            Id = nextId++,
            Title = normalizedTitle,
            IsComplete = false
        };

        tasks.Add(itemToAdd);
        statusMessage = $"Added task: {itemToAdd.Title}";
        newWorkItem = CreateEmptyWorkItem();
    }

    private void DeleteTask(int id)
    {
        WorkItem? item = tasks.FirstOrDefault(task => task.Id == id);
        if (item is null)
        {
            statusMessage = $"Task {id} was not found.";
            return;
        }

        tasks.Remove(item);
        statusMessage = $"Deleted task: {item.Title}";
    }
}
```

### Why this page works

- **Routing:** `@page "/tasks"` maps this component to `/tasks`.
- **Render mode:** `@rendermode InteractiveServer` enables server interactivity for this page.
- **Binding:** `@bind-Value="newWorkItem.Title"` keeps the input and model property synchronized.
- **Events:** `OnValidSubmit="@AddTask"` runs after successful validation.
- **Lambdas:** `@onclick="() => DeleteTask(task.Id)"` passes each task's ID to the handler.
- **Validation:** `DataAnnotationsValidator` + `ValidationMessage` display `[Required]`/`[StringLength]` errors.
- **Stable rendering keys:** `@key="task.Id"` helps Blazor preserve element identity.

> This example stores data only in component memory. Refreshing the app or restarting the server resets the task list.

## Add scoped styles

Create `Components/Pages/Tasks.razor.css`:

```css title="Components/Pages/Tasks.razor.css"
.task-form-row {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 0.75rem;
    max-width: 28rem;
}

.task-input {
    padding: 0.5rem;
}

.status-message {
    margin: 0.75rem 0;
    color: #0f5132;
}

.summary {
    font-weight: 600;
}

.empty-state {
    color: #6c757d;
    font-style: italic;
}

.task-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.task-item {
    align-items: center;
    display: flex;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
}

.task-label {
    align-items: center;
    display: flex;
    gap: 0.5rem;
}

.completed {
    opacity: 0.7;
    text-decoration: line-through;
}
```

These styles are scoped to `Tasks.razor` because the file name matches the component name.

## Add a navigation link

In `Components/Layout/NavMenu.razor`, add one item with the same style pattern as existing links:

```razor title="Components/Layout/NavMenu.razor (addition)"
<div class="nav-item px-3">
    <NavLink class="nav-link" href="tasks">
        <span class="bi bi-list-task-nav-menu" aria-hidden="true"></span> Tasks
    </NavLink>
</div>
```

Use whatever icon/span convention your template already uses; keep the `href` pointing to `tasks`.

## Debugging in Visual Studio

1. Press **F5** to run with debugging.
2. Browse to `https://localhost:xxxx/tasks`.
3. Set breakpoints in `AddTask` and `DeleteTask`.
4. Add and delete tasks in the browser.
5. Use **Locals** and **Watch** to inspect:
   - `newWorkItem.Title`
   - `tasks`
   - `statusMessage`
   - `CompletedCount`

Helpful docs:

- [Debug ASP.NET Core apps in Visual Studio](https://learn.microsoft.com/visualstudio/debugger/quickstart-debug-aspnet)
- [Blazor forms and validation](https://learn.microsoft.com/aspnet/core/blazor/forms-validation)
- [Blazor render modes](https://learn.microsoft.com/aspnet/core/blazor/components/render-modes)

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `/tasks` returns 404 | `@page "/tasks"` missing or file not in `Components/Pages` | Confirm route directive and location |
| Form submits but no item appears | `OnValidSubmit` not wired or validation failing | Confirm `OnValidSubmit="@AddTask"` and check validation messages |
| Blank titles still appear | Trim/whitespace check missing | Keep `Trim()` and `string.IsNullOrWhiteSpace` guard |
| Checkbox changes do not stick | `@bind` missing on checkbox | Use `@bind="task.IsComplete"` |
| Styles do not apply | CSS file name mismatch | Use `Tasks.razor.css` exactly |

## Manual testing checklist

- [ ] Open `/tasks` from the nav menu link.
- [ ] Submit an empty title and confirm validation/status feedback.
- [ ] Submit a title with surrounding spaces and confirm it is trimmed.
- [ ] Add multiple tasks and confirm each gets a unique stable ID.
- [ ] Toggle completion checkboxes and verify completed count updates.
- [ ] Delete a task and verify status message and list update.
- [ ] Refresh the page and verify tasks reset (in-memory behavior).

## Review questions

1. What is the difference between `OnSubmit` and `OnValidSubmit` in `EditForm`?
2. Why do we use `@key` when rendering lists?
3. Why does this prototype lose tasks after a refresh?
4. What does `@rendermode InteractiveServer` change compared to static rendering?
5. How do data annotations connect model rules to UI validation messages?

## Extension exercise: add priority with an enum

Add a `Priority` enum and property to `WorkItem`, then update the form with a dropdown.

```csharp
namespace EnterpriseTasks.Models;

public enum Priority
{
    Low,
    Medium,
    High
}
```

Then:

1. Add `public Priority Priority { get; set; } = Priority.Medium;` to `WorkItem`.
2. Add an `InputSelect` in `Tasks.razor`.
3. Show priority beside each task in the list.
4. Try sorting tasks by priority before rendering.

## What comes next in enterprise applications

This lesson is a local learning prototype, not a production-ready system. Real enterprise apps usually add:

- Services and dependency injection boundaries.
- Database persistence (for example EF Core with SQL Server or PostgreSQL).
- Authentication and authorization.
- Structured logging and monitoring.
- Automated tests (unit, component and integration tests).

Related docs:

- [Dependency injection in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/dependency-injection)
- [EF Core getting started](https://learn.microsoft.com/ef/core/get-started/overview/first-app)
- [Authentication in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/authentication/)
- [Authorization in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/authorization/introduction)
- [Logging in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/logging/)
- [Test Razor components in Blazor](https://learn.microsoft.com/aspnet/core/blazor/test)
