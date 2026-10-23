---
title: "7. Backup and Package Types"
description: "Tell BAK, BACPAC and DACPAC files apart before touching a database."
sidebar:
  order: 1
---

**Estimated time:** 6 minutes

## Prerequisites

Basic idea of what a database is.

## Plain-language explanation

SQL Server teaching databases arrive in different file types, and each one is opened a different way. Mixing them up is the usual reason an import fails or, worse, overwrites something. Do not rely on file size to guess the type; look at the extension.

## Focused example / procedure

| File | What it holds | How you open it in SSMS |
| --- | --- | --- |
| `.bak` | A native SQL Server backup of a database, including its data | **Restore Database…** |
| `.bacpac` | A portable package of schema **and data** | **Import Data-tier Application…** |
| `.dacpac` | Schema definition (a typical one has no table data) | Deploy or upgrade a data-tier application |

Importing and restoring are different operations. A BACPAC import creates a new database from a package; a BAK restore replays a native backup. A BACPAC is best taken from a database with no active connections, so the data is consistent.

## Expected output or behaviour

You can name the right SSMS command for each of the three file types.

## Practice task

Your instructor gives you `Teaching.bacpac`. Which wizard do you use, and does it contain data?

<details>
<summary>Answer / check</summary>

**Import Data-tier Application…**, and yes, a BACPAC includes data. A schema-only DACPAC would give you empty tables.

</details>

## Next lesson

- [8. Safe Teaching Database Import](../02-safe-teaching-database-import/)
