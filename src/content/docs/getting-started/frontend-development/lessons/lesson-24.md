---
title: "Lesson 24: Testing with Vitest"
description: "Notes and commented code from lesson 24."
tags: [frontend, lesson-24]
sidebar:
  order: 24
---


## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-24`
1. Move into the lesson-24/ directory:
```sh
cd lesson-24
```
2. Install the necessary dependencies:
```sh
npm install
```
or
```sh
npm i
```

## Objectives

- Explain the pros and cons of automated testing
- Describe the process for applying automated tests
- Add automated tests for a web component

## Instructor Demo

### Install Required Testing Packages

Because we won't be running the tests live in the browser, we need to use a package to simulate the browser environment. Both `jsdom` and `happy-dom` provide this browser environment, with `jsdom` being a more comprehensive, but a little slow, and `happy-dom` giving up some web API completeness in exchange for speed. You can install both and then see which you like to use.

```sh
npm install -D vitest jsdom happy-dom
```

### Configure the Test Environment

```js
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // or 'happy-dom'
  },
});
```

### Add the `test` Script to `package.json`

```json
"scripts": {
  ...
  "test": "vitest",
  "test:watch": "vitest --watch"
},
```

## Writing Tests

You can now create test files (e.g., user-card.test.js) to test your web components.

1. Render the component: Use standard DOM manipulation methods within your test to create and append your web component to the document body.
2. Use `shadow-dom-testing-library` if needed
   - If your component uses a shadow DOM, you may need an external library like `@testing-library/user-event` (for user interactions) or specifically the `shadow-dom-testing-library` to interact with elements inside the shadow root.
3. Make assertions: Use Vitest's expect API to check the component's state, rendered output, or behavior.

### Create the `__tests__` Directory

```sh
mkdir __tests__
```

### Create the `__tests__/user-card.test.js` File

```js
// user-card.test.js
import { expect, test, describe } from 'vitest';
import '../src/user-card.js'; // Import the web component definition

describe('UserCard', () => {
  test('renders with default properties', () => {
    // Create an instance of the component
    const element = document.createElement('user-card');
    document.body.appendChild(element);

    // Make assertions using standard DOM APIs or Testing Library utilities
    expect(element.shadowRoot.querySelector('img').getAttribute('src')).toBe('https://placehold.co/80x80/0077ff/ffffff');
    expect(element.followed).toBe(false);

    // Clean up
    document.body.removeChild(element);
  });

  test('renders name and description', async () => {
    const element = document.createElement('user-card');
    const nameSpan = document.createElement('span');
    nameSpan.setAttribute('slot', 'name');
    nameSpan.textContent = 'Vitest User';

    const descSpan = document.createElement('span');
    descSpan.setAttribute('slot', 'description');
    descSpan.textContent = 'A user for testing with Vitest';

    element.appendChild(nameSpan);
    element.appendChild(descSpan);

    document.body.appendChild(element);

    // Assert the result
    const nameSlot = element.shadowRoot.querySelector('slot[name="name"]');
    const descSlot = element.shadowRoot.querySelector('slot[name="description"]');
    expect(nameSlot.assignedNodes()[0].textContent).toBe('Vitest User');
    expect(descSlot.assignedNodes()[0].textContent).toBe('A user for testing with Vitest');
  });
});
```

### Efficiency Updates

For common setup and teardown tasks, you can use the `beforeEach` and `afterEach` (also have `beforeAll` and `afterAll` helpers). As the names imply, you can include common setup tasks for each test in `beforeEach` and common teardown tasks for each test in `afterEach`. For our case, creating a new element and removing it from the dom are common to each test.

Update the imports:

```js
// user-card.test.js
import { ..., beforeEach, afterEach } from 'vitest';
```

Add the `beforeEach` and `afterEach` function calls, and remove the duplicate statements from the tests:

```js
// user-card.test.js
let element;

beforeEach(() => {
  // Set up a new instance of the component before each test
  element = document.createElement('user-card');
});

afterEach(() => {
  // Clean up after each test
  element.remove();
  element = null;
});
```

## Student Exercise

- Add a test for the `avatar` attribute, specifically, that setting this attribute will udpate the img src attribute.
- Add a test for the `user` property, specifically, that setting this attribute will update the expected slots and image elements.

### Stretch Challenge Exercise

- Add tests for following and unfollowing a user, both programmatically and by clicking the button.

