---
title: "6. Two-Project Solutions and Reference Direction"
description: "In a two-project solution, dependency direction should point inward: UI/app project references domain/library project, not the reverse."
sidebar:
  order: 6
---

**Estimated time:** 8 minutes

## Prerequisites

- Lessons 1–5.

## Plain-language explanation

In a two-project solution, dependency direction should point inward: UI/app project references domain/library project, not the reverse.

## Focused example / procedure

```text
Workshop.sln
├── Workshop.Domain   (entities, services, validation models)
└── Workshop.App      (Blazor UI)

Reference: Workshop.App -> Workshop.Domain
```

## Expected output or behaviour

The domain project stays UI-agnostic and reusable in tests or other apps.

## Practice task

State whether `Workshop.Domain` should reference `Workshop.App` and why.

<details>
<summary>Answer / check</summary>


No. That would invert dependencies and couple business logic to UI frameworks.


</details>


## Next lesson

- [7. BAK vs BACPAC vs DACPAC](/lessons/enterprise-application-development/02-database-and-linqpad-setup/01-backup-package-types/)
