---
title: "Lesson 06 — DOM Worksheet: Accessing & Manipulating Elements"
description: "Course resource: Lesson 06 — DOM Worksheet: Accessing & Manipulating Elements"
---

Practice selecting DOM elements, reading/changing their content, toggling
classes, handling events, and creating/removing nodes.

**How to use:** Try each problem on your own first. A small starter HTML
snippet is given where helpful. Write your JavaScript, test it in the browser,
then check your answer against the **Solutions** section at the bottom.

---

## Problem 1 — Select by ID and change text

```html
<h1 id="title">Old Title</h1>
```

Select the `<h1>` and change its text to `"New Title"`.

---

## Problem 2 — Select by class and change style

```html
<p class="note">Read me</p>
```

Select the paragraph using its class and make its text color red.

---

## Problem 3 — Select multiple elements

```html
<ul id="fruits">
	<li>Apple</li>
	<li>Banana</li>
	<li>Cherry</li>
</ul>
```

Select **all** `<li>` elements inside `#fruits` and log how many there are
to the console.

---

## Problem 4 — Loop over a NodeList

Using the same list from Problem 3, add the text `" (fruit)"` to the end of
every list item's existing text.

---

## Problem 5 — Change an attribute and a style

```html
<img
	id="photo"
	src="manipulation.jpg"
	alt="placeholder" />
```

Select the image, change its `alt` text to `"A sample image"` using
`setAttribute`, and give it a blue border using `.style`.

---

## Problem 6 — Replace content with innerHTML

```html
<div id="box">
	<p>Old content</p>
</div>
```

Replace the inside of `#box` with new markup using `innerHTML` — for example a
paragraph that contains a `<strong>` word.

---

## Problem 7 — Create and append a new element

```html
<ul id="colors">
	<li>Red</li>
	<li>Green</li>
</ul>
```

Create a new `<li>` with the text `"Blue"` and append it to `#colors`.

---

## Problem 8 — Remove an item using DOM relationships

```html
<ul id="scores">
	<li>10</li>
	<li>20</li>
	<li>30</li>
</ul>
```

Remove the **first** `<li>` using `firstElementChild` and `removeChild`. Then
add `" (top score)"` to the new first item's text.

---

## Problem 9 — Add a class to an element

```html
<p id="status">Pending</p>
```

Add the `highlight` class to `#status` using `classList.add`.

---

## Problem 10 — Add an item after a delay (timer)

```html
<ul id="notifications"></ul>
```

Using `setTimeout`, create a new `<li>` with the text `"New notification!"` and
append it to `#notifications` after 2 seconds.

---

---

# ✅ Solutions

### Solution 1

```js
const title = document.getElementById('title');
title.textContent = 'New Title';
```

### Solution 2

```js
const note = document.querySelector('.note');
note.style.color = 'red';
```

### Solution 3

```js
const items = document.querySelectorAll('#fruits li');
console.log(items.length); // 3
```

### Solution 4

```js
const items = document.querySelectorAll('#fruits li');
items.forEach((li) => {
	li.textContent += ' (fruit)';
});
```

### Solution 5

```js
const photo = document.getElementById('photo');
photo.setAttribute('alt', 'A sample image');
photo.style.border = '3px solid #0d6efd';
```

### Solution 6

```js
const box = document.getElementById('box');
box.innerHTML = `<p>New content with <strong>markup</strong>.</p>`;
```

### Solution 7

```js
const colors = document.getElementById('colors');
const li = document.createElement('li');
li.textContent = 'Blue';
colors.appendChild(li);
```

### Solution 8

```js
const scores = document.getElementById('scores');
scores.removeChild(scores.firstElementChild);
scores.firstElementChild.textContent += ' (top score)';
```

### Solution 9

```js
const status = document.getElementById('status');
status.classList.add('highlight');
```

### Solution 10

```js
const notifications = document.getElementById('notifications');

setTimeout(() => {
	const li = document.createElement('li');
	li.textContent = 'New notification!';
	notifications.appendChild(li);
}, 2000);
```

---

### Quick reference

| Task                    | Method                                           |
| ----------------------- | ------------------------------------------------ |
| Select one by id        | `document.getElementById("id")`                  |
| Select first match      | `document.querySelector(".class")`               |
| Select all matches      | `document.querySelectorAll("selector")`          |
| Read/change text        | `el.textContent`                                 |
| Replace markup          | `el.innerHTML = "<p>...</p>"`                    |
| Change an attribute     | `el.setAttribute("alt", "...")`                  |
| Change inline style     | `el.style.color = "red"`                         |
| Add/remove/toggle class | `el.classList.add/remove/toggle("name")`         |
| Create element          | `document.createElement("li")`                   |
| Add to page             | `parent.appendChild(child)`                      |
| DOM relationships       | `el.firstElementChild` / `el.nextElementSibling` |
| Remove a child          | `parent.removeChild(child)`                      |
| Run code later          | `setTimeout(fn, ms)`                             |

