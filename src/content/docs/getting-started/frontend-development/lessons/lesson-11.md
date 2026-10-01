---
title: "Lesson 11: Form Validation"
description: "Notes and commented code from lesson 11."
tags: [frontend, lesson-11]
sidebar:
  order: 11
---


## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-11`
1. Move into the lesson-11/ directory:
```sh
cd lesson-11
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

This lesson builds on form handling from the previous lesson and focuses on validation: how to check inputs as users type, provide helpful messages, and validate everything again on submit.

### Review updates to `index.html` - HTML 5 validation

The `index.html` file has been updated to make use of the default HTML 5 validation attributes. In this case, the `required` attribute has been added to the `fullName` and `email` inputs.

```html
<fieldset>
  <legend>Basic Info</legend>
  <label>
    Full Name
    <input type="text" name="fullName" placeholder="NAIT Student" required>
  </label>
  <label>
    Email
    <input type="email" name="email" placeholder="name@example.com" required>
  </label>
</fieldset>
```

If you try to submit the form as it is, with empty fleids, the browser will prevent submission and display browser formatted error messages (typically in a small tooltip-like popup). There are a number of additional attributes you can use to take advantage of the browser's validation capabilities. You can read more about them on the MDN site [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation).

### Add live validation on `input` events

````js
form.addEventListener('input', (e) => {
  const target = e.target;

  // fullName: require at least two words
  if (target.name === 'fullName') {
    const nameParts = target.value.trim().split(' ');
    if (nameParts.length < 2) {
      target.setCustomValidity('Full Name must contain at least two words.');
    } else {
      target.setCustomValidity('');
    }
  }

  // bio: minimum length of 40 chars
  if (target.name === 'bio') {
    if (target.value.trim().length < 40) {
      target.setCustomValidity('Bio must be at least 40 characters long.');
    } else {
      target.setCustomValidity('');
    }
  }

  // email: basic '@' check (optional: replace with regex)
  if (target.name === 'email') {
    if (!target.value.includes('@')) {
      target.setCustomValidity('Email must contain an "@" symbol.');
    } else {
      target.setCustomValidity('');
    }
  }

  // Show the browser's validation message for the specific field
  target.reportValidity();
});
````

### Check for valid inputs on form submission

````js
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const data = serializeForm(form);

  if (form.checkValidity()) {
    result.textContent = `
    Submission received:
    - Name: ${data.fullName}
    - Email: ${data.email}
    - Bio: ${data.bio}
    - Plan: ${data.plan}
    - Topics: ${data.topics}
  `;
});
````

## Tips

- Keep validation logic in small, reusable functions so you can call the same checks from both the `input` handler and your submit flow.
- Use `target.setCustomValidity('...')` to set a helpful message for a specific field, and call `target.reportValidity()` to show it immediately while the user types.
- On submit, use `form.checkValidity()` to quickly detect builtin constraint failures, but run your custom validators for rules that HTML attributes don't cover before accepting the data.
- Test different invalid inputs in the browser (empty fields, too-short text, malformed emails, unchecked required checkboxes) and observe the messages. This helps you design clearer validation and user feedback.
- Optional: add the `novalidate` attribute to the `<form>` to disable browser popups and build your own validation UI (useful when you need custom styling or custom accessibility behavior).

## Student exercise 
**Implement a `novalidate` flow with custom UI**

1. Update the `<form>` in `index.html` to include the `novalidate` attribute to disable the browser's default popups.
2. Create a small custom UI for field errors (for example, a `<div class="error" data-for="fieldName"></div>` under each input).
3. Write a reusable validator function (or functions) that returns an error message when a field is invalid, or an empty string when valid.
4. Call those validators from the `input` event to show/hide the per-field error UI in real time, and call them again on `submit` to validate the submission flow.
5. On submit, if all validators pass, show a success message in the `result` area; otherwise, set focus on the first invalid field.

**Hints**

- Use `document.querySelector('<error-selector>')` or `element.nextElementSibling` to find the error container for a field.
- Keep the UI simple. Show a red message under the input and add an `.invalid` class to the input when there's an error.
- Try empty required fields, too-short bios, and malformed emails to confirm your custom messages appear.

### Acceptance criteria

- The browser's native popups are disabled (via `novalidate`) and all validation messages are shown in your custom UI.
- Validation runs on both `input` (live feedback) and `submit` (final check).
- Your validators are small and reusable (same code can be used from both places).

## Push to your GitHub workbook repo

Once you're done making your own custom updates to the project, stage your files, commit your work, and push to the remote repository.

1. Open a terminal in VS Code
2. Stage all updated and created files:
```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 11 Example'
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
  <title>Lesson 11 - HTML Form Validation</title>
  <script type="module" src="/src/main.js"></script>
