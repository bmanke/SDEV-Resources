---
title: "53. AppState, EmployeeView, and Event Unsubscription"
description: "AppState can share an `EmployeeView` across components, but notifications do not persist data."
sidebar:
  order: 4
---

**Estimated time:** 8 minutes

## Prerequisites

- Lesson 51 and C# events.

## Plain-language explanation

AppState can share an `EmployeeView` across components, but notifications do not persist data. Subscribers must unsubscribe on dispose.

## Focused example / procedure

```csharp
public event Action? Changed;
public void Notify() => Changed?.Invoke();

public void Dispose() => appState.Changed -= HandleChanged;
```

## Expected output or behaviour

No memory leak from orphaned event handlers during navigation.

## Practice task

What bug appears if components never unsubscribe?

<details>
<summary>Answer / check</summary>


Handlers accumulate and trigger duplicate updates or leaks.


</details>


## Next lesson

- [54. Authentication and Identity Setup with Migrations](/lessons/enterprise-application-development/06-state-checkout-and-security/05-authentication-and-identity-setup/)
