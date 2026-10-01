---
title: "Lesson 16: Fetching Data from an API"
description: "Notes and commented code from lesson 16."
tags: [frontend, lesson-16]
sidebar:
  order: 16
---


## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-16`
1. Move into the lesson-16/ directory:
```sh
cd lesson-16
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

### 2. Inspect the Database File

A database file named `db.json` has been provided for you:

```json
{
  "books": [
    { "id": "1", "title": "The Legend of Hyrule", "author": "Zelda", "year": 2020, "genre": "Fantasy" },
    { "id": "2", "title": "The Hero’s Journey", "author": "Link", "year": 2022, "genre": "Adventure" },
    { "id": "3", "title": "Chronicles of Ganon", "author": "Ganondorf", "year": 2021, "genre": "Epic" }
  ]
}
```

### 3. Start the API Server

Run the dev server with the `api-server` script:

```sh
npm run api-server
```

You should see routes listed like:
- http://localhost:3000/books  
- http://localhost:3000/books/1  

Keep this running while working in your project.

## Inspect the Index page

In the `index.html` file, you will see the interface is fairly simple. It consists only of a heading, a `form` for adding new books, and a `button` with `ul` for rendering the fetched books to the page.

## Instructor Demo

Working alongside your instructor, you will create and call async functions to interact with the backend API server. A simple function to fetch data will be created followed by an event handler for the form to post new data to the server.

### Build Utility Functions

To keep our concerns separate, create a `utils.js` file for the API functions

In this file, export a function for fetching data; it should not be specific to the application context we're woring in (i.e., does not presume 'books'). The function requires only the desired endpoint as a parameter.

```js
// utils.js
export async function fetchData(endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Network response failed');
  }
  const data = await response.json();
  return data;
}
```

> **Note that exception handling is not done here. The calling application will be responsible for handling any exceptions that may occur during API calls.**

Also export a function that can be used to post data.

```js
// utils.js
export async function postData(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Network response failed');
  }

  const data = await response.json();
  return data;
}
```

This function requires additional headers to be set as we can't rely on the defaults.

### Build the App

Now that we have funtions available to work with the backend, we can use them in our application.

Import both functions into `main.js`:

```js
// main.js
import { fetchData, postData } from './utils';
```

And then select all the required elements:

```js
// main.js
const loadButton = document.getElementById('loadBooks');
const addForm = document.getElementById('addBook');
const list = document.getElementById('bookList');
```

We will also create an `endpoint` constant to use in our API function calls:
```js
// main.js
const endpoint = 'http://localhost:3000/books';
```

#### Add Event Listeners

The application provides two features: loading existing books and creating new books. First, add the load handler function. This function will fetch the books collection and render each book to the page.

```js
// main.js
async function loadHandler() {
  list.innerHTML = '<li>Loading...</li>';

  try {
    const books = await fetchData(endpoint);

    list.innerHTML = '';

    books.forEach((book) => {
      const li = document.createElement('li');
      li.textContent = `${book.title} by ${book.author}`;
      list.appendChild(li);
    });
  } catch (error) {
    list.innerHTML = `<li style="color:red;">Error: ${error.message}</li>`;
  }
}
```

Connect the handler to the `loadButton`:

```js
// main.js
loadButton.addEventListener('click', loadHandler);
```

Next, add the submit handler function. This function will gather data from the form and post the request to the backend.

```js
// main.js
async function submitHandler(e) {
  e.preventDefault(); // never reload the page
  const form = e.target;
  // Use the FormData API to collect form data
  // NOTE: this example lacks form validation, which should be implemented
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data['year'] = Number(data.year); // convert year to number

  try {
    await postData(endpoint, data);

    // Call loadHandler to refresh the list
    loadHandler();
  } catch (error) {
    // TODO: Display a better error for the user
    console.error('Error submitting form:', error);
  }
}
```

Connect the handler to the `addForm`:

```js
// main.js
addForm.addEventListener('click', submitHandler);
```

You should now be able to load and add books.

## Student Exercise

Extend the example by adding functionality to **DELETE** a selected book.

**Hint:** Use an additional button or link on each rendered book to trigger the operation.

## Common Errors & Fixes

| Issue | Cause | Solution |
|-------|--------|-----------|
| `TypeError: Failed to fetch` | JSON Server not running | Start the server (`npx json-server --watch db.json --port 3000`) |
| CORS error | Using `file://` path | Run your page through `vite` (`npm run dev`) |
| Empty list | API returned no data | Check `db.json` contents |
| Error message shows on screen | Network or code issue | Inspect console for detailed error |

