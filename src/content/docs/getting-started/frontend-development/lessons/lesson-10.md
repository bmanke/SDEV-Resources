---
title: "Lesson 10: Forms and Submission"
description: "Notes and commented code from lesson 10."
tags: [frontend, lesson-10]
sidebar:
  order: 10
---


## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-10`
1. Move into the lesson-10/ directory:
```sh
cd lesson-10
```
2. Install the necessary dependencies:
```sh
npm install
```
or
```sh
npm i
```
3. Run the dev server with the `dev` script: 
```sh
npm run dev
```
4. Open the provided development server URL in your browser
5. You should see the default render for the vite project.
6. Use this as the base for today's examples.

## Instructor Demo and Student Exercise

Complete the demo along with your instructor and then attempt the exercise prompts (see the comments in the `main.js` file).

This lesson walks through working with forms: reading values, gathering checkbox/radio inputs, handling `submit` (preventing default navigation), and showing a structured summary of form data.

### Select required elements

````js
const form = document.querySelector('#contact-form');
const result = document.querySelector('#result');
````

### Serialize form data (gather values)

````js
function serializeForm(formEl) {
	
	// Access inputs from form.elements
	const { fullName, email, bio } = formEl.elements;

	// Radio value
	const plan = formEl.elements.plan.value;

	// Checkboxes: gather checked values
	const topics = Array.from(formEl.querySelectorAll('input[name="topics"]:checked'))
		.map(cb => cb.value);

	return {
		fullName: fullName.value.trim(),
		email: email.value.trim(),
		plan,
		topics,
		bio: bio.value.trim(),
		submittedAt: new Date().toLocaleString(),
	};
}
````

### Handle form submission (prevent page reload)

````js
form.addEventListener('submit', (event) => {
	event.preventDefault(); // stop form from navigating/reloading

	const data = serializeForm(form);

	result.textContent = 
    `Submission received:
    - Name: ${data.fullName || '(none)'}
    - Email: ${data.email || '(none)'}
    - Skill: ${data.plan || '(none)'}
    - Strengths: ${data.topics.length ? data.topics.join(', ') : '(none)'}
    - Bio: ${data.bio || '(none)'}
    - Time: ${data.submittedAt}`;
});
````

### Handle form reset (clear result area)

````js
form.addEventListener('reset', () => {
	result.textContent = 'Awaiting submission...';
});
````


| Method                       | What it does                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| `setCustomValidity(message)` | Sets a custom error message. If `message` is not empty, the field becomes invalid.                      |
| `setCustomValidity('')`      | Clears any custom error and makes the field valid again (assuming no other validation errors).          |
| `checkValidity()`            | Returns `true` if the element/form is valid, otherwise `false`. Does **not** show error messages.       |
| `reportValidity()`           | Checks validity and shows the browser's validation popup/message if invalid. Returns `true` or `false`. |
| `validity`                   | Object containing detailed validation states (`valueMissing`, `tooShort`, `patternMismatch`, etc.).     |
| `validationMessage`          | Returns the current error message for the field.                                                        |
| `willValidate`               | Returns `true` if the element participates in validation.                                               |


## Push to your GitHub workbook repo

Once you're done making your own custom updates to the project, stage your files, commit your work, and push to the remote repository.

1. Open a terminal in VS Code
2. Stage all updated and created files:
```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 10 Example'
```
4. Push your changes to the remote workbook repository: 
```sh
git push origin main
```

## Lesson Code

The complete source files for this lesson, with the instructor comments included.

### `index.html`