## Common Errors & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Slotted text not updated | Tests or component code update the shadow DOM instead of the light DOM nodes that provide slot content | Update the light DOM children (elements with `slot` attributes) before attaching the host to `document.body`, or render text inside the shadow DOM. In tests, append slotted nodes (with correct `slot` values) prior to appending the component. |
| Event listener not fired in tests or app | Custom event dispatched without `bubbles`/`composed`, or listener attached on the wrong node | Dispatch events with `{ bubbles: true, composed: true }` when they must cross the shadow boundary, or attach the listener on an appropriate parent/host (use delegation when helpful). |
| Property/attribute changes ignored when set before mount | Setter relied on the element being connected (render executed only in `connectedCallback`) | Have the setter store incoming values and ensure `connectedCallback` (or later lifecycle) calls `render()`. Use `observedAttributes` + `attributeChangedCallback` to sync attributes to properties. |
| Module import or resolution errors in tests | Incorrect import path, missing export, or ESM/CJS mismatch with Vitest | Confirm test import paths are correct (e.g., `import '../src/user-card.js'`), ensure `package.json` `type` matches your module format, and configure Vitest resolve aliases if you use them. |
| Shadow DOM elements undefined in tests | Test environment missing full shadow DOM behavior or accessing nodes before render | Ensure component is registered/imported, append it to `document.body`, and await any async rendering (use `await Promise.resolve()`). Choose `jsdom` (more complete) or `happy-dom` (faster) depending on needs. |

## Push changes

```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 24 Example'
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
  <title>Lesson 21 - Web Components (Communication and State)</title>
  <script type="module" src="/src/main.js"></script>
</head>

<body>
  <header class="top-nav">
    <div class="container">
      <h1>Hyrule System Users</h1>
      <div>
        <span id="follow-counter">Followed: 0</span>
        <button id="btn-theme">🌙</button>
      </div>
    </div>
  </header>
  <main>
  </main>

</body>

</html>
```

### `vitest.config.js`

```js title="vitest.config.js"
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // or 'happy-dom'
  },
});
```

### `src/main.js`

```js title="src/main.js"
// Import the user-card component to register the custom element
import './user-card.js';

// Create an array of user objects
const users = [
  { id: 'u1', name: 'Zelda', avatar: 'assets/zelda-avatar.png', description: 'Princess of Hyrule' },
  { id: 'u2', name: 'Link', avatar: 'assets/link-avatar.png', description: 'Hero of Hyrule' },
  { id: 'u3', name: 'Mipha', description: 'Zora Champion' },
];

// Render user cards
const main = document.querySelector('main');
users.forEach((user) => {
  const card = document.createElement('user-card');
  // Set property will cause a render
  card.user = user;
  // Add the card to the page
  main.appendChild(card);
});

// External counter to track number of followed users
let followedCount = 0;

// Listen on the container (event bubbles out of shadow)
main.addEventListener('follow-change', (e) => {
  // Add one or subtract one based on follow state
  followedCount += e.detail.followed ? 1 : -1;
  // Or, use Array filter for accurate count
  // followedCount = Array.from(document.querySelectorAll('user-card')).filter(c => c.followed).length;
  const counterEl = document.querySelector('#follow-counter');
  counterEl.textContent = `Followed: ${followedCount}`;
  console.log('follow-change:', e.detail);
});

// Call follow() programmatically on first card
document.querySelector('user-card')?.follow();

// Theme toggle button logic
let dark = false;
const toggleBtn = document.querySelector('#btn-theme');
toggleBtn.addEventListener('click', () => {
  dark = !dark;
  document.documentElement.style.setProperty('--global-card-bg', dark ? '#1f2937' : '#ffffff');
  document.documentElement.style.setProperty('--global-card-color', dark ? '#e5e7eb' : '#222222');
  document.documentElement.style.setProperty('--global-card-accent', dark ? 'gold' : '#0077ff');
  toggleBtn.textContent = dark ? '☀️' : '🌙';
});
```

### `src/user-card.js`