</head>

<body>
  <header>
    <h1>Lesson 11 - HTML Form Validation</h1>
    <p class="muted">Validate various form fields</p>
  </header>

  <main>
    <section aria-labelledby="form-title">
      <h2 id="form-title">Contact Form</h2>
      <form id="contact-form">
        <fieldset>
          <legend>Basic Info</legend>
          <label>
            Full Name
            <input type="text" name="fullName" placeholder="NAIT Student" required>
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="name@example.com" required>
          </label>
        </fieldset>

        <fieldset>
          <legend>Front End Skill Level</legend>
          <div class="group">
            <label><input type="radio" name="plan" value="junior" checked> Junior</label>
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
console.log('Lesson 11 starter loaded');

const form = document.querySelector('#contact-form');
const result = document.querySelector('#result');

function serializeForm(formEl) {
  const fullNameValue = formEl.elements.fullName.value;
  const emailValue = formEl.elements.email.value;
  const bioValue = formEl.elements.bio.value;

  const planValue = formEl.elements.plan.value;
  let topicValue = '';
  formEl.elements.topics.forEach((el) => {
    if (el.checked) {
      topicValue += `${el.value} `;
    }
  });

  return {
    fullName: fullNameValue,
    email: emailValue,
    bio: bioValue,
    plan: planValue,
    topics: topicValue,
  };
}

form.addEventListener('submit', (e) => {
  e.preventDefault();// webpage never reloads and doesnt submit data to the server

  const data = serializeForm(form);

  // Student TODO: Add validation logic to the form, ensure all fields are valid before allowing submission
  // HINT: see the 'input' event listener below for examples of validation logic. Perhaps
  // you can reuse some of that code here to validate all fields on submit, or create validation
  // functions that can be reused in both places.

  // OPTIONAL - use the following alongside the `novalidate` form attribute
  // to trigger built-in HTML validation
  // if (form.checkValidity()) {
  if (form.checkValidity()) {
    result.textContent = `
    Submission received:
    - Name: ${data.fullName}
    - Email: ${data.email}
    - Bio: ${data.bio}
    - Plan: ${data.plan}
    - Topics: ${data.topics}
  `;
  }
});

form.addEventListener('reset', () => {
  result.textContent = 'Awaiting submission...';
});

// 1. Add validation logic to the form on 'input' events
form.addEventListener('input', (event) => {
  const target = event.target;
  // 1.1 custom validation for fullName (must contain two words)
  if ((target.name) === 'fullName') {
    const nameParts = target.value.trim().split(' '); // holds an array
    if (nameParts.length < 2) {
      target.setCustomValidity('Full name must contain atleast 2 words.');
    } else {
      target.setCustomValidity(''); // clearing the error message
    }
  }
  // 1.2 custom validation for bio (minimum length = 40 words)
  if ((target.name) === 'bio') {
    const bio = target.value.trim().split(' '); // holds an array
    if (bio.length < 40) {
      target.setCustomValidity('Full name must contain atleast 40 words.');
    } else {
      target.setCustomValidity(''); // clearing the error message
    }
  }
  // 1.3 custom validation for email (basic '@' symbol check)
  if (target.name === 'email') {
    if (!target.value.includes('@')) {
      target.setCustomValidity('Email must contain @ symbol.');
    } else {
      target.setCustomValidity('');
    }
  }
  // 1.4 report the validity status to the user
  target.reportValidity();
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

