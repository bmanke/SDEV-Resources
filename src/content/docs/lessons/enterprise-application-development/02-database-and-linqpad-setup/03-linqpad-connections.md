---
title: "9. LINQPad Connections"
description: "Create explicit connections so queries run against the intended database."
sidebar:
  order: 3
---

**Estimated time:** 7 minutes

## Prerequisites

- Lesson 8 and LINQPad installed.

## Plain-language explanation

Create explicit connections so queries run against the intended database. Label connections with environment suffixes like `-Teaching`.

## Focused example / procedure

```text
Connection name: WorkshopTeaching (local)
Provider: SQL Server
Database: WorkshopTeaching_20261023
```

## Expected output or behaviour

Running a basic table query returns local teaching data and not an unintended server.

## Practice task

Create a second connection for an empty scratch database and explain why it helps.

<details>
<summary>Answer / check</summary>


A scratch DB lets you test destructive queries safely without touching fixture data.


</details>


## Next lesson

- [10. LINQPad Expression, Statements, and Program Modes](/lessons/enterprise-application-development/02-database-and-linqpad-setup/04-linqpad-execution-modes/)
