// CareTaskList web component

// TODO: Implement this component using the requirements in SPECS.md
// (Implementation Details by Starter File).

// TODO: IMPLEMENT THESE STEPS IN ORDER:
//
// TODO: Step 1 — Confirm fetchTasksForPet works in pet-care-api.js.
//
// TODO: Step 2 — Import fetchTasksForPet from the API module.
//
// TODO: Step 3 — Import createCareLogEntry from the API module.
//
// TODO: Step 4 — Create an HTML template for this component.
//
// TODO: Step 5 — In the template, add:
// - A heading with the exact text "Care Tasks".
// - Contextual text for the currently selected pet.
// - A task output container.
// - A place for loading, empty, and error messages.
//
// TODO: Step 6 — Define a class that extends HTMLElement.
//
// TODO: Step 7 — In the constructor:
// - Attach an open Shadow DOM root.
// - Clone the template into the Shadow DOM.
// - Initialize petId as null.
// - Initialize isLoaded as false.
// - Initialize tasks as an empty array.
// - Save output-container references.
// - Bind task-completion handlers once if needed.
//
// TODO: Step 8 — Add a public petId getter that returns the stored ID.
//
// TODO: Step 9 — Add a public petId setter:
// - Compare the incoming value with the stored value.
// - Avoid re-fetching if the ID has not changed.
// - Store the new ID.
// - Trigger fetchTasks with the new pet ID.
//
// TODO: Step 10 — Implement a safe no-pet-selected render path.
//
// TODO: Step 11 — Implement fetchTasks(petId):
// - Set isLoaded to false while fetching.
// - Render "Loading tasks...".
// - Call fetchTasksForPet(petId).
// - Save the returned tasks.
// - Set isLoaded to true after success.
// - Render task rows or the empty state.
// - Render the required error state on failure.
//
// TODO: Step 12 — Render the required empty state:
// "No care tasks found for this pet."
//
// TODO: Step 13 — Render task-fetch errors:
// - Add an element with class "error".
// - Add role="alert".
// - Show exactly: "Failed to load tasks".
//
// TODO: Step 14 — Render each task:
// - Wrap it in an element with data-task-id containing the exact task ID.
// - Display useful task details from the backend.
// - Add an accessible "Mark Complete" action.
// - Add data-complete-task-id containing that task ID.
//
// TODO: Step 15 — Test selecting different pets and confirm tasks refresh.
//
// TODO: Step 16 — Implement task completion only after task rendering works:
// - Identify taskId from data-complete-task-id.
// - Confirm petId exists.
// - Prevent duplicate submissions while a request is pending.
// - Call createCareLogEntry(petId, { taskId }).
// - Wait for backend success.
// - Get completedAt from the created log object if available.
// - Dispatch a CustomEvent named "task:completed".
// - Use detail: { petId, taskId, completedAt }.
// - Set bubbles: true and composed: true.
// - Restore the completion action after the request.
//
// TODO: Step 17 — Show a readable error if care-log creation fails.
//
// TODO: Step 18 — Implement disconnectedCallback:
// - Remove all click/keyboard listeners registered by this component.
//
// TODO: Step 19 — Register the element using the exact tag name:
// "care-task-list".