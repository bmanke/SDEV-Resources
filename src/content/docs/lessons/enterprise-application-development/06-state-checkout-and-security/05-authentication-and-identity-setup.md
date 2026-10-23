---
title: "54. Authentication and Identity Setup"
description: "Create an app with individual accounts and prepare its database properly."
sidebar:
  order: 5
---

**Estimated time:** 14 minutes

## Prerequisites

Lesson 6 and SQL Server LocalDB or SQL Server Express.

## Plain-language explanation

Authentication answers "who are you?" (sign-in with a password, cookie or external provider); authorization answers "what may you do?". ASP.NET Core Identity provides registration, sign-in, password hashing and a user store, so you should never write your own password handling. Its tables (such as `AspNetUsers`, `AspNetRoles` and `AspNetUserRoles`) live in a database created by migrations. Template development pages sometimes offer an **Apply Migrations** button, but the command line is more reliable and shows real errors.

## Focused example / procedure

Setup lab — about 14 minutes.

```shell
dotnet new blazor -n WorkshopSecure --interactivity Server --auth Individual --use-local-db
dotnet tool install --global dotnet-ef        # once; use "update" if already installed
cd WorkshopSecure
dotnet ef database update
dotnet run
```

If the template also generates a separate context, pass `--context ApplicationDbContext` to the `dotnet ef` command. Then:

1. Open the site and choose **Register**.
2. In development the template may show a confirmation link instead of sending email; use it only for local practice.
3. Sign in, then inspect `AspNetUsers` in SQL Server Object Explorer.

## Expected output or behaviour

A registered user appears in `AspNetUsers` with a `PasswordHash` column, not the password itself.

## Practice task

Why must the database be updated before the first registration?

<details>
<summary>Answer / check</summary>

Identity stores users in tables that do not exist until migrations create them. Without them registration fails with a database error.

</details>

## Next lesson

- [55. Roles, Server Authorization, Ownership and Secrets](../06-roles-authorization-ownership-and-secrets/)
