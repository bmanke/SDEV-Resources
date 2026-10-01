---
title: "Lesson 06, Exercise 1: API Data Display Component"
description: "Instructions and commented starter code for Lesson 06, Exercise 1: API Data Display Component."
sidebar:
  order: 2
tags: [sdev-2150, exercises]
---

**Goal:** Combine asynchronous data fetching with dynamic rendering.

### Instructions

1. Build a `<user-list>` component that retrieves and displays users from the [users endpoint](https://jsonplaceholder.typicode.com/users).
2. Add a **Reload Data** button that triggers a new fetch when clicked.
3. Display loading and error states to improve the user experience.

**Key concepts:** `fetch()`, `async`/`await`, DOM updates, event handling.

## Code

The project is a Vite app. `src/style.css` is the same shared stylesheet in all four exercises, so it is not repeated here.

### `src/main.js`

```js title="src/main.js"
// Define a custom HTML element that can be used as <user-list>.

        // Give this component its own DOM so its styles and content stay isolated.

        // Keep references to elements that will change as data is fetched.

        // Keep a stable function reference so the listener can be removed later.

    // Runs when <user-list> is added to the page.
    // Load users automatically the first time.

    // Clean up the button listener if the component is removed from the page.

        // Show a loading state and prevent repeated clicks while the request runs.

            // await pauses this method until fetch returns an HTTP response.

            // fetch only rejects for request failures; HTTP errors need this check.

            // Convert the response body from JSON into a JavaScript value.

            // Create an <li> for each user. textContent inserts API values as text,
            // rather than interpreting them as HTML.

            // Replace the list contents with the newly fetched users.

            // Network failures, HTTP errors, and invalid JSON all arrive here.

            // Always re-enable Reload Data, whether the request succeeds or fails.

// Register the class so the browser recognizes <user-list> in HTML.
```

### `index.html`

```html title="index.html"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>exercise-1-api-data-display-component</title>
  </head>
  <body>
    <div id="app">
      <user-list></user-list>
    </div>
  <script type="module" src="/src/main.js"></script>
  </body>
</html>
```
