---
title: Assignment 1 Overview
description: Starter files and step-by-step TODO comments for SDEV-2150 Assignment 1.
sidebar:
  order: 1
tags: [sdev-2150, assignment-1, web-components]
---

Assignment 1 is a Pet Care Planner built from web components. Each starter file below contains numbered
`TODO` steps, in the order you should do them. The requirements themselves are in the assignment's
`SPECS.md`, under "Implementation Details by Starter File".

| File | Purpose |
| ---- | ------- |
| `main.js` | The entry point. It imports each web component so the custom elements register. |
| `api/pet-care-api.js` | Fetch helpers for pets, tasks and care logs, using the backend URL from the Vite env file. |
| `components/pet-care-dashboard.js` | The page shell: navbar, named slots and layout for the other components. |
| `components/pet-picker.js` | Loads the pets and lets the user choose one. |
| `components/care-task-list.js` | Lists the care tasks for the selected pet and logs completed ones. |
| `components/care-log.js` | Shows recent care log entries for the selected pet, with loading, empty and error states. |

## Suggested order

1. Start with the API module, because every component depends on it.
2. Build `PetCareDashboard`, then `PetPicker`.
3. Build `CareTaskList` and `CareLog`.
4. Finish by checking that `main.js` imports every component.

Source: [bmanke/SDEV-Resources](https://github.com/bmanke/SDEV-Resources/tree/main/SDEV2501-Assignment-Notes/Assignment-1).
