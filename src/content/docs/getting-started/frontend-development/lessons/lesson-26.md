---
title: "Lesson 26: Browser DevTools"
description: "Notes and commented code from lesson 26."
tags: [frontend, lesson-26]
sidebar:
  order: 26
---


## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-26`
1. Move into the lesson-26/ directory:
```sh
cd lesson-26
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

- Use the Sources panel to set breakpoints, step through code execution, and inspect variables.
- Use the Application panel to explore storage and assets for the running app.
- Capture and inspect Memory snapshots to reason about DOM nodes and potential leaks.
- Record and analyze a Performance profile to identify what runs when you interact with the page.
- Run a Lighthouse report and interpret the main performance and accessibility signals.

## App overview

This starter includes two main JavaScript files:
- `src/user-card.js`
  Defines a &lt;user-card&gt; web component that:
  - Renders an avatar image and "Follow" button inside a Shadow DOM.
  - Tracks internal followed state.
  - Dispatches a follow-change custom event when the follow state changes.
  - Accepts a user property, which includes id, name, avatar, and description.

- `src/main.js`
  Bootstraps the example app:
  - Imports and registers &lt;user-card&gt;.
  - Creates an array of user objects and renders one &lt;user-card&gt; per user.
  - Listens for follow-change events on the &lt;main&gt; element and updates a "Followed: X" counter.
  - Implements a theme toggle button that changes CSS custom properties on document.documentElement.

You'll use the DevTools panels to see how all of this behaves at runtime.

## Instructor Demo

### Sources Panel - Breakpoints and Call Stack

**Goal:** Ppause execution in `user-card.js` and inspect what's going on inside the component.

1. Open DevTools and go to the Sources panel.
2. Locate `src/user-card.js` in the file navigator.
3. Scroll to the `_setFollow` method:
    ```js
    _setFollow(value) {
      this.#followed = value;
      this._btn.textContent = this.#followed ? 'Following' : 'Follow';
      this.dispatchEvent(new CustomEvent('follow-change', {
        detail: { id: this.getAttribute('user-id') || null, followed: this.followed },
        bubbles: true,
        composed: true,
      }));
    }
    ```
4. Set a breakpoint on the first line inside `_setFollow`.
5. In the page, click the Follow button on one of the cards.
6. Point out:
    - Execution pauses at the breakpoint.
    - The Call Stack shows how the browser got here, including `_onButtonClick`.
    - The Scope panel shows local variables and private fields.
7. Step over a few lines to show how `#followed` and `this._btn.textContent` change.

*Optional extra:* Set a breakpoint in `main.js` inside the `follow-change` event listener to show how the event bubbles out of the Shadow DOM.

### Application Panel - Storage and Assets

Even though this app doesn't use storage yet, the Application panel is still useful.
1. Switch to the Application panel.
2. View:
    - The Manifest and Service Workers sections, if present.
    - The Frames section and Storage options.
3. In the Console, run:
    ```js
    localStorage.setItem('devtools-demo-theme', 'darkMode');
    sessionStorage.setItem('demo-user', 'Zelda');
    ```
4. Refresh the Application -> Storage -> Local Storage / Session Storage views and show:
    - Keys and values now appear.
    - You can edit or delete storage entries directly from DevTools.
5. Think of how this feature mighte be used for a theme toggle or user preferences.

### Memory Panel - Heap Snapshots

**Goal:** A brief intro for how to reason about memory usage.
1. Open the Memory panel.
2. Select Heap snapshot.
3. Click Take snapshot with the app in its initial state.
4. Interact with the page:
    - Follow and unfollow users.
    - Toggle the theme a few times.
5. Take another snapshot.
6. Point out:
    - The total size and number of objects.
    - That DOM nodes and JS objects for the cards appear in the snapshot.
    - You can compare snapshots to look for unexpected growth in a real app.

This exploration is about getting familiar with the tool, not diagnosing a real leak here.

### Performance Panel - Recording User Interactions

**Goal:** Capture and inspect what happens when the user clicks or toggles things.
1. Go to the Performance panel.
2. Click Start recording.
3. On the page:
    - Click a few Follow buttons.
    - Toggle the theme button several times.
4. Stop recording.
5. Walk through the result:
    - The Summary at the top.
    - The flame chart timeline.
    - The main thread activity and how JS function calls appear.
6. Zoom into a region where you clicked the Follow button and connect it back to `_setFollow` and the event listener in `main.js`.

### Lighthouse - Quick Audit

**Goal:** Run a simple audit to see performance and accessibility hints.
1. Open the Lighthouse panel.
2. Choose:
    - Mode: Navigation.
    - Device: Desktop.
    - Categories: at least Performance and Accessibility.
3. Click Analyze page load.
4. Once the report is generated, inspect:
    - Overall scores.
    - A couple of specific recommendations.
    - How small changes in HTML, CSS, or JS can impact these scores.

## Student Exercise

Work through the following tasks, using the same app and DevTools panels.
1. Sources - Debug the follow counter
    - Set a breakpoint in `main.js` inside the `follow-change` event listener:
      ```js
      main.addEventListener('follow-change', (e) => {
        // breakpoint here
        followedCount += e.detail.followed ? 1 : -1;
        const counterEl = document.querySelector('#follow-counter');
        counterEl.textContent = `Followed: ${followedCount}`;
        console.log('follow-change:', e.detail);
      });
      ```
    - Click Follow and step through the code.
    - Inspect e.detail, followedCount, and counterEl.
    - Answer: what value does followedCount have before and after the line that updates it?
