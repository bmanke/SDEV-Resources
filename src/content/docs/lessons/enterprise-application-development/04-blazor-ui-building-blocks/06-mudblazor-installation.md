---
title: "34. MudBlazor Installation Lab (Interactive Server)"
description: "Install MudBlazor with official package/docs for your ."
sidebar:
  order: 6
---

**Estimated time:** 12 minutes

## Prerequisites

- Modern Blazor Web App project created.

## Plain-language explanation

Install MudBlazor with official package/docs for your .NET version, then register services once in `Program.cs`.

## Focused example / procedure

1. Add NuGet package `MudBlazor` with a supported version.
2. Register `builder.Services.AddMudServices();`.
3. Add MudBlazor providers in root layout as documented.
4. Rebuild and confirm a sample `MudButton` renders.


## Expected output or behaviour

App builds and renders Mud components without script/style errors.

## Practice task

Why should you verify version compatibility before installation?

<details>
<summary>Answer / check</summary>


Mismatched package/framework versions can cause runtime or build failures in components and JS interop.


</details>


## Next lesson

- [35. Typed Text and Numeric Controls](/lessons/enterprise-application-development/04-blazor-ui-building-blocks/07-typed-input-controls/)
