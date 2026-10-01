---
title: "Lesson 18: CRUD with an API"
description: "Notes and commented code from lesson 18."
tags: [frontend, lesson-18]
sidebar:
  order: 18
---


## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-18`
1. Move into the lesson-18/ directory:
```sh
cd lesson-18
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

## Start the API (JSON Server)

A `db.json` file is provided with a books collection (same theme as Lesson 15/18).

Start JSON Server:

```sh
npm run api-server
# or
npx json-server --watch db.json --port 3000
```

Verify that the routes are working as expected in the browser:
- http://localhost:3000/books
- http://localhost:3000/books/1

Keep this running while working in your project.

## Inspect the UI

Open `index.html`. The page has:
- A Load Books button to fetch and render books
- A Quick Add form to POST a new book (title + author)
- A list `<ul id="bookList">` that renders results

You'll notice odd behaviours (empty list, errors, "Promise" showing on the page, duplicate renders). That's by design.

## Instructor Demo

### Check Operability of the Application

Follow this flow before changing any code:
1. Open DevTools --> Network (if you are working in a browser other than Chrome, you should be able to find and update similar settings)
    - Enable `Preserve log` and `Disable cache`
    - Filter on `Fetch/XHR`
1. Click "Load Books" button
    - What request was sent? URL? Status?
    - If 404/500, open the Response and Preview tabs
1. Open DevTools --> Console
    - Any uncaught (promise) errors? Warnings?
1. Open DevTools --> Sources
    - Click Pause on exceptions (and Pause on caught exceptions if needed)
    - Try "Load Books" again. Where does execution pause?
1. Submit the "Add Book" form (no validation yet)
    - Check Network: is it POST /books? Status code? Body sent?

### Known Bugs List

**Bug A - Wrong endpoint (404)**

Symptom: GET /book --> 404 (typo)
Where: `main.js` in the ndpoint string
Fix: Use the correct route: `http://localhost:3000/books`
Why: JSON Server routes are pluralized collections by default. Spelling matters.

**Bug B — Missing await (renders `[object Promise]` or nothing at all)**

Symptom: UI shows "Promise" or doesn’t render data
Where: `main.js` `const books = fetchData(endpoint);` used without `await`
Fix:

```js
const books = await fetchData(endpoint);
```

Why: `fetchData()` returns a `Promise`; you must await it.

**Bug C — Not checking response.ok (silent failures)**

Symptom: 404/500 still goes to `json()` and throws cryptic errors
Where: `utils.js` fetch and post functions
Fix:

```js
const response = await fetch(url);
if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}
const data = await response.json();
```

Why: Always guard `json()` behind an ok check.

**Bug D — Unhandled promise rejection**

Symptom: Console warns about unhandled Promise rejection when API is down
Where: `main.js` Async functions lacking try/catch
Fix:

```js
try {
  // fetch...
} catch (error) {
  console.error(error);
  showError('Unable to reach the API. Is it running?');
}
```
Why: Async/await errors must be caught to avoid silent failures.

**Bug E — Double-click race / duplicate renders**

Symptom: Rapid clicks produce duplicate requests or conflicting states
Where: `main.js` load button handler
Fix:

Disable while in-flight, re-enable when done:

```js
loadBtn.disabled = true;
try {
  const books = await fetchData(endpoint);
  ...
} finally {
  loadBtn.disabled = false;
}
```

Why: Prevent overlapping requests and non-deterministic UI.

**Bug F — Wrong body or headers on `POST`**

Symptom: 400 Bad Request or 500 Internal Server Error from JSON Server
Where: `utils.js` post function
Fix:

Ensure valid JSON and headers:

```js
await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', },
  body: JSON.stringify(payload),
});
```
Why: JSON Server requires `Content-Type: application/json` and a valid JSON body.

## Student Exercise

Complete the following, in order:
1. Reproduce each bug (A–F) and capture proof in DevTools:
    - Network request + status
    - Console error message or pause stack
1. Fix bugs A–F one by one.
1. Add one more improvement of your choice:
    - Add a Delete button per list item (with optimistic UI or re-load)
    - Show a "No results" message when API returns []
    - Add basic retry (e.g., retry once on a network error)
    - Debounce the Load Books button to avoid rapid repeats

## Common Errors & Fixes

| Issue | Cause | Solution |
|-------|--------|-----------|
| `TypeError: Failed to fetch` | JSON Server not running/wrong port| Start the server (`npx json-server --watch db.json --port 3000`) |
| CORS error | Using `file://` path | Run your page through `vite` (`npm run dev`) |
| Empty list | API returned no data | Check `db.json` contents |
| Error message shows on screen | Network or code issue | Inspect console for detailed error |
|JSON parse error|Calling json() on non-2xx response|Guard with if (!res.ok) throw|
|Promise in UI|Missing await|const data = await res.json()|
|Duplicate list items|Multiple concurrent requests|Disable button during load; debounce|

