---
title: "Lesson 08: Events"
description: "Notes and commented code from lesson 08."
tags: [frontend, lesson-08]
sidebar:
  order: 8
---


## Rename the starter folder to to lesson-08/

## Install dependencies and run the dev server

1. Move into the `lesson-08/` directory:
```sh
cd lesson-08
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

### Load event and readiness

> NOTE: while it's possible to delay script execution until the `DOMContentLoaded` event has fired, if the script is loaded using `async`, `defer`, or `type="module"` attributes, it's unnecessary.

````js
// Wrap behavior in DOMContentLoaded to ensure elements exist
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  // Add your event listeners and DOM code here
});
````

### Selecting required elements

````js
const btnToggle = document.querySelector('#btn-toggle');
const btnMessage = document.querySelector('#btn-message');
const message = document.querySelector('#message');
const hoverCard = document.querySelector('#hover-card');
const hoverStatus = document.querySelector('#hover-status');
const keyOutput = document.querySelector('#key-output');
const list = document.querySelector('#list');
const selection = document.querySelector('#selection');
````

### `click` event: toggle a highlight class on the body

````js
btnToggle.addEventListener('click', () => {
  document.body.classList.toggle('highlight');
  const on = document.body.classList.contains('highlight');
  btnToggle.textContent = on ? 'Highlight is ON' : 'Highlight is OFF';
});
````

### `click` event: change message text

````js
btnMessage.addEventListener('click', () => {
  const timeString = new Date().toLocaleTimeString();
  message.textContent = `Message updated at ${timeString}`;
});
````

### `mouseover` and `mouseout` events: display hover status on the card

````js
hoverCard.addEventListener('mouseover', () => {
  hoverStatus.textContent = 'Status: Hovering';
});
hoverCard.addEventListener('mouseout', () => {
  hoverStatus.textContent = 'Status: Not hovering';
});
````

### `keydown` event: show last key pressed

````js
document.addEventListener('keydown', (e) => {
  keyOutput.textContent = `Last key: ${e.key} (code: ${e.code})`;
});
````

### Event delegation: one listener on the `<ul>` for all `<li>` elements

Event delegation is a simple pattern where you attach one event listener to a common ancestor (for example a `<ul>`) rather than adding the same listener to each child (`<li>`). Because most DOM events bubble up from the originating element to its ancestors, the parent can catch the event and determine which child triggered it (using `event.target` or `event.target.closest()`). This makes delegation a great fit for lists, tables, or any container where items are added or removed dynamically.

````js
list.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    // Remove previous selection
    const prev = e.target.querySelector('li.active');
    if (prev) {
      prev.classList.remove('active');
    }
    // Activate clicked
    e.target.classList.add('active');

    const id = e.target.getAttribute('data-id');
    selection.textContent = `Selected: Item ${id}`;
  }
});
````

## Push to your GitHub workbook repo

Once you're done making your own custom updates to the project, stage your files, commit your work, and push to the remote repository.

1. Open a terminal in VS Code
2. Stage all updated and created files:
```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 08 Example'
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
  <title>Lesson 08 - Intro to Event-Driven Applications</title>
  <script type="module" src="/src/main.js" ></script>
</head>

<body>
  <header>
    <h1 id="page-title">Lesson 08 - Intro to Event-Driven Applications</h1>
    <p class="tagline">Click, hover, and type to trigger UI updates.</p>
  </header>

  <main>
    <section>
      <h2 id="sec-click">Click</h2>
      <button id="btn-toggle">Toggle Highlight</button>
      <button id="btn-message">Change Message</button>
      <p id="message">Initial message…</p>
    </section>

    <section>
      <h2 id="sec-hover">Mouseover / Mouseout</h2>
      <div id="hover-card" class="card">
        <img src="/javascript-logo.png" alt="Sample" width="180" height="180" />
        <p class="hint">Hover over this card</p>
        <p id="hover-status" class="muted">Status: none</p>
      </div>
    </section>

    <section>
      <h2 id="sec-key">Keydown</h2>
      <p class="muted">Type anywhere on the page.</p>
      <div id="key-output" class="output">Last key: (none)</div>
    </section>

    <section>
      <h2 id="sec-delegate">Event Delegation</h2>
      <ul id="list" class="list">
        <li data-id="1">Item 1</li>
        <li data-id="2">Item 2</li>
        <li data-id="3">Item 3</li>
      </ul>
      <div id="selection" class="output">Selected: (none)</div>
    </section>
  </main>

  <footer>
    <small id="footer-note">&copy;2025 Front End Fundamentals</small>
  </footer>
