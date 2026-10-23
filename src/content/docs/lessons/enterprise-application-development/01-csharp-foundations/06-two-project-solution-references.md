---
title: "6. Two-Project Solution and References"
description: "Create a web project and a class library, and reference the library from the web project."
sidebar:
  order: 6
---

**Estimated time:** 12 minutes

## Prerequisites

Lesson 5, the .NET SDK and (optionally) Visual Studio on Windows.

## Plain-language explanation

The course splits an application into a web project (`WorkshopWeb`, the user interface) and a class library (`WorkshopSystem`, business logic and data access). Dependencies point one way: the web project references the library, never the reverse, so the business code can be tested without a browser. Inside the library, four folders keep roles apart: `BLL` (services and business rules), `DAL` (the database context), `Entities` (classes that mirror tables) and `ViewModels` (shapes the screens need). Folders are only organisation; the one-way project reference is what actually enforces the boundary.

## Focused example / procedure

Setup lab — about 12 minutes. Run in an empty folder:

```shell
dotnet new sln -n Workshop
dotnet new blazor -n WorkshopWeb --interactivity Server
dotnet new classlib -n WorkshopSystem
dotnet sln add WorkshopWeb WorkshopSystem
dotnet add WorkshopWeb reference WorkshopSystem
mkdir WorkshopSystem/BLL WorkshopSystem/DAL WorkshopSystem/Entities WorkshopSystem/ViewModels
dotnet build
```

Visual Studio equivalent: **Add → New Project → Class Library**, then right-click the web project → **Add → Project Reference**. Set `WorkshopWeb` as the startup project. Delete the template's `Class1.cs`. Use the same .NET version for both projects and the version your instructor specifies.

## Expected output or behaviour

`Build succeeded.` Run `dotnet run --project WorkshopWeb` and the default Blazor page opens.

## Practice task

Why would adding a reference from `WorkshopSystem` back to `WorkshopWeb` fail?

<details>
<summary>Answer / check</summary>

It would create a circular dependency: each project would need the other to be built first, and the compiler rejects it. Keeping the arrow one way is the design goal.

</details>

## Next lesson

- [7. Backup and Package Types](../../02-database-and-linqpad-setup/01-backup-package-types/)
