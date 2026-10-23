---
title: "8. Safe Teaching Database Import Lab"
description: "Always import into a new, clearly named local database."
sidebar:
  order: 2
---

**Estimated time:** 12 minutes

## Prerequisites

- Lesson 7 and SQL Server Management Studio or Azure Data Studio.

## Plain-language explanation

Always import into a new, clearly named local database. Never restore/import over a real environment.

## Focused example / procedure

1. Create a local instance target (not shared production).
2. Name database `WorkshopTeaching_YYYYMMDD`.
3. Import BACPAC through **Import Data-tier Application**.
4. Verify row counts in key tables before coding.
5. Keep original file read-only.


## Expected output or behaviour

A new database appears with expected tables and sample rows; no existing database is replaced.

## Practice task

Write one safety check you run before import starts.

<details>
<summary>Answer / check</summary>


Confirm target server and database name are local teaching targets, not production/staging names.


</details>


## Next lesson

- [9. LINQPad Connections](/lessons/enterprise-application-development/02-database-and-linqpad-setup/03-linqpad-connections/)
