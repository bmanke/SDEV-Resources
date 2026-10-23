---
title: "55. Roles, Server Authorization, Resource Ownership, User Secrets"
description: "Enforce roles and ownership on server handlers/services."
sidebar:
  order: 6
---

**Estimated time:** 9 minutes

## Prerequisites

- Lesson 54.

## Plain-language explanation

Enforce roles and ownership on server handlers/services. `User Secrets` is for local development only, unencrypted, and managed with built-in SDK commands.

## Focused example / procedure

```text
- [Authorize(Roles = "Manager")] for privileged operations
- Per-record ownership check: user can access only own resources
- dotnet user-secrets init / set for local secrets
```

## Expected output or behaviour

Unauthorized users are denied even if they bypass UI controls.

## Practice task

Where should production secrets live instead of User Secrets?

<details>
<summary>Answer / check</summary>


Use environment/managed secret stores (e.g., platform secret manager), not repository files.


</details>
