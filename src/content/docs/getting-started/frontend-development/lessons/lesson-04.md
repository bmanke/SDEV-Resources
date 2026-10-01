---
title: "Lesson 04: Conditionals and Loops"
description: "Notes and commented code from lesson 04."
tags: [frontend, lesson-04]
sidebar:
  order: 4
---


## Install dependencies and run the dev server

1. Extract the starter zip to `lesson-04`
2. Move into the `lesson-04/` directory:
```sh
cd lesson-04
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

Complete the demo along with your instructor and then attempt the exercise prompts (see the Student TODO comments at the end of the `main.js` file).

### Simple if

````js
const x = 5;
if (x > 0) {
  console.log('x is positive');
}
````

### if-else

````js
if (x % 2 === 0) {
  console.log('x is even');
} else {
  console.log('x is odd');
}
````

### Nested if-else

````js
if (x > 10) {
  console.log('x is greater than 10');
} else if (x < 0) {
  console.log('x is non-positive');
} else {
  console.log('x is between 1 and 10');
}
````

### while loop

````js
let count = 3;
while (count > 0) {
  console.log('Countdown:', count);
  count = count - 1;
}
````

### do-while loop

````js
let i = 0;
do {
  console.log('i is', i);
  i++;
} while (i < 3);
````

### for loop

````js
for (let j = 0; j < 3; j++) {
  console.log(`j = ${j}`);
}
````

### Debugging practice

This small snippet includes two intentional bugs for students to find and fix. Uncomment and correct each bug as part of the exercise. Use the DevTools to help find and correct the bugs.

````js
// Snippet with bugs for debugging practice
const num = 10;

if (num < 5) {
  console.log('num is greater than 5');
} else {
  console.log('num is 5 or less');
}

let k = 0;
while (k < 3) {
  k + 1;
  console.log(k);
}
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
git commit -m 'Lesson 04 Example'
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
  <title>Lesson 04 - Debugging in the Browser</title>
  <script type="module" src="/src/main.js"></script>
</head>

<body>
  <h1>Lesson 04 - Debugging in the Browser</h1>
</body>

</html>
```

### `src/main.js`

```js title="src/main.js"
console.log('Lesson 04 starter loaded');

// Instructor TODO:
// 1. Simple if
const x = 5; // variable assignment
if (x > 0) {
  console.log('x is +ve(positive)');
};
// 2. if-else
// == and === both are comparison operators
// === strictly checks for the value with the correct data type
// 3 == "3", this is true
// 3 === "3", this is false
// == does not strictly check (it can consider converted types)
if (x % 2 === 0) { // this thrives on the logic that even numbers are divisible by 2.
  console.log('x is even');
} else {
  console.log('x is odd');
}
// 3. Nested if-else
if (x > 10) { // true is boolean true
  console.log('x is greater than 10');
} else if (x < 10) {
  console.log('x is less than 10');
} else {
  console.log('x is between 10 and 10');
}
// 4. while loop
let count = 3; // a counter
while (count > 0) { // count>0 is a condition
  console.log('Countdown:', count);
  count = count - 1;// decrementing by 1 // loop must have a breaking condition.
  // The above line could be written like this: (count -=1)
}
let counter = 10;
while (counter > 0) {
  console.log(counter);
  counter -= 1;
}

// first iteration: (value of count is 3) 3>0 true,countdown :3  3-1= 2
// second iteration : (value of count is 2) 2>0 true,countdown : 2 , 2-1=1
// third iteration: (value of count is 1) 1>0 true, countdown : 1, 1-1 = 0
// fourth iteration: 0>0 false
// try printing numbers from 1 to 10 using while loop

// 5. do-while loop
let i = 0;
// a do-while loop always runs atleast once even if the condition is false.
do {
  console.log('i is:', i);
  i++;
} while (i < 3);
// write a loop that prints numbers from 1 to 10.
let w = 1;
while (w <= 10) {
  console.log(w);
  w++;
};
// 6. for loop
for (let j = 0; j < 3; j++) {
  console.log(`j = ${j}`);
};

// Student TODO:
// 7. Snippet with bugs for debugging practice
// Snippet with bugs for debugging practice - uncomment when ready
/*
const num = 10;

if (num < 5) {
  console.log('num is greater than 5');
} else {
  console.log('num is 5 or less');
}

let k = 0;
while (k < 3) {
  k + 1;
	console.log(k);
}
*/
```

### `public/css/main.css`

```css title="public/css/main.css"
body {
  font-family: Arial, Helvetica, sans-serif;
}
```

