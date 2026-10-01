---
title: "Lesson 05: DOM Selection and Manipulation"
description: "Notes and commented code from lesson 05."
tags: [frontend, lesson-05]
sidebar:
  order: 5
---


## Install dependencies and run the dev server

1. Extract the starter zip to `lesson-05`

2. Move into the `lesson-05/` directory:
```sh
cd lesson-05
```
3. Install the necessary dependencies:
```sh
npm install
```
or
```sh
npm i
```
4. Run the dev server with the `dev` script: 
```sh
npm run dev
```
5. Open the provided development server URL in your browser
6. You should see the default render for the vite project.
7. Use this as the base for today's examples.

## Instructor Demo and Student Exercise

Complete the demo along with your instructor.

### Selecting elements

````js
// Select elements from the page using CSS selectors
const titleEl = document.querySelector('#page-title');
const taglineEl = document.querySelector('.tagline');
const heroImg = document.querySelector('#hero-img');
const heroCaption = document.querySelector('#hero-caption');
const dynamicBox = document.querySelector('#dynamic-box');
const footerNote = document.querySelector('#footer-note');

console.log('Selected elements:', { titleEl, taglineEl, heroImg, heroCaption, dynamicBox, footerNote });
````

### textContent vs innerHTML

````js
// When you need plain text use textContent
titleEl.textContent = 'DOM: Your JavaScript Window into Page Structure';

// innerHTML can insert markup — use carefully to avoid injecting untrusted content
dynamicBox.innerHTML = `
  <p class="desc">
  This block was injected with <em>innerHTML</em>. It can include <strong>markup</strong>.
  </p>
`;

// When you only need text (no markup), prefer textContent over innerText (marginal performance gain)
heroCaption.textContent = 'This caption was updated using textContent.';
````

### Attributes and inline styles

````js
// Set attributes and inline styles
heroImg.setAttribute('alt', 'A replaceable sample image');
heroImg.style.borderColor = '#0d6efd';
````

### Helper functions for reuse

````js
function updateText(selector, text) {
  const el = document.querySelector(selector);
  if (!el) {
    return console.warn('No element found for', selector);
  }
  el.textContent = text;
}

function updateHTML(selector, html) {
  const el = document.querySelector(selector);
  if (!el) {
    return console.warn('No element found for', selector);
  }
  el.innerHTML = html;
}
````

### Call helpers to perform repeated tasks

````js
updateText('.tagline', 'Selecting, reading, and modifying nodes with JavaScript.');
updateHTML('#dynamic-box', `
  <p class="desc">
  Replaced again via <code>updateHTML()</code>. Notice how we can inject different markup here.
  </p>
`);
````

### Class toggle and entity rendering

````js
footerNote.classList.add('footer-strong');
// Use innerHTML to render entities like © correctly
footerNote.innerHTML = '&copy; 2025 Front End Fundamentals';
// Try swapping textContent in for innerHTML above and see what happens
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
git commit -m 'Lesson 05 Example'
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
  <title>Lesson 05 - Intro to Document Object Model (DOM)</title>
  <script type="module" src="/src/main.js"></script>
</head>

<body>
  <header>
    <section class="hero">
      <div>
        <h1 id="page-title">Lesson 05 - Intro to Document Object Model (DOM)</h1>
        <p class="tagline">Selecting and modifying elements</p>
      </div>
      <img id="hero-img" src="/manipulation.jpg" alt="Hero image" />
      <p id="hero-caption">This caption will be updated via JavaScript.</p>
    </section>
  </header>

  <main>
    <section>
      <h2>Featured List</h2>
      <ul id="feature-list">
        <li class="feature">Fast</li>
        <li class="feature">Accessible</li>
        <li class="feature">Reliable</li>
      </ul>
    </section>

    <section>
      <h2>Dynamic Area</h2>
      <div id="dynamic-box">
        <p class="desc">This content may be replaced with <strong>innerHTML</strong>.</p>
      </div>
    </section>
  </main>

  <footer>
    <small id="footer-note">&copy;2025 SDEV1150</small>
  </footer>
</body>

</html>
```

### `src/main.js`

```js title="src/main.js"
console.log('Lesson 05 starter loaded');

