// TODO: Select Elements In JS

// TODO: Create a single function responsible for adding a task
// This function should read the current text from taskInput
// Remove leading and trailing whitespace
// Stop if the result is empty, so users cannot add blank tasks
// Create a new todo-list item element
// Put the task into that item safely as text, rather than treating it as HTML
// Add the item to your list container
// Clear the input afterward
// Optional: Put focus back in the input so the user can immediately add another task


// TODO: For each new task, attach a click handler to its "Done" control.
// When clicked toggle a CSS class on the parent task item, such as "completed".
// i.e. 'text-decoration: line-through;'


// TODO: For every new task, attach a click handler to its "Delete" button.
// When clicked identify the parent task item associated with that button.
// Remove that task item from the DOM.


// TODO: Attach a click event listener to addBtn.
// When a user clicks it, call your shared add-task function.
// Avoid putting all the task-creation logic directly inside the click listener.
// Keeping it in one function prevents you from duplicating the same logic for Enter.
// “When addBtn is clicked, run the addTask function.”


// TODO: Attach a keyboard event listener to taskInput.
// Using one function means clicking "Add" and pressing "Enter" will always behave the same.


// Common Things to Avoid
// Don’t listen for Enter on the button; listen for it on the input or, if appropriate, the form.
//
// Don’t duplicate task-adding logic in both event handlers.
//
// Don’t allow empty task items.
//
// Don’t use HTML insertion for raw user input when plain text insertion is enough;
// it can create unexpected markup or security issues.
//
// If your controls are inside a form, be deliberate about form submission.
// You can either handle the form’s submit event or prevent the
// default Enter submission in the input handler.