```html title="index.html"
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <link rel="stylesheet" href="css/main.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lesson 10 - Form Event Handling</title>
  <script type="module" src="/src/main.js"></script>
</head>

<body>
  <header>
    <h1>Lesson 10 - Form Event Handling</h1>
    <p class="muted">Submit the form without a page reload</p>
  </header>

  <main>
    <section aria-labelledby="form-title">
      <h2 id="form-title">Contact Form</h2>
      <form id="contact-form">
        <fieldset>
          <legend>Basic Info</legend>
          <label>
            Full Name
            <input type="text" name="fullName" placeholder="NAIT Student">
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="name@example.com">
          </label>
        </fieldset>

        <fieldset>
          <legend>Front End Skill Level</legend>
          <div class="group">
            <label><input type="radio" name="plan" value="junior"  checked> Junior</label>
            <label><input type="radio" name="plan" value="intermediate"> Intermediate</label>
            <label><input type="radio" name="plan" value="advanced"> Advanced</label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Skills (choose any)</legend>
          <div class="group">
            <label><input type="checkbox" name="topics" value="javascript"> JavaScript</label>
            <label><input type="checkbox" name="topics" value="css"> CSS</label>
            <label><input type="checkbox" name="topics" value="html"> HTML</label>
          </div>
        </fieldset>

        <fieldset>
          <legend>About You</legend>
          <label>
            Short Bio
            <textarea name="bio" rows="3" placeholder="A little about yourself..."></textarea>
          </label>
        </fieldset>

        <div class="actions">
          <button type="submit">Submit</button>
          <button type="reset" id="reset-btn">Reset</button>
        </div>
      </form>

      <div id="result" class="output" aria-live="polite">Awaiting submission…</div>
    </section>
  </main>
</body>

</html>
```

### `src/main.js`

```js title="src/main.js"
console.log('Lesson 10 starter loaded');

// 1. Select required elements
const form = document.querySelector('#contact-form');
const result = document.querySelector('#result');
console.log(form.elements);
// 2. Function to gather and structure form data
function serializeForm(formEl) {
  // Instructor TODO: get the name

  // Student TODO: get the email and bio
  const { fullName, email, bio } = formEl.elements; // object destructuring
  // const fullName = formEl.elements.fullName.value;
  // const email = formEl.elements.email.value;
  // const bio = formEl.elements.bio.value;
  // OPTIONAL: get the plan and topic values as well
  const plan = formEl.elements.plan.value;// getting the values of radiobuttons
  // getting checkboxes values.
  const nodeList = formEl.querySelectorAll('input[name="topics"]:checked');
  const array = Array.from(nodeList);
  const topics = array.map(cb => cb.value);
  // Array.from() converts to an array (from nodelist/htmlcollection)
  // forEach() and .map() are similar but forEach returns/runs some code. .map() always returns an array.
  return {
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    plan,
    topics,
    bio: bio.value.trim() };
  // .trim() gets rid of trailing and leading whitespaces
}

// Instructor TODO: return the fullName within an object literal
// Student TODO: add the remaining fields

// 3. Handle form submission
// Use 'submit' event on the form, not 'click' on the button
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = serializeForm(form);
  console.log(data);
  result.textContent = `
  ${data.fullName}
  ${data.bio}
  ${data.email}
  ${data.plan}
  ${data.topics}
   `
  });
// Prevent default behavior (navigation/reload) using event.preventDefault()
// Instructor TODO: display the fullName value

// Student TODO: display the remaining values

// 4. Handle form reset - reset the result area text when the form is reset
form.addEventListener('reset', () => {
  result.textContent = 'Awaiting Submission';
});
```

### `public/css/main.css`

```css title="public/css/main.css"
:root {
  --bg: #f6f8fa;
  --text: #222;
  --muted: #6b7280;
  --border: #e5e7eb;
  --accent: #0d6efd;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 2rem;
  font-family: Arial, Helvetica, sans-serif;
  background: var(--bg);
  color: var(--text);
}

h1,
h2,
legend {
  margin: 0 0 0.5rem;
}

header {
  margin-bottom: 1.25rem;
}

.muted {
  color: var(--muted);
}

form {
  display: grid;
  gap: 1rem;
  max-width: 680px;
}

fieldset {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
  background: #fff;
}

.group {
  display: grid;
  gap: 0.25rem;
  margin-top: 0.25rem;
}

input[type="text"],
input[type="email"],
textarea {
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.5rem 0.6rem;
  font-size: 1rem;
  background: #fff;
}

textarea {
  min-height: 80px;
  resize: vertical;
  width: 100%;
  margin-top: 1rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

button {
  cursor: pointer;
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: #fff;
}

button[type="submit"] {
  border-color: var(--accent);
}

.output {
  margin-top: 1rem;
  padding: 0.75rem;
  border: 1px dashed var(--border);
  border-radius: 8px;
  background: #fff;
  white-space: pre-wrap;
}
```

