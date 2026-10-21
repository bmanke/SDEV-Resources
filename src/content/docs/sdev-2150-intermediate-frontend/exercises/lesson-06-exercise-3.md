---
title: "Lesson 06, Exercise 3: Custom Event Integration"
description: "Instructions and commented starter code for Lesson 06, Exercise 3: Custom Event Integration."
sidebar:
  order: 4
tags: [sdev-2150, exercises]
---

**Goal:** Reinforce communication between decoupled components.

### Instructions

1. Create two components: `<data-fetcher>` to fetch data and `<data-display>` to render it.
2. When fetching completes, dispatch a custom event named `data-loaded` containing the data.
3. Ensure `<data-display>` listens for the event and updates the UI accordingly.
4. Choose any endpoints you like from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/).

**Key concepts:** Custom events, event dispatching, component communication.

## Code

The project is a Vite app. `src/style.css` is the same shared stylesheet in all four exercises, so it is not repeated here.

### `src/main.js`

```js title="src/main.js"
// Exercise 3: Two independent web components communicate through an event.
// This works with the existing <div id="app"></div> in index.html.

        // This component is responsible only for requesting data, not displaying it.

        // fetch() does not reject for HTTP error responses such as 404 or 500.
        
        // Parsing JSON is asynchronous and can fail if the response is invalid.
        
        // detail carries the fetched data to any component listening for it.
        // bubbles allows the event to travel up to #app, where the display listens.
        
        // Report failures separately so the display can show an error message.


        // Set up the display before the fetcher is added to the page.

        // Sibling components cannot receive each other's events directly.
        // Listen on their shared parent, which receives the fetcher's bubbling event.

        // Remove listeners if this component is taken off the page.

        // Build DOM nodes rather than placing API values in HTML strings.

        // Show an error message if the fetcher fails to get data.

// Register both custom elements before inserting them into the page.

// Add the display first so its listeners exist before fetching starts.
```

### `index.html`

```html title="index.html"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>exercise-3-custom-event-integration</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```
