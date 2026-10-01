---
title: "Lesson 06: DOM Relationships and Timers"
description: "Notes and commented code from lesson 06."
tags: [frontend, lesson-06]
sidebar:
  order: 6
---


## Setup the lesson example

Create a new vanilla project using the following command:

```sh
npm create vite@latest lesson-06 -- --template vanilla
```

## Install dependencies and run the dev server

1. Move into the lesson-06/ directory:
```sh
cd lesson-06
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

### Selecting elements (including the feature list)

````js
const titleEl = document.querySelector('#page-title');
const taglineEl = document.querySelector('.tagline');
const heroImg = document.querySelector('#hero-img');
const heroCaption = document.querySelector('#hero-caption');
const dynamicBox = document.querySelector('#dynamic-box');
const footerNote = document.querySelector('#footer-note');

// new for Lesson 06
const featureList = document.querySelector('#feature-list');

console.log('Selected elements:', { titleEl, taglineEl, heroImg, heroCaption, featureList, dynamicBox, footerNote });
````

### Add a new list item dynamically

````js
const li = document.createElement('li');
li.className = 'feature';
li.textContent = 'Flexible';
featureList.appendChild(li);
````

### Retrieve all list items and update their text

````js
const features = document.querySelectorAll('.feature');
features.forEach((li, idx) => {
	li.textContent = `${idx + 1}. ${li.textContent}`;
});
````

### Remove the first item and update neighbors

````js
// remove the first element
featureList.removeChild(featureList.firstElementChild);

// update the second item using nextElementSibling
featureList.firstChild.nextElementSibling.textContent += ' (updated)';
````

### Move the last item to the front

````js
const last = featureList.removeChild(featureList.lastChild);
featureList.insertBefore(last, featureList.firstChild);
````

### Add an item after a delay using a timer

````js
setTimeout(() => {
	const newLi = document.createElement('li');
	newLi.className = 'feature';
	newLi.textContent = 'I am new! (added after 3 seconds)';
	featureList.appendChild(newLi);
}, 3000);
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
git commit -m 'Lesson 06 Example'
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
  <title>Lesson 06 - Dynamic Content</title>
  <script type="module" src="/src/main.js"></script>
</head>

<body>
  <header>
    <section class="hero">
      <div>
        <h1 id="page-title">
          <title>Lesson 06 - Dynamic Content</title>
        </h1>
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
console.log('Lesson 06 starter loaded');

// Selecting elements
const titleEl = document.querySelector('#page-title');
const taglineEl = document.querySelector('.tagline');// query selector selects the first occurence only
const heroImg = document.querySelector('#hero-img');
const heroCaption = document.querySelector('#hero-caption');
const dynamicBox = document.querySelector('#dynamic-box');
const footerNote = document.querySelector('#footer-note');

// 1. Create a new variable for the feature list element
const featureList = document.getElementById('feature-list');

// 3. Modify list content
const li = document.createElement('li');// <li></li>
li.className = 'feature';// <li class = 'feature'></li>
li.textContent = 'Flexible';// <li class = 'feature'>Flexible</li>
// 4. Add a new item dynamically
featureList.appendChild(li);// This adds the child "li" to the html document

// 2. Add feature list to the displayed elements below
console.log('Selected elements:', {
  titleEl, taglineEl, heroImg, heroCaption, dynamicBox, footerNote,
});

// 5. Retreive all list items (querySelectorAll) and update their text
const features = document.querySelectorAll('.feature');
console.log(features);
features.forEach((li, idx) => {
  li.textContent = `${idx + 1}. ${li.textContent}`;
}
);
// ()=>{} arrow functions are not named and usually limited to a particular block of code

// 6. Removing the first item from the list using DOM relationships to find it
// .removeChild: removes the element from the children of the parent node

featureList.removeChild(featureList.firstElementChild);

// 7. Update the second item using nextElementSibling
featureList.firstElementChild.nextElementSibling.textContent += `(updated)`;
// 8. Move the last item to the front of the list
const last = featureList.removeChild(featureList.lastChild);
// insertBefore(<the element to be inserted, the location where you want to insert)
featureList.insertBefore(last, featureList.firstChild);

// 9. Use a timer to add a new item after 3 seconds have passed
setTimeout(() => {
  const newElement = document.createElement('li');
  newElement.className = 'feature';
  newElement.textContent = `added after 3 secs`;
  featureList.appendChild(newElement);
}, 3000);// 3000 miliseconds = 3 secs.
// **** THE FOLLOWING IS EXISTING CODE FROM LESSON 05

// textContent vs innerHTML
titleEl.textContent = 'DOM: Your JavaScript Window into Page Structure';

dynamicBox.innerHTML = `
  <p class="desc">
    This block was injected with <em>innerHTML</em>. It can include <strong>markup</strong>.
  </p>
`;

heroCaption.textContent = 'This caption was updated using textContent.';

// Attributes & styles
heroImg.setAttribute('alt', 'A replaceable sample image');
heroImg.style.borderColor = '#0d6efd';

// Create small helper functions for reuse
function updateText(selector, text) {
  const el = document.querySelector(selector);
  if (!el) return console.warn('No element found for', selector);
  el.textContent = text;
}

function updateHTML(selector, html) {
  const el = document.querySelector(selector);
  if (!el) return console.warn('No element found for', selector);
  el.innerHTML = html;
}

// Use helpers to perform simple tasks
updateText('.tagline', 'Selecting, reading, and modifying nodes with JavaScript.');
updateHTML('#dynamic-box', `
  <p class="desc">
    Replaced again via <code>updateHTML()</code>. Notice how we can inject different markup here.
  </p>
`);

// Footer text tweak (demonstrate class toggle & style change)
footerNote.classList.add('footer-strong');
// Require innerHTML here to render the &copy; entity correctly
footerNote.innerHTML = '&copy; 2025 Front End Fundamentals';
```

### `public/css/main.css`

```css title="public/css/main.css"
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
  padding: 0 2rem;
  font-family: Arial, Helvetica, sans-serif;
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
  color: #ddd;
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

.hero {
  position: relative;
  width: 100%;
  margin: 0 auto 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero #hero-img {
  width: 100vw;
  max-width: 100vw;
  height: 30em;
  display: block;
  object-fit: cover;
  margin: 0;
  border-radius: 0;
  border: none;
  border-bottom: 0.5em solid var(--accent);
}

.hero div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.5rem;
  text-align: center;
  width: max-content;
  z-index: 2;
}

.footer-strong {
  color: var(--accent);
  font-weight: 700;
}
```

