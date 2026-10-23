---
title: "55. Roles, Server Authorization, Ownership and Secrets"
description: "Restrict by role, enforce it on the server and keep credentials out of Git."
sidebar:
  order: 6
---

**Estimated time:** 14 minutes

## Prerequisites

Lesson 54.

## Plain-language explanation

Roles group permissions (for example Admin and Manager). `[Authorize(Roles = "Admin,Manager")]` on a routable page requires either role. `<AuthorizeView>` only changes what is **drawn**; it does not protect the code behind the button. Every service method that changes data must check the caller's permission and, where relevant, **ownership** (does this invoice belong to this user or their organisation?), because anyone can call your endpoints directly. Create roles and assign users through `RoleManager` and `UserManager` in code or an admin tool, and never publish shared admin passwords. Keep local secrets out of source control with User Secrets: they live outside the project folder, are not encrypted, and are for development only.

## Focused example / procedure

```razor
@page "/reports"
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize(Roles = "Admin,Manager")]

<AuthorizeView Roles="Admin">
    <Authorized><button type="button" @onclick="Reset">Reset data</button></Authorized>
    <NotAuthorized><p>You do not have access to this action.</p></NotAuthorized>
</AuthorizeView>
```

```csharp
// Server-side check inside the service method that actually performs the work
public async Task ResetAsync(ClaimsPrincipal user)
{
    if (!user.IsInRole("Admin"))
        throw new UnauthorizedAccessException("Admin role required.");
    // ... do the work ...
}
```

```shell
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:Workshop" "<your-local-connection-string>"
```
The `AddRoles<IdentityRole>()` call must be present in Identity setup for role checks to work. If a secret was ever committed, rotate it: deleting the line does not remove it from Git history.

## Expected output or behaviour

Anonymous users are redirected to sign-in, signed-in users without a role get access denied, and the Reset button is also protected inside the service.

## Practice task

A user without the Admin role posts directly to the reset endpoint. What stops them?

<details>
<summary>Answer / check</summary>

The server-side role check in the service. Hiding the button was only convenience.

</details>

## Next lesson

- You have finished the path. Return to the [course overview](../../).
