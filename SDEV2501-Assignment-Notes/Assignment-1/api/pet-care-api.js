// TODO: Implement API utilities using SPECS.md
// (Implementation Details by Starter File).

// Required exports: fetchPets, fetchTasksForPet, fetchLogsForPet,
// createCareLogEntry.

// Read the backend URL from import.meta.env.VITE_API_URL after copying
// .env.example to .env.

// TODO: IMPLEMENT THESE API STEPS IN ORDER:
//
// TODO: Step 1 — Copy .env.example to .env if you have not done so already.
//
// TODO: Step 2 — Set VITE_API_URL in .env to the local backend URL supplied
// by your instructor/project.
//
// TODO: Step 3 — Read backend/README.md before writing any endpoint URLs.
// Identify the pets route, per-pet tasks route, per-pet logs route, and
// care-log-creation route/method/body.
//
// TODO: Step 4 — Keep every backend fetch request in this file.
// Components must import these functions instead of calling fetch directly.
//
// TODO: Step 5 — Use import.meta.env.VITE_API_URL consistently as the
// backend base URL.
//
// TODO: Step 6 — In every API function, check response.ok before treating
// the request as successful or parsing/returning its data.
//
// TODO: Step 7 — Parse successful responses as JSON.
//
// TODO: Step 8 — For any network or HTTP failure, throw an Error using the
// exact required error-message prefix for that function.

// TODO: Step 9 — Implement and test fetchPets first.
// pet-picker cannot display or select pets until this works.
export const fetchPets = async () => {
  // TODO: Request the pets endpoint using VITE_API_URL.
  //
  // TODO: Return the pets array from the parsed JSON response.
  //
  // TODO: If the request or response fails, throw an Error beginning:
  // "Error fetching pets: "
  throw new Error('TODO: implement fetchPets');
};

// TODO: Step 10 — Implement and test fetchTasksForPet second.
// care-task-list depends on this function after dashboard assigns petId.
export const fetchTasksForPet = async () => {
  // TODO: Add petId as a parameter to this existing function.
  //
  // TODO: Build the appropriate endpoint for the supplied pet ID.
  //
  // TODO: Return the parsed tasks array.
  //
  // TODO: If the request or response fails, throw an Error beginning:
  // "Error fetching tasks: "
  throw new Error('TODO: implement fetchTasksForPet');
};

// TODO: Step 11 — Implement and test fetchLogsForPet third.
// care-log depends on this function after dashboard assigns petId.
export const fetchLogsForPet = async () => {
  // TODO: Add petId as a parameter to this existing function.
  //
  // TODO: Build the appropriate endpoint for the supplied pet ID.
  //
  // TODO: Return the parsed logs array.
  //
  // TODO: If the request or response fails, throw an Error beginning:
  // "Error fetching logs: "
  throw new Error('TODO: implement fetchLogsForPet');
};

// TODO: Step 12 — Implement and test createCareLogEntry last.
// care-task-list uses this only after task rendering and selection work.
export const createCareLogEntry = async () => {
  // TODO: Add petId and payload as parameters to this existing function.
  //
  // TODO: The payload needs to include taskId.
  //
  // TODO: Use the backend-defined HTTP method and endpoint.
  //
  // TODO: Send a JSON request body and appropriate JSON headers.
  //
  // TODO: Return the newly created care-log object from the parsed response.
  //
  // TODO: If the request or response fails, throw an Error beginning:
  // "Error creating care log entry: "
  throw new Error('TODO: implement createCareLogEntry');
};

// TODO: Step 13 — Test each export before connecting the full interface:
// - Successful response.
// - Non-OK HTTP response.
// - Backend unavailable.
// - Invalid or missing pet ID where applicable.