## Push to Your GitHub Workbook Repo

Once you're done making your own custom updates to the project, stage your files, commit your work, and push to the remote repository.

1. Open a terminal in VS Code
2. Stage all updated and created files:
```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 16 Example'
```
4. Push your changes to the remote workbook repository: 
```sh
git push origin main
```

## Exercise

### Lesson 16 Student Exercise: Update Existing Books

Now that you've worked with the `fetch` API for fetching and adding books, it's time to apply what you've learned by extending the functionality of the app.

#### Objective
Update the example so that you can load the details for an existing book and update it.

#### Requirements

1. Add a read-only field to the existing form for book ids (new books won't have an id). 
   
2. Add a link or button to the rendered list of books that, when clicked, will send a request for the individual book and load its data into the form.
3. If an existing book has been selected and loaded into the form, submitting the form should update (`PATCH`) the book using the API server.
4. **Test and troubleshoot your solution**

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
      "title": "The Hero's Journey",
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
      "title": "gdgf",
      "author": "fgdfg",
      "year": 2012,
      "genre": "Epic",
      "id": "6LVZTpO_3Zc"
    },
    {
      "title": "gfg",
      "author": "gjfgj",
      "year": 2014,
      "genre": "Fantasy",
      "id": "5PNA2G5Yaus"
    }
  ],
  "$schema": "./node_modules/json-server/schema.json"
}
```

### `src/main.js`

```js title="src/main.js"
// Import the functions necessary to make the API calls
import { fetchData, postData } from './utils';
// Select the necessary DOM elements
const loadButton = document.getElementById('loadBooks');
const addForm = document.getElementById('addBook');
const list = document.getElementById('bookList');
// Define the API endpoint
const endpoint = 'http://localhost:3000/books';
// Define a function to handle loading and displaying the list of books
async function loadHandler() {
  list.innerHTML = '<li> Loading...</li>';
  try {
    const books = await fetchData(endpoint);
    list.innerHTML = '';

    books.forEach((book) => {
      const li = document.createElement('li');
      li.textContent = ` ${book.title} by ${book.author}`;
      list.appendChild(li);
    });
  }
  catch (error) {
    list.innerHTML = `<li style = "color:red;"> Error : ${error.message}</li>`;
  }
}
loadButton.addEventListener('click', loadHandler);
// Define a function to handle form submission for adding a new book
async function submitHandler(e) {
  e.preventDefault();// never reload the webpage
  const form = e.target; // For Submit event, e.target refers to form
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data['year'] = Number(data.year); // convert year to number
  try {
    await postData(endpoint, data);
    loadHandler();
  }
  catch (error) {
    console.error('Error submitting form:', error);
  }
}
// Attach event listeners to the button and form
addForm.addEventListener('submit', submitHandler);
// TODO: Add delete functionality
```

### `src/utils.js`

```js title="src/utils.js"
// Fetch utility function
export async function fetchData(endpoint) {
  const response = await fetch(endpoint); // fetch(endpoint) is the fetchAPI part
  if (!response.ok) {
    throw new Error('Network response failed');
  }
  const data = response.json();
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
  }); // fetch(endpoint) is the fetchAPI part
  if (!response.ok) {
    throw new Error('Network response failed');
  }
  const data = response.json();
  return data;
}

// TODO: Add DELETE function here
export async function deleteData(endpoint) {
  const response = await fetch(endpoint, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Network response failed');
  }

  return await response.json();
};
// PATCH
export async function patchData(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Network response failed');
  }

  return await response.json();
};
// PUT
export async function putData(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Network response failed');
  }

  return await response.json();
};
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