```js title="src/user-card.js"
// Self-contained user card web component with Shadow DOM
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      --card-bg: var(--global-card-bg, #ffffff);
      --card-color: var(--global-card-color, #222222);
      --card-accent: var(--global-card-accent, #0077ff);
      display: block;
    }
    .card {
      background: var(--card-bg);
      color: var(--card-color);
      border: 1px solid #e6e6e6;
      padding: 12px;
      border-radius: 8px;
      display: flex;
      gap: 12px;
      align-items: center;
      width: 320px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    }
    .name {
      color: var(--card-accent);
      display: block;
      font-size: 1.2em;
      font-weight: bold;
      margin: 0;
    }
    .description {
      font-size: 0.9rem;
      color: #666;
      display: block;
      margin-top: 4px;
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      flex: 0 0 80px;
    }
  </style>
  
  <div class="card">
    <img src="" width="80" height="80" alt="avatar">
    <div class="info">
      <slot name="name" class="name"></slot>
      <slot name="description" class="description"></slot>
      <button>Follow</button>
    </div>
  </div>
`;
document.body.appendChild(template);

class UserCard extends HTMLElement {
  #followed = false;
  #user = null;

  constructor() {
    super();
    this.#followed = false;
    this.#user = null;
    // Bind the button handler to the custom element
    this._onButtonClick = this._onButtonClick.bind(this);

    const shadow = this.attachShadow({ mode: 'open' });
    const content = template.content.cloneNode(true);
    this._img = content.querySelector('img');
    this._btn = content.querySelector('button');
    shadow.appendChild(content);
  }

  _renderFromUser() {
    if (this.#user) {
      if (this.#user.avatar) {
        this._img.src = this.#user.avatar;
      } else {
        this._img.src = 'https://placehold.co/80x80/0077ff/ffffff';
      }

      this.setAttribute('user-id', this.#user.id || '');
      const nameSlot = this.shadowRoot.querySelector('[name="name"]');
      if (nameSlot) {
        nameSlot.textContent = this.#user.name || '';
      }

      const descSlot = this.shadowRoot.querySelector('[name="description"]');
      if (descSlot) {
        descSlot.textContent = this.#user.description || '';
      }
    }
  }

  set user(obj) {
    this.#user = obj;
    this._renderFromUser();
  }

  get user() {
    return this.#user;
  }

  _onButtonClick() {
    this._setFollow(!this.#followed);
  }

  connectedCallback() {
    this._btn.addEventListener('click', this._onButtonClick);

    if (this.#user) {
      this._renderFromUser();
    } else {
      const avatar = this.getAttribute('avatar');
      if (avatar) {
        this._img.src = avatar;
      } else {
        this._img.src = 'https://placehold.co/80x80/0077ff/ffffff';
      }
    }
  }

  disconnectedCallback() {
    this._btn.removeEventListener('click', this._onButtonClick);
  }

  follow() {
    this._setFollow(true);
  }

  unfollow() {
    this._setFollow(false);
  }

  get followed() {
    return this.#followed;
  }

  _setFollow(value) {
    this.#followed = value;
    this._btn.textContent = this.#followed ? 'Following' : 'Follow';
    this.dispatchEvent(new CustomEvent('follow-change', {
      detail: { id: this.getAttribute('user-id') || null, followed: this.followed },
      bubbles: true,
      composed: true,
    }));
  }

  // Respond to attribute changes if needed in the future
  static get observedAttributes() {
    return ['avatar'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'avatar' && this.shadowRoot) {
      const img = this.shadowRoot.querySelector('img');
      if (img) {
        img.src = newValue;
      }
    }
  }
}

customElements.define('user-card', UserCard);

export default UserCard;
```

### `public/css/main.css`

```css title="public/css/main.css"
body {
  font-family: Arial, Helvetica, sans-serif;
}

main {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
  align-items: flex-start;
}

#btn-theme {
  font-size: 1.2rem;
  background: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
}

.top-nav {
  width: 100%;
  background: #1f2937;
  color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
}

.top-nav .container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* pushes counter to far right */
  gap: 12px;
}

.top-nav h1 {
  font-size: 1.05rem;
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.2px;
}

#follow-counter {
  font-weight: 700;
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  padding: 6px 10px;
  border-radius: 8px;
  min-width: 96px;
  text-align: right;
}
```

### `__test__/user-card.test.js`

```js title="__test__/user-card.test.js"
import { expect, test, describe} from 'vitest';
import '../src/user-card.js'; // import  the web component definition

describe('UserCard', () => {
  test('renders with default properties', () => {
    // create an instance
    const element = document.createElement('user-card');
    document.body.appendChild(element);
    expect(element.followed).toBe(false);
    expect(element.shadowRoot.querySelector('img').getAttribute('src')).toBe('https://placehold.co/80x80/0077ff/ffffff');
    // cleanup
    document.body.removeChild(element);
})
  test('', () => {
    
  })
});
```