## Push to Your GitHub Workbook Repo

Once you're done making your own custom updates to the project, stage your files, commit your work, and push to the remote repository.

1. Open a terminal in VS Code
2. Stage all updated and created files:
```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 18 Example'
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
  <title>Lesson 16 - Async JavaScript and Fetch API</title>
  <script type="module" src="/src/main.js"></script>
</head>

<body>
  <h1>Async JavaScript and Fetch API</h1>
  <form id="addBook">
    <fieldset>
      <legend>Add Book</legend>
      <div class="form-control">
        <label for="title">Title</label>
        <input type="text" name="title" />
      </div>
      <div class="form-control">
        <label for="Author">Author</label>
        <input type="text" name="author" />
      </div>
      <div class="form-control">
        <label for="year">Year</label>
        <input type="number" name="year" />
      </div>
      <div class="form-control">
        <label for="Genre">Genre</label>
        <select name="genre">
          <option value="Adventure">Adventure</option>
          <option value="Epic">Epic</option>
          <option value="Fantasy">Fantasy</option>
        </select>
      </div>
      <div class="form-control">
        <button type="submit">Add</button>
      </div>
    </fieldset>
  </form>
  <div class="form-control">
    <button class="primary" id="loadBooks">Load Books</button>
  </div>
  <ul id="bookList"></ul>
</body>

</html>
```

### `db.json`

```json title="db.json"
{
  "books": [
    {
      "id": "1",
      "title": "The Legend of Hyrule",
      "author": "Zelda",
      "year": 2020,
      "genre": "Fantasy"
    },
    {
      "id": "2",
      "title": "The Hero’s Journey",
      "author": "Link",
      "year": 2022,
      "genre": "Adventure"
    },
    {
      "id": "3",
      "title": "Chronicles of Ganon",
      "author": "Ganondorf",
      "year": 2021,
      "genre": "Epic"
    },
    {
      "id": "6996",
      "title": "",
      "author": "",
      "year": 0,
      "genre": "Adventure"
    },
    {
      "id": "acb5",
      "title": "xfgx",
      "author": "frgd",
      "year": 2341,
      "genre": "Epic"
    }
  ]
}
```

### `src/main.js`

```js title="src/main.js"
import { fetchData, postData } from './utils';

const loadButton = document.getElementById('loadBooks');
const addForm = document.getElementById('addBook');
const list = document.getElementById('bookList');
const endpoint = 'http://localhost:3000/books';

async function loadHandler() {
  list.innerHTML = '<li>Loading...</li>';

  loadButton.disabled = true;
  try {
    const books = await fetchData(endpoint);

    // Simulate a delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 2000));

    list.innerHTML = '';

    books.forEach((book) => {
      const li = document.createElement('li');
      li.textContent = `${book.title} by ${book.author}`;
      list.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    list.innerHTML = `<li style="color:red;">Error: ${error.message}</li>`;
  } finally {
    loadButton.disabled = false;
  }
}

async function submitHandler(e) {
  e.preventDefault(); // never reload the page
  const form = e.target;
  const formData = new FormData(form);

  const title = (formData.get('title') || '').trim();
  const author = (formData.get('author') || '').trim();

  if (!title || !author) {
    console.error('Validation error. Please provide both title and author:', {
      title,
      author,
    });
    // TODO: Display a better error for the user
    return;
  }

  const data = Object.fromEntries(formData.entries());
  data['year'] = Number(data.year); // convert year to number

  try {
    await postData(endpoint, data);

    // Call loadHandler to refresh the list
    await loadHandler();
    // Reset the form
    form.reset();
  } catch (error) {
    // TODO: Display a better error for the user
    console.error('Error submitting form:', error);

  }
}

loadButton.addEventListener('click', loadHandler);
addForm.addEventListener('submit', submitHandler);
```

### `src/utils.js`

```js title="src/utils.js"
// Fetch utility function
export async function fetchData(endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`HTTP ${response.status} - ${text || response.statusText}`);
  }
  const data = await response.json();
  return data;
}

// POST utility function
export async function postData(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`HTTP ${response.status} - ${text || response.statusText}`);
  }

  const data = await response.json();
  return data;
}
```

### `public/css/main.css`

```css title="public/css/main.css"
body {
  font-family: Arial, Helvetica, sans-serif;
}

form fieldset {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.form-control {
  padding: 0.5rem;
  margin: 0.5rem 0;
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
}

.form-control label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: bold;
}

.form-control input,
.form-control select {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

.form-control button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-control button:hover {
  background-color: #0056b3;
}

button.primary {
  background-color: green;
}

button.primary:hover {
  background-color: darkgreen;
}

#bookList {
  list-style-type: none;
  padding: 0;
}

#bookList li {
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
}

#bookList li:last-child {
  border-bottom: none;
}
```

