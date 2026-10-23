---
title: "54. Authentication and Identity Setup with Migrations"
description: "Use ASP."
sidebar:
  order: 5
---

**Estimated time:** 10 minutes

## Prerequisites

- Blazor Web App project and EF basics.

## Plain-language explanation

Use ASP.NET Core Identity with migrations in your app. Do not publish shared admin passwords.

## Focused example / procedure

```text
1. Add Identity packages/templates for your target .NET version.
2. Configure Identity + EF store in Program.cs.
3. Create/apply migrations.
4. Seed roles/users through secure local tooling.
```

## Expected output or behaviour

Users can register/sign in and Identity tables exist in database.

## Practice task

Is `AuthorizeView` alone enough to secure server operations?

<details>
<summary>Answer / check</summary>


No. It hides UI only; server endpoints/services still need authorization checks.


</details>


## Next lesson

- [55. Roles, Server Authorization, Resource Ownership, User Secrets](/lessons/enterprise-application-development/06-state-checkout-and-security/06-roles-authorization-ownership-and-secrets/)
