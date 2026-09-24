// PetPicker web component

// TODO: Implement this component using the requirements in SPECS.md
// (Implementation Details by Starter File).

// TODO: IMPLEMENT THESE STEPS IN ORDER:
//
// TODO: Step 1 — Import fetchPets from the API module.
//
// TODO: Step 2 — Create an HTML template for this component.
//
// TODO: Step 3 — In the template, add:
// - A heading with the exact text "Pets".
// - A list container using <ul class="list-group">.
// - A region for loading, empty, error, and populated content.
//
// TODO: Step 4 — Define a class that extends HTMLElement.
//
// TODO: Step 5 — In the constructor:
// - Attach an open Shadow DOM root.
// - Clone the template into the Shadow DOM.
// - Save references to the pet-list and status/output containers.
// - Initialize pets as an empty array.
// - Initialize selectedPetId as null.
// - Bind event handlers once for later cleanup.
//
// TODO: Step 6 — Render the initial loading state:
// "Loading pets..."
//
// TODO: Step 7 — Implement connectedCallback:
// - Call fetchPets asynchronously.
// - Save the successful response in the pets array.
// - Render pet rows after loading succeeds.
//
// TODO: Step 8 — When rendering each pet:
// - Include its image if supplied by the backend.
// - Display its name.
// - Display species and breed information.
// - Add data-pet-id containing the exact pet ID.
// - Make the row/control keyboard accessible.
//
// TODO: Step 9 — Implement mouse/click pet selection.
//
// TODO: Step 10 — Implement keyboard pet selection.
//
// TODO: Step 11 — When a pet is selected:
// - Save the ID as selectedPetId.
// - Update the selected visual state.
// - Dispatch a CustomEvent named "pet:selected".
// - Use event detail exactly shaped as { petId }.
// - Set bubbles: true.
// - Set composed: true.
//
// TODO: Step 12 — After a successful non-empty pet request:
// - Automatically select the first pet.
// - Dispatch pet:selected for that first pet.
//
// TODO: Step 13 — Render the required empty state:
// "No pets available."
//
// TODO: Step 14 — Render the required error state:
// - Add an element with class "error".
// - Add role="alert".
// - Show exactly: "Failed to load pets".
//
// TODO: Step 15 — Implement disconnectedCallback:
// - Remove every click, keyboard, or other listener added by this component.
//
// TODO: Step 16 — Register the element with the exact required tag name:
// "pet-picker".