---
title: "Lesson 06, Exercise 4: Parallel API Requests"
description: "Instructions and commented starter code for Lesson 06, Exercise 4: Parallel API Requests."
sidebar:
  order: 5
tags: [sdev-2150, exercises]
---

**Goal:** Demonstrate control over concurrent asynchronous operations.

### Instructions

1. Write a function that requests data from two APIs at the same time using `Promise.all()`.
2. Display both datasets after both requests succeed.
3. Use `Promise.allSettled()` to show results when one request fails.

**Key concepts:** `Promise.all()`, `Promise.allSettled()`, concurrency, error handling.

## Code

The project is a Vite app. `src/style.css` is the same shared stylesheet in all four exercises, so it is not repeated here.

### `src/main.js`

```js title="src/main.js"
// Exercise 4: Compare Promise.all() and Promise.allSettled().
// This file uses the existing <div id="app"></div> in index.html.


// Fetch an endpoint and reject on HTTP errors, invalid JSON, or unexpected data.


// Render one dataset. textContent treats API content as text, not HTML.

// Start both requests together. Promise.all() waits for both to succeed;
// if either fails, it rejects and no datasets are displayed in this mode.


// Demo: the second endpoint intentionally does not exist, so one request
// fails while the valid users request can still be displayed.

// Start by showing the successful Promise.all() case.
```

### `index.html`

```html title="index.html"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>exercise-4-parallel-api-requests</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```
