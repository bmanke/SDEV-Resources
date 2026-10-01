---
title: "Lesson 25: Debugging Walkthrough"
description: "Notes and commented code from lesson 25."
tags: [frontend, lesson-25]
sidebar:
  order: 25
---


## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-25`
1. Move into the lesson-25/ directory:
```sh
cd lesson-25
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

- Identify and diagnose common issues in web components using DevTools and automated tests
- Apply debugging techniques including inspecting Shadow DOM, analyzing events, and verifying component state
- Write targeted tests that reveal broken behaviour in components
- Fix failing behaviour by correcting attribute handling, slot rendering, and event detail propagation

## Intentional Bugs & Debugging Walkthrough

The example `user-card` component and `main.js` script include a few **intentional bugs** for you to discover and fix. These are designed so that your tests (and DevTools) will help you identify what is wrong.

### Bug 1: Avatar attribute does not update the image

<details>
  <summary>
    <b>Symptom:</b>
    <p>Setting the <code>avatar</code> attribute on <code>&lt;user-card&gt;</code> does <b>not</b> change the image <code>src</code>, even though <code>observedAttributes</code> includes <code>avatar</code>.</p>
  </summary>
  
  **Cause:**
  `attributeChangedCallback` checks for the wrong attribute name.
  
  ```js
  static get observedAttributes() {
    return ['avatar'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Bug: name check does not match the observed attribute
    if (name === 'avatars' && this.shadowRoot) {
      const img = this.shadowRoot.querySelector('img');
      if (img) {
        img.src = newValue;
      }
    }
  }
  ```

  **Fix:**
  Update the condition to check for `'avatar'` so it matches the observed attribute.

  ```js
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'avatar' && this.shadowRoot) {
      const img = this.shadowRoot.querySelector('img');
      if (img) {
        img.src = newValue;
      }
    }
  }
  ```

  Writing a test that sets `element.setAttribute('avatar', 'some-url.png')` and then asserts on the `img.src` will expose this bug immediately.

</details>

### Bug 2: Description does not render from the `user` property

<details>
  <summary>
    <b>Symptom:</b>
    <p>When setting the <code>user</code> property (e.g., <code>card.user = { id: 'u1', name: 'Zelda', description: 'Princess of Hyrule' }</code>), the name appears correctly, but the description does <b>not</b> show up in the card.</p>
  </summary>

  **Cause:**
  The selector for the description slot is slightly wrong.

  ```js
  _renderFromUser() {
    if (this.#user) {
      // ... avatar and name logic ...
      const descSlot = this.shadowRoot.querySelector('[name="descriptions"]');
      if (descSlot) {
        descSlot.textContent = this.#user.description || '';
      }
    }
  }
  ```

  **Fix:**
  - Correct the selector so it matches the `slot` name in the template (`name="description"`).

  ```js
  const descSlot = this.shadowRoot.querySelector('[name="description"]');
  if (descSlot) {
    descSlot.textContent = this.#user.description || '';
  }
  ```

  A test that sets the `user` property and then asserts that the rendered description text matches the expected value will fail until this bug is fixed.

</details>

### Bug 3: Follow counter does not update correctly in `main.js`

<details>
  <summary>
    <b>Symptom:</b>
    <p>Clicking the Follow button on a card toggles its visual state, but the <code>#follow-counter</code> text does not change as expected.</p>
  </summary>

  **Cause:**
  The event listener in `main.js` is reading the wrong property from the custom event `detail` object.

  ```js
  main.addEventListener('follow-change', (e) => {
    // Bug: uses e.detail.isFollowed, but the event detail uses "followed"
    followedCount += e.detail.isFollowed ? 1 : -1;
    const counterEl = document.querySelector('#follow-counter');
    counterEl.textContent = `Followed: ${followedCount}`;
    console.log('follow-change:', e.detail);
  });
  ```

  The component dispatches the event like this:

  ```js
  this.dispatchEvent(new CustomEvent('follow-change', {
    detail: { id: this.getAttribute('user-id') || null, followed: this.followed },
    bubbles: true,
    composed: true,
  }));
  ```

  **Fix:**
  Update the listener to use the correct property name (`followed`).

  ```js
  main.addEventListener('follow-change', (e) => {
    followedCount += e.detail.followed ? 1 : -1;
    const counterEl = document.querySelector('#follow-counter');
    counterEl.textContent = `Followed: ${followedCount}`;
    console.log('follow-change:', e.detail);
  });
  ```

  You can also write a test for the `follow-change` event (or manually trigger it in DevTools) to confirm that the `detail` payload matches what your listener expects.

</details>

---

These intentional bugs are meant to be discovered via failing tests and by inspecting the DOM and events in DevTools:
- Write tests **first** for the expected behaviour.
- Run the tests and observe which assertions fail.
- Use the failures to guide you to the corresponding bug in the component or script.

## Student Exercise

*NOTE: if you've already completed the following from the previous lesson, use those tests to help diagnose and fix the errors described above.*

- Add a test for the `avatar` attribute, specifically, that setting this attribute will udpate the img src attribute.
- Add a test for the `user` property, specifically, that setting this attribute will update the expected slots and image elements.

## Push changes

```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 25 Example'
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
    environment: 'happy-dom', // or 'happy-dom'
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
  followedCount += e.detail.isFollowed ? 1 : -1;
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

      const descSlot = this.shadowRoot.querySelector('[name="descriptions"]');
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
    if (name === 'avatars' && this.shadowRoot) {
      console.log('Attribute changed:', name, oldValue, newValue);
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

### `__tests__/user-card.test.js`

```js title="__tests__/user-card.test.js"
// user-card.test.js
import { expect, test, describe, beforeEach, afterEach } from 'vitest';

import '../src/user-card.js'; // Import the web component definition
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

describe('UserCard', () => {
  test('renders with default properties', () => {
    // Act
    document.body.appendChild(element);

    // Assert
    expect(element.shadowRoot.querySelector('img').getAttribute('src')).toBe('https://placehold.co/80x80/0077ff/ffffff');
    expect(element.followed).toBe(false);
  });

  test('renders name and description', async () => {
    // Arrange
    const element = document.createElement('user-card');
    const nameSpan = document.createElement('span');
    nameSpan.setAttribute('slot', 'name');
    nameSpan.textContent = 'Vitest User';

    const descSpan = document.createElement('span');
    descSpan.setAttribute('slot', 'description');
    descSpan.textContent = 'A user for testing with Vitest';

    element.appendChild(nameSpan);
    element.appendChild(descSpan);

    // Act
    document.body.appendChild(element);

    // Assert the result
    const nameSlot = element.shadowRoot.querySelector('slot[name="name"]');
    const descSlot = element.shadowRoot.querySelector('slot[name="description"]');
    expect(nameSlot.assignedNodes()[0].textContent).toBe('Vitest User');
    expect(descSlot.assignedNodes()[0].textContent).toBe('A user for testing with Vitest');
  });
});
```