2. Sources - Inspect Shadow DOM behavior
    - In `user-card.js`, set a breakpoint in `_renderFromUser`.
    - Refresh the page so the app recreates the cards and hits that code.
    - Inspect the `this.#user` object and `this._img`.
    - Compare `this.#user.name` to what you see in the rendered card on the page. Do you actually see the name and description? Why or why not, based on what `_renderFromUser` is doing?
3. Application - Experiment with storage
    - In the Console, store the current theme in localStorage:
      ```js
      localStorage.setItem('user-card-theme', 'dark');
      ```
    - In the Application panel, verify the key and value under Local Storage.
    - Change the value in DevTools and read it back in the console:
      ```js
      localStorage.getItem('user-card-theme');
      ```
4. Memory - Snapshot and compare
    - Take a heap snapshot with no interactions.
    - Follow all users, toggle the theme five times, and take another snapshot.
    - Compare the snapshots and look for:
      - The total JS heap size.
      - Node counts for DOM elements.
    - Answer: did the number of DOM nodes change in a way that surprises you?
5. Performance - Record a "Follow all" action
    - Start a new Performance recording.
    - Quickly click Follow on each card.
    - Stop the recording and zoom into your click interactions.
    - Find:
      - The tasks associated with your clicks.
      - Any obvious long-running script segments.
6. Lighthouse - Identify one improvement
    - Run a Lighthouse audit.
    - Pick one recommendation the report gives.
    - Describe how you might address it in this project, even if you don't implement it right now.

## Stretch Challenge Exercise

If you finish early, try one or more of these.

- **Theme toggling and `localStorage`**
Use what you have seen in this exercise to connect the overal theme for the page (dark/light mode toggle) to `localStorage`. Set the value when the switch is toggled and on page load, look for the local storage value and, if set, apply it to the page.
- **Follow state accuracy**
Use DevTools to test edge cases. For example, click Follow repeatedly on one card and watch the counter. Does the counter always stay in sync with the visual state of each card? Use breakpoints and the console to investigate.
- **Custom event inspection**
In the Console, add an event listener directly on document:
  ```js
  document.addEventListener('follow-change', (e) => console.log('Global listener:', e.detail));
  ```
  Then click Follow on the page and watch the logs. Compare the event you see here to what you see paused at breakpoints in Sources.

## Common Investigation Patterns

You'll often combine these tools:
  - Set a breakpoint in Sources, reproduce the issue, then step through the code.
  - Check Application -> Storage to confirm that data is actually stored and updated.
  - Use Performance to find which functions run during slow interactions.
  - Take Memory snapshots when you suspect a leak and compare before and after.
  - Run a Lighthouse audit periodically while building a feature, not just at the end.

These are the workflows you'll keep building on in future projects.

## Push changes

```sh
git add .
```
1. Commit the changes:
```sh
git commit -m 'Lesson 26 Example'
```
1. Push your changes to the remote workbook repository: 
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

  test('sets avatar attribute', () => {
    // Arrange
    const element = document.createElement('user-card');
    const testAvatarUrl = 'https://example.com/avatar.png';
    element.setAttribute('avatar', testAvatarUrl);

    // Act
    document.body.appendChild(element);

    // Assert
    const img = element.shadowRoot.querySelector('img');
    expect(img.getAttribute('src')).toBe(testAvatarUrl);
  });

  test('updates avatar attribute', () => {
    // Arrange
    const element = document.createElement('user-card');
    document.body.appendChild(element);

    // Act
    const testAvatarUrl = 'https://example.com/avatar.png';
    element.setAttribute('avatar', testAvatarUrl);

    // Assert
    const img = element.shadowRoot.querySelector('img');
    expect(img.getAttribute('src')).toBe(testAvatarUrl);
  });

  test('sets user property', () => {
    // Arrange
    const user = {
      id: 'user123',
      name: 'Test User',
      description: 'This is a test user.',
      avatar: 'https://example.com/user-avatar.png',
    };

    // Act
    element.user = user;
    document.body.appendChild(element);

    // Assert
    const img = element.shadowRoot.querySelector('img');
    expect(img.getAttribute('src')).toBe(user.avatar);

    const nameSlot = element.shadowRoot.querySelector('[name="name"]');
    expect(nameSlot.textContent).toBe(user.name);

    const descSlot = element.shadowRoot.querySelector('[name="description"]');
    expect(descSlot.textContent).toBe(user.description);

    expect(element.getAttribute('user-id')).toBe(user.id);
  });

  test('follow and unfollow methods', () => {
    // Arrange
    const element = document.createElement('user-card');
    document.body.appendChild(element);

    // Act
    element.follow();
    expect(element.followed).toBe(true);

    element.unfollow();
    expect(element.followed).toBe(false);
  });

  test('button click toggles follow state', () => {
    // Arrange
    const element = document.createElement('user-card');
    document.body.appendChild(element);
    const button = element.shadowRoot.querySelector('button');

    // Act
    button.click();
    expect(element.followed).toBe(true);

    button.click();
    expect(element.followed).toBe(false);
  });
});
```

