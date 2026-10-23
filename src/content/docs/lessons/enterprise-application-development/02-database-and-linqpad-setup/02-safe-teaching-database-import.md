---
title: "8. Safe Teaching Database Import"
description: "Load a teaching database under a new name so nothing real can be overwritten."
sidebar:
  order: 2
---

**Estimated time:** 12 minutes

## Prerequisites

Lesson 7, SQL Server (Express or LocalDB) and SQL Server Management Studio.

## Plain-language explanation

The rule for this lab is simple: always give the practice database a new, unmistakable name, and never tick any option that replaces an existing database. If a wizard offers a name that already exists, stop and cancel. You can always delete a practice copy; you cannot always recover an overwritten one.

## Focused example / procedure

Setup lab — about 12 minutes.

1. In SSMS, connect to `.` or `(localdb)\MSSQLLocalDB`.
2. Right-click **Databases**. For a BACPAC choose **Import Data-tier Application…**; for a BAK choose **Restore Database…**.
3. Select the file and set the new database name to something like `Teaching_Practice`.
4. For a BAK restore, open **Options** and confirm that **Overwrite the existing database (WITH REPLACE)** is **unchecked**.
5. Finish the wizard, refresh **Databases**, then verify with a query:

```sql
SELECT name, create_date
FROM sys.databases
ORDER BY create_date DESC;
```

## Expected output or behaviour

`Teaching_Practice` appears at the top of the result with today's date, and your other databases are unchanged.

## Practice task

The wizard proposes a database name that already exists in your list. What do you do?

<details>
<summary>Answer / check</summary>

Cancel, then rename the target (for example add `_Practice`). Proceeding could replace real data.

</details>

## Next lesson

- [9. LINQPad Connections](../03-linqpad-connections/)
