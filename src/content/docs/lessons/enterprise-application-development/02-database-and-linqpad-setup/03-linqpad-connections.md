---
title: "9. LINQPad Connections"
description: "Point LINQPad at the practice database so you can run queries against it."
sidebar:
  order: 3
---

**Estimated time:** 8 minutes

## Prerequisites

Lesson 8 and LINQPad installed.

## Plain-language explanation

LINQPad is a scratch pad for C# and LINQ. A connection tells it which server and database to read, and it then builds a data context so table names such as `Customers` become queries you can type. The classroom path starts with the default driver and later uses an Entity Framework connection, so the queries you prototype match the EF code in your application.

## Focused example / procedure

1. In LINQPad choose **Add connection**.
2. Keep the default driver unless your instructor asks for the EF Core driver.
3. Set **Server** to `.` (or `(localdb)\MSSQLLocalDB`).
4. Choose **Specify new or existing database** and pick `Teaching_Practice`.
5. Click **Test**, then **OK**.
6. Open a new query, select the connection in the toolbar and run this in **C# Expression** mode:

```csharp
Customers.Count()
```

## Expected output or behaviour

A number equal to the row count of your `Customers` table (your table name may differ).

## Practice task

The test fails with "cannot open database". Name two things to check.

<details>
<summary>Answer / check</summary>

That the server name is right and SQL Server is running, and that the database name exactly matches the one you imported (check `sys.databases`).

</details>

## Next lesson

- [10. LINQPad Execution Modes](../04-linqpad-execution-modes/)
