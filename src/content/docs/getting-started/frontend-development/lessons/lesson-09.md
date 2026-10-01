---
title: "Lesson 09: Event Propagation and Delegation"
description: "Notes and commented code from lesson 09."
tags: [frontend, lesson-09]
sidebar:
  order: 9
---


## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-09`
1. Move into the lesson-09/ directory:
```sh
cd lesson-09
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

This lesson demonstrates event propagation (bubbling vs capture), how to stop propagation, and using event delegation to build a small image viewer (gallery). Follow the short, incremental snippets below during the live demo and run the page after each change.

### Propagation demo - Selecting required elements

````js
const log = document.getElementById('log');
const outer = document.getElementById('outer');
const inner = document.getElementById('inner');
const button = document.getElementById('btn-propagate');
````

### Propagation demo - Add listeners (outer, inner, button)

````js
// Outer div - named function
function outerClick() {
	log.textContent += 'Outer clicked | ';
}

outer.addEventListener('click', outerClick);

// Inner div - anonymous function (bubbling)
inner.addEventListener('click', function () {
	log.textContent += 'Inner clicked | ';
});

// Button - stops propagation so outer/inner don't receive the click
button.addEventListener('click', (event) => {
	log.textContent += 'Button clicked | ';
});
````

### Gallery demo - Selecting elements

````js
const thumbnails = document.querySelector('.thumbnails');
const mainImage = document.getElementById('main-image');
const viewer = document.querySelector('.viewer');
const closeBtn = document.getElementById('close-viewer');
````

### Gallery demo - Delegated thumbnail clicks

````js
thumbnails.addEventListener('click', (event) => {
	// Only handle clicks on thumbnail images
	if (event.target.tagName === 'IMG') {
		mainImage.src = event.target.src;
		viewer.classList.add('show');
	}
});
````

### Gallery demo - Close viewer

````js
closeBtn.addEventListener('click', () => {
	viewer.classList.remove('show');
});
````

## Student Exercise 

Update the example by adding the ability for the user to close the viewer with by pressing the escape key.

## Push to your GitHub workbook repo

Once you're done making your own custom updates to the project, stage your files, commit your work, and push to the remote repository.

1. Open a terminal in VS Code
2. Stage all updated and created files:
```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 9 Example'
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
  <title>Lesson 09 - Event-Driven UI Demo</title>
  <script type="module" src="/src/main.js"></script>
</head>

<body>
  <header>
    <h1>Lesson 09 - Event-Driven UI Demo</h1>
  </header>

  <main>
    <section id="propagation-demo">
      <h2>Event Propagation</h2>
      <div id="outer" class="box">
        Outer Div
        <div id="inner" class="box">Inner Div
          <button id="btn-propagate">Click Me</button>
        </div>
      </div>
      <p id="log"></p>
    </section>

    <section id="gallery">
      <h2>Image Gallery</h2>
      <div class="thumbnails">
        <img src="/assets/gallery/road-trip1.jpg" alt="Image 1" data-id="1" />
        <img src="/assets/gallery/road-trip2.jpg" alt="Image 2" data-id="2" />
        <img src="/assets/gallery/road-trip3.jpg" alt="Image 3" data-id="3" />
      </div>
      <div class="viewer">
        <img id="main-image" src="/assets/gallery/road-trip1.jpg" alt="Main display" />
        <button id="close-viewer">Close</button>
      </div>
    </section>
  </main>
</body>

</html>
```

### `src/main.js`

```js title="src/main.js"
console.log('Lesson 10 starter loaded');

// ============== Propagation demo
// 1. Select requireded elements
const outer = document.getElementById('outer');
const inner = document.getElementById('inner');
const button = document.getElementById('btn-propagate');
const log = document.getElementById('log');
// 2. Add event listeners
function outerClick() {
  log.textContent += 'Outer div is clicked |';
}

// 2.1 Outer div - using a named function
outer.addEventListener('click', outerClick);
// 2.2 Inner div - using an anonymous function
inner.addEventListener('click', function () {
  log.textContent += 'Inner div is clicked |';
});
// 2.3 Button - using an arrow function
button.addEventListener('click', () => {
  log.textContent += 'Button is clicked |';
});
// ============== Gallery demo

// 1. Select required elements
const thumbNails = document.querySelector('.thumbnails');
const mainImage = document.getElementById('main-image');
const viewer = document.querySelector('.viewer');
const closeBtn = document.getElementById('close-viewer');
// 2. Add event listeners

// 2.1 Thumbnails container - using an arrow function
thumbNails.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    mainImage.src = e.target.src;
    viewer.classList.add('show');
  }
});
// 2.2 Close button - using an arrow function
closeBtn.addEventListener('click', () => {
  viewer.classList.remove('show');
});
// Student TODO: Add event listener to document, which closes
// the viewer when the Escape key is pressed

// object/ list destructuring
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a);
console.log(b);

let colors = ['red', 'green', 'blue', 'black', 'white'];
[colors[0], colors[4]] = [colors[4], colors[0]]; 
console.log(colors);
const color = ['white', 'green', 'blue', 'black', 'red'];
const [first, second, third, ...extraColors] = color; // array destructuring
console.log(extraColors);
console.log(first);
console.log(second);
console.log(third);

const person1 = {
  name: 'SpongeBob',
  gender: 'male',
  age: '40' };
const person2 = {
  name: 'SquarePants',
  gender: 'female',
  age: '30' };
console.log(person2.age);

const { age, name, gender } = person2; // object destructuring
console.log(name);
console.log(age);
console.log(gender);
// function displayPerson(name, age, gender){

// }
// displayPerson(name, age, gender);
console.log(thumbNails);
console.log(mainImage);
```

### `public/css/main.css`

```css title="public/css/main.css"
body {
  margin: 2rem;
  font-family: Arial, Helvetica, sans-serif;
}

h1,
h2 {
  margin-bottom: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.box {
  padding: 1rem;
  border: 2px solid #ccc;
  border-radius: 0.25rem;
  margin: 0.5rem;
}

#log {
  margin-top: 1rem;
  font-style: italic;
}

.thumbnails img {
  width: 80px;
  margin: 0.25rem;
  cursor: pointer;
}

.viewer {
  margin-top: 1rem;
  display: none;
  position: relative;
}

.viewer.show {
  display: block;
}

.viewer img {
  max-width: 300px;
}

.viewer #close-viewer {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
}
```

