---
title: "7. BAK vs BACPAC vs DACPAC"
description: "`BAK` is a full database backup/restore artifact, `BACPAC` carries schema plus data for import/export, and `DACPAC` carries schema only for deployment."
sidebar:
  order: 1
---

**Estimated time:** 8 minutes

## Prerequisites

- Basic SQL Server vocabulary.

## Plain-language explanation

`BAK` is a full database backup/restore artifact, `BACPAC` carries schema plus data for import/export, and `DACPAC` carries schema only for deployment.

## Focused example / procedure

```text
Use BAK    -> restore full backup to SQL Server instance
Use BACPAC -> import teaching schema+data into a new database
Use DACPAC -> publish schema changes without data payload
```

## Expected output or behaviour

You can explain the correct file choice without risking accidental overwrite.

## Practice task

Which artifact should you use to load sample classroom data into a new local database?

<details>
<summary>Answer / check</summary>


BACPAC, because it includes both schema and data for import into a new database.


</details>


## Next lesson

- [8. Safe Teaching Database Import Lab](/lessons/enterprise-application-development/02-database-and-linqpad-setup/02-safe-teaching-database-import/)
