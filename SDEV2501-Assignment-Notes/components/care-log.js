// CareLog web component

// TODO: Implement this component using the requirements in SPECS.md
// (Implementation Details by Starter File).

// TODO: IMPLEMENT THESE STEPS IN ORDER:
//
// TODO: Step 1 — Confirm fetchLogsForPet works in pet-care-api.js.
//
// TODO: Step 2 — Import fetchLogsForPet from the API module.
//
// TODO: Step 3 — Create an HTML template for this component.
//
// TODO: Step 4 — In the template, add:
// - A heading with the exact text "Recent Care Log".
// - A primary log-output container with class="logs-content".
// - A place for loading, empty, and error states.
//
// TODO: Step 5 — Define a class that extends HTMLElement.
//
// TODO: Step 6 — In the constructor:
// - Attach an open Shadow DOM root.
// - Clone the template into the Shadow DOM.
// - Initialize petId as null.
// - Initialize logs as an empty array.
// - Initialize isLoaded as false.
// - Save a reference to the .logs-content element.
//
// TODO: Step 7 — Add a public petId getter that returns the current pet ID.
//
// TODO: Step 8 — Add a public petId setter:
// - Compare the new ID to the current ID.
// - Avoid an unnecessary duplicate request.
// - Store the new ID.
// - Trigger fetchLogs for the selected pet.
//
// TODO: Step 9 — Implement a safe no-pet-selected render path.
//
// TODO: Step 10 — Implement fetchLogs(petId):
// - Set isLoaded to false.
// - Render "Loading care logs...".
// - Call fetchLogsForPet(petId).
// - Save the returned logs.
// - Set isLoaded to true after success.
// - Render log entries or the required empty state.
// - Render an accessible error on failure.
//
// TODO: Step 11 — Render the required empty state:
// "No care logs yet for this pet."
//
// TODO: Step 12 — Render log-fetch errors:
// - Add an element with class "error".
// - Add role="alert".
// - Show exactly: "Failed to load care logs".
//
// TODO: Step 13 — Render each log entry inside .logs-content:
// - Display a readable completion timestamp.
// - Display task name, task context, note, or other available backend data.
// - Gracefully handle missing optional values.
//
// TODO: Step 14 — Test different pet selections and confirm logs reload.
//
// TODO: Step 15 — Add a public refresh() method:
// - Reuse fetchLogs with the component's current petId.
// - Safely handle the case where petId is missing.
//
// TODO: Step 16 — Complete a task and confirm dashboard calls refresh(),
// then confirm the new backend log entry appears.
//
// TODO: Step 17 — Register the element using the exact tag name:
// "care-log".