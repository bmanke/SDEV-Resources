// PetCareDashboard web component

// TODO: Implement this component using the requirements in SPECS.md
// (Implementation Details by Starter File).

// TODO: IMPLEMENT THESE STEPS IN ORDER:
//
// TODO: Step 1 — Create a reusable HTML template before defining the class.
//
// TODO: Step 2 — In the template, add:
// - A top navbar/header whose title is exactly "Pet Care Planner".
// - A named slot "pets" for the pet-picker component.
// - A named slot "tasks" for the care-task-list component.
// - A named slot "logs" for the care-log component.
//
// TODO: Step 3 — Use a responsive layout that places pets on the left and
// displays tasks/logs in the main content area.
//
// TODO: Step 4 — Define a class that extends HTMLElement.
//
// TODO: Step 5 — In the constructor:
// - Attach an open Shadow DOM root.
// - Clone the template into the Shadow DOM.
// - Initialize selectedPetId as null.
// - Bind onPetSelected and onTaskCompleted once so the same function
// references are available for disconnectedCallback.
//
// TODO: Step 6 — Implement connectedCallback:
// - Locate the slotted light-DOM pet-picker component.
// - Locate the slotted light-DOM care-task-list component.
// - Locate the slotted light-DOM care-log component.
// - Register a listener for "pet:selected".
// - Register a listener for "task:completed".
//
// TODO: Step 7 — Implement onPetSelected(event):
// - Read event.detail.petId.
// - Save it as the dashboard's selected pet ID.
// - Confirm this event is received before debugging downstream components.
//
// TODO: Step 8 — Continue onPetSelected(event):
// - Set care-task-list.petId to the selected pet ID.
// - Set care-log.petId to the selected pet ID.
// - Do not query inside either child's Shadow DOM.
//
// TODO: Step 9 — Implement onTaskCompleted(event):
// - Read the completed task payload from event.detail.
// - Call care-log.refresh().
// - Let care-log handle its own API call and rendering.
//
// TODO: Step 10 — Implement disconnectedCallback:
// - Remove the pet:selected listener.
// - Remove the task:completed listener.
// - Prevent duplicate event handlers when this element reconnects.
//
// TODO: Step 11 — Register this class using the exact required tag name:
// "pet-care-dashboard".