// 1. Selecting elements
const title = document.querySelector('#page-title');// selecting with id
const tagline = document.querySelector('.tagline');// selecting with classname
// const tagLine = document.getElementByClassName('tagline');
const heroImg = document.querySelector('#hero-img');
const heroCaption = document.querySelector('#hero-caption');
const dynamicBox = document.querySelector('#dynamic-box');
const footerNote = document.getElementById('footer-note');
const tagName = document.getElementsByTagName('h1');
// # for id, . for classname, no symbol for tagname. (only when using query selector)
// query selector selects the first ocurence of the tag.
// to select all elements with the same classname/tagname, we use querySelectorAll
// 2. textContent vs innerHTML
title.textContent = 'Here is your DOM working.';
dynamicBox.innerHTML = `<p class = "desc"> This block was
  injected using <em> innerHTML </em>. 
  It can include <strong> markup </strong>. </p>`;
// When you only need text (no markup),
//  prefer textContent over innerText (marginal performance gain)
heroCaption.textContent = 'This caption was updated using textContent.';
// 3. Attributes & styles
heroImg.setAttribute('alt', 'A replaceable sample image'); // 'alt='A replacable sample image'
heroImg.style.borderColor = `#0d6efd`;
console.warn('name');

// 4. Create small helper functions for reuse
function updateText(selector, text) {
  const el = document.querySelector(selector);
  if (!el) {
    return console.warn('No element is found for', selector);
  }
  else {
    el.textContent = text;
  }
}
function updateHTML(selector, code) {
  const el = document.querySelector(selector);
  if (!el) {
    return console.warn('Selected tag does not exist.') 
  }
  else {
    el.innerHTML = code;
  }
}

// 5. Use helpers to perform simple tasks
updateText('.tagline', 'Selecting, reading, and modifying nodes with javascript');
updateHTML('#dynamic-box', `<p class="desc">
  Replaced again via <code>updateHTML()</code>. Notice how we can inject different markup here.
  </p>`);
// 6. Footer text tweak (demonstrate class toggle & style change)
footerNote.classList.add('footer-strong');
// Require innerHTML here to render the &copy; entity correctly
footerNote.innerHTML = '&copy; 2025 Front End Fundamentals';

// functions intro
// function definition
function greeting() {
  console.log('Welcome to the lesson-05.');
};
// function call
greeting();

// function to add two numbers
function add(a, b) {
  return a + b;
};
let sum = add(1, 2);// function call will evaluate to the sum.
console.log(sum);
console.log(add(3, 5));

function subtract(number1, number2) {
  return number1 - number2;
}
console.log(subtract(10, 9));
// function to find square of the number
console.log(2 ** 2);
function square(n) {
  return n * n;
}
console.log(square(2));
// function to check even or odd number.
function check(num) {
  if (num % 2 === 0) {
    return ('even number');
  }
  else {
    return ('number  is odd');
  }
}
console.log(check(2));
// and / or in JS
// "&&" and symbol in JS
// "||" or symbol in JS
// function to find largest number of the 3 numbers given as an input
function largest(a, b, c) {
  if (a >= b && a >= c) {
    return a;
  } else if (b >= a && b >= c) {
    return b;
  } else {
    return c;
  }
}

console.log(largest(5, 3, 3));
console.log(largest(12, 7, 20));
console.log(largest(4, 4, 2));
```

### `public/css/main.css`

```css title="public/css/main.css"
body {
  font-family: Arial, Helvetica, sans-serif;
}

:root {
  --accent: #0d6efd;
  --bg: #f6f8fa;
  --text: #222;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 2rem;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  background: var(--bg);
  color: var(--text);
}

h1,
h2 {
  margin: 0 0 0.5rem;
}

header {
  margin-bottom: 1.5rem;
}

.tagline {
  color: #555;
}

#hero-img {
  max-width: 320px;
  display: block;
  border-radius: 8px;
  margin: 0.5rem 0 0.25rem;
  border: 2px solid transparent;
}

#dynamic-box {
  border: 1px dashed #bbb;
  padding: 0.75rem;
  background: #fff;
  border-radius: 6px;
  margin-top: 0.5rem;
}

.highlight {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

.feature {
  padding: 0.25rem 0.5rem;
}

.footer-strong {
  color: var(--accent);
  font-weight: 700;
}
```