</body>

</html>
```

### `src/main.js`

```js title="src/main.js"
console.log('Lesson 08 starter loaded');

// 1. load event (document ready) - NOTE this is unnecessary if using `defer` in the script tag or using module type
window.addEventListener('DOMContentLoaded', () => { // (type of the event, ()=>{})
  console.log('DOM fully loaded');
  // add your DOM logic and event listeners here
});
// 2. Selecting elements
const btnToggle = document.querySelector('#btn-toggle');
const btnMessage = document.getElementById('btn-message');
const message = document.getElementById('message');
const hoverCard = document.querySelector('#hover-card');
const hoverStatus = document.querySelector('#hover-status');
const keyOutput = document.getElementById('key-output');
const list = document.querySelector('#list');
const selection = document.getElementById('selection');

// 3. click: toggle a highlight class on the body
btnToggle.addEventListener('click', () => {
  console.log('button is clicked');
});
btnToggle.addEventListener('click', () => {
  document.body.classList.toggle('highlight');// toggle turns the highlight on and off every time the button is clicked
  const on = document.body.classList.contains('highlight');// contains checks if highlight is there as a class or not returns true/false based on highlight class being there or not.
  btnToggle.textContent = on ? 'Highlight is on' : 'highlight is off';// ternary operator checks if the value of variable on is true or not, if true returns the first entry (the one before the column)
});
// 4. click: change message textContent (no HTML parsing)
btnMessage.addEventListener('click', () => {
  const timeString = new Date().toLocaleTimeString();// saves the current time as a string
  message.textContent = `Message updated at ${timeString}`;
});
// 5. mouseover / mouseout: display hover status on the card
hoverCard.addEventListener('mouseover', () => {
  hoverStatus.textContent = 'Status: Hovering';
});
hoverCard.addEventListener('mouseout', () => {
  hoverStatus.textContent = 'not Hovering';
});
// 6. keydown: show last key pressed (global listener)
document.addEventListener('keydown', (e) => { // indicating the use of event object
  keyOutput.textContent = `Last key: ${e.key} (code: ${e.code})`;
});
// 7. Event delegation: one listener on the <ul> for all <li> elements
list.addEventListener('click', (event) => {
  const element = event.target; // event.target refers to the particular element that was clicked
  const tag = element.tagName; // same as event.target.tagName
  // tagName displays the name of the tag in uppercase
  console.log(tag);
  if (tag === 'LI') {
    const prev = event.target.querySelector('li.active');
    // remove existing styles
    if (prev) {
      prev.classList.remove('active');
    }
    event.target.classList.add('active');// add styles to the particular event that is clicked
    const id = event.target.getAttribute('data-id');
    selection.textContent = `Selected : Item ${id}`;
  } // is the click on li tag (true) or not (false)
});
```

### `public/css/main.css`

```css title="public/css/main.css"
:root {
  --accent:#0d6efd; 
  --bg: #f6f8fa;
  --text: #222;
  --muted: #6b7280;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0.5rem;
  padding: 2em;
  font-family: Arial, Helvetica, sans-serif;
  background: var(--bg);
  color: var(--text);
}

h1,
h2,
section {
  margin: 0 0 0.5rem;
}

header {
  margin-bottom: 1.5rem;
}

.tagline {
  color: var(--muted);
}

button {
  margin: 0.25rem 0.5rem 0.5rem 0;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d0d7de;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
}

.card {
  display: inline-block;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  padding: 0.75rem;
  background: #fff;
}

.highlight {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

.output {
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  background: #fff;
  border: 1px dashed #d0d7de;
}

.list {
  list-style: none;
  padding-left: 0;
  display: grid;
  gap: 0.25rem;
}

.list li {
  padding: 0.4rem 0.6rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
}

.list li.active {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.15);
}

.muted {
  color: var(--muted);
}
```

