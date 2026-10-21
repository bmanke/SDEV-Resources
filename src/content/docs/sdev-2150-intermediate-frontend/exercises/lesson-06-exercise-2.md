---
title: "Lesson 06, Exercise 2: Chained Promise Sequence"
description: "Instructions and commented starter code for Lesson 06, Exercise 2: Chained Promise Sequence."
sidebar:
  order: 3
tags: [sdev-2150, exercises]
---

**Goal:** Practice sequential asynchronous logic using Promise chaining.

### Instructions

1. Fetch a list of posts from the [posts endpoint](https://jsonplaceholder.typicode.com/posts).
2. Use the first post's ID to fetch its comments from `https://jsonplaceholder.typicode.com/comments?postId={id}`.
3. Display the post title and its comments dynamically.
4. Handle network or parsing errors gracefully.

**Key concepts:** Promise chaining, sequential fetches, error handling.

## Code

The project is a Vite app. `src/style.css` is the same shared stylesheet in all four exercises, so it is not repeated here.

### `src/main.js`

```js title="src/main.js"
// This file works with the existing <div id="app"></div> in index.html.

// Create the page elements once; the API data will be inserted later.

// Keep the HTTP check and JSON parsing in one place for both requests.
// fetch() can fulfill even when the server responds with an HTTP error.

    // response.json() returns a Promise and may reject if the JSON is invalid.

    // Step 1: Request the posts and convert the response to JavaScript data.
            // Stop the chain if the API did not return a usable first post.

            // Step 2: Start the comments request only after the posts are available.
            // Returning its Promise makes the next .then() wait for its result.

            // Use textContent so API text is displayed instead of treated as HTML.

            // Build each comment as DOM elements, then add them to the list.

            // Network errors, HTTP failures, invalid JSON, and unexpected data
            // all end up here instead of leaving the page stuck on "Loading".

// Start the sequence as soon as the module runs.
```

### `index.html`

```html title="index.html"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>exercise-2-chained-promise-sequence</title>
  </head>
  <body>
    <div id="app">
      <loadPostAndComments></loadPostAndComments>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```
