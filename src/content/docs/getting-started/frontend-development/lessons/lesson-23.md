---
title: "Lesson 23: Web Components: Lifecycle and Properties"
description: "Notes and commented code from lesson 23."
tags: [frontend, lesson-23]
sidebar:
  order: 23
---


## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-23`
1. Move into the lesson-23/ directory:
```sh
cd lesson-23
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
4. Open the Vite dev URL in your browser.

## Objectives

- Add a `user` property to `<user-card>` that accepts a JavaScript object (name, avatar, id, description).
- Use lifecycle methods (connectedCallback, disconnectedCallback, attributeChangedCallback) to initialize and clean up component behaviour.
- Add an external listener to track total followed users.

## Instructor Demo

### Ensure No Outside Access to Class Attributes

JavaScript supports private class attributes. You can mark a class attribute as private by prefixing it with a `#` symbol. Update the user-card to implement the followed attribute as a private field.

```js
// user-card.js
class UserCard extends HTMLElement {
  #followed = false;

  constructor() {
    super();

    // Added property to track follow state
    this.#followed = false;

    const shadow = this.attachShadow({ mode: 'open' });
    const content = template.content.cloneNode(true);
    const img = content.querySelector('img');
    img.src = this.getAttribute('avatar') || 'https://placehold.co/80x80/0077ff/ffffff';
    this._btn = content.querySelector('button');
    this._btn.addEventListener('click', () => this._onFollow());
    shadow.appendChild(content);
  }

  follow() {
    this._setFollow(true);
  }

  unfollow() {
    this._setFollow(false);
  }

  // Property to read followed state
  get followed() {
    return this.#followed;
  }

  _setFollow(value) {
    this.#followed = value;
    this._btn.textContent = this.#followed ? 'Following' : 'Follow';
    this.dispatchEvent(new CustomEvent('follow-change', {
      detail: { id: this.getAttribute('user-id') || null, followed: this.#followed },
      bubbles: true,
      composed: true,
    }));
  }

  // Follow button handler
  _onFollow() {
    this._setFollow(!this.#followed);
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
```

This update will prevent any updates to the `#followed` field that do not originate from within the class itself. We will apply this to all internal class state.

### Add `user` Property and Lifecycle Usage

In `user-card.js`, we'll expose a `user` property (setter/getter), use `connectedCallback` to wire event listeners, and `disconnectedCallback` to remove them.

```js
// user-card.js

// Existing code...

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
    // Keep the img src blank here — it will be set from property/attribute
    this._img = content.querySelector('img');
    this._btn = content.querySelector('button');
    shadow.appendChild(content);
  }

  _renderFromUser() {
    if (this.#user) {
      // Update image and fallback attributes
      if (this.#user.avatar) {
        this._img.src = this.#user.avatar;
      } else {
        this._img.src = 'https://placehold.co/80x80/0077ff/ffffff';
      }

      this.setAttribute('user-id', this.#user.id || '');
      // Update internal slots via shadow DOM query selectors for text nodes.
      // We want to avoid manipulating light DOM directly since we are provided with a user property.
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

  // Create a user property { id, name, avatar, description }
  set user(obj) {
    // TODO: Perform some data validation on the obj param here
    this.#user = obj;
    // Render the UI (assume user has changed)
    this._renderFromUser();
  }

  get user() {
    return this.#user;
  }

  _onButtonClick() {
    this._setFollow(!this.#followed);
  }

  // Lifecycle: called when element is added to DOM
  connectedCallback() {
    // Attach local listener(s)
    this._btn.addEventListener('click', this._onButtonClick);

    // If user property was set before connection, render it now
    if (this.#user) {
      this._renderFromUser();
    }

    else {
      // Fallback to attributes if user property not provided
      const avatar = this.getAttribute('avatar');
      if (avatar) {
        this._img.src = avatar;
      } else {
        this._img.src = 'https://placehold.co/80x80/0077ff/ffffff';
      }
    }
  }

  disconnectedCallback() {
    // Cleanup listener
    this._btn.removeEventListener('click', this._onButtonClick);
  }

  // Existing code ...

```

### Programmatic Usage and External Listener

```js
// main.js
import './user-card.js';

// Create an array of user objects
const users = [
  { id: 'u1', name: 'Zelda', avatar: 'assets/zelda-avatar.png', description: 'Princess of Hyrule' },
  { id: 'u2', name: 'Link', avatar: 'assets/link-avatar.png', description: 'Hero of Hyrule' },
  { id: 'u3', name: 'Mipha', description: 'Zora Champion' },
];

// Render user cards
const main = document.querySelector('main');
users.forEach(user => {
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
const first = document.querySelector('user-card');
if (first) {
  first.follow();
}
// Or use optional chaining operator
//document.querySelector('user-card')?.follow();
```

## Important Points

- Prefer setting rich data via properties (`card.user = {...}`) instead of HTML attributes when passing objects.
- connectedCallback is the proper place to attach DOM listeners and perform initial render tasks that depend on being in the document.
- disconnectedCallback must remove listeners to avoid leaks.
- Dispatch events with bubbles: true and composed: true so external code can listen across the shadow boundary.
- Use getters/setters to keep property and DOM in sync.

## Student Exercise

- Add validation in the `user` setter to ensure required fields exist (e.g., id, name).
- Persist followed state to `localStorage` so follow state survives reload.
- Emit a separate event when avatar image is clicked (e.g., `open-profile`).

### Stretch Exercise

Replace the current theme toggle button implementation with a custom web component.

## Common Errors & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Slotted text not updated | Updating internal DOM instead of light DOM slot content | Update light DOM children (the elements with slot attributes) or render text inside the shadow DOM instead of relying on slots |
| Event listener not fired in app | Event not bubbled/composed | Dispatch with { bubbles: true, composed: true } |
| Property set before connectedCallback | Rendering relied on DOM connections | Ensure setter stores data and connectedCallback triggers render when element attaches |

## Push changes

```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 23 Example'
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

### `src/main.js`

```js title="src/main.js"
// Import the user-card component to register the custom element
import './user-card.js';

const users = [
  { id: 'u1', name: 'Zelda', avatar: 'assets/zelda-avatar.png', description: 'Princess of Hyrule' },
  { id: 'u2', name: 'Link', avatar: 'assets/link-avatar.png', description: 'Hero of Hyrule' },
  { id: 'u3', name: 'Mipha', description: 'Zora Champion' },
];

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

const main = document.querySelector('main');
users.forEach((each_user) => {
  const card = document.createElement('user-card'); //  creating <user-card> initializes the shadowdom
  card.user = each_user; // setter is running
  // setter triggers setuser(obj) --> _renderFromUser
  main.appendChild(card);
  // add each card to the main page
  // ConnectedCallback now fires when element is added to the main DOM
  // Setter will cause the values to be extracted
  // Add the card to the page
  // connected Callback now fires
});

let followedCount = 0;

main.addEventListener('follow-change', (event) => {
  followedCount += event.detail.followed ? 1 : -1;
  const counterEl = document.querySelector('#follow-counter');
  counterEl.textContent = `Followed: ${followedCount}`;
  console.log('follow change', event.detail);
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

    // Added property to track follow state
    this.#followed = false;
    this.#user = null;
    this._onButtonClick = this._onButtonClick.bind(this);

    const shadow = this.attachShadow({ mode: 'open' });
    const content = template.content.cloneNode(true);
    // we will keep the img src blank
    this._img = content.querySelector('img');
    this._btn = content.querySelector('button');
    shadow.appendChild(content);
  }

  follow() {
    this._setFollow(true);
  }

  unfollow() {
    this._setFollow(false);
  }

  // Property to read followed state
  get followed() {
    return this.#followed;
  }

  _setFollow(value) {
    this.#followed = value;
    this._btn.textContent = this.#followed ? 'Following' : 'Follow';
    this.dispatchEvent(new CustomEvent('follow-change', {
      detail: { id: this.getAttribute('user-id') || null, followed: this.#followed },
      bubbles: true,
      composed: true,
    }));
  }

  // Follow button handler
  _onFollow() {
    this._setFollow(!this.#followed);
  }

  _renderFromUser() {
    if (this.#user) {
      if (this.#user.avatar) {
        this._img.src = this.#user.avatar;
      }
      else {
        this._img.src = 'https://placehold.co/80x80/0077ff/ffffff';
      }
      this.setAttribute('user-id', this.#user.id || '');
      const nameSlot = this.shadowRoot.querySelector('[name = "name"]');
      if (nameSlot) {
        nameSlot.textContent = this.#user.name || '';
      }
      const descSlot = this.shadowRoot.querySelector('[name="description"]');
      if (descSlot) {
        descSlot.textContent = this.#user.description || '';
      }
    }
  }

  _onButtonClick() {
    this._setFollow(!this.#followed);
  }

  get user() {
    return this.#user;
  }

  set user(obj) {
    this.#user = obj;
    this._renderFromUser();
  }

  // fires when an element is added to the DOM
  connectedCallback() {
    this._btn.addEventListener('click', this._onButtonClick);
    if (this.#user) {
      this._renderFromUser();
    }
    else {
      const avatar = this.getAttribute('avatar');
      if (avatar) {
        this._img.src = avatar;
      }
      else {
        this._img.src = 'https://placehold.co/80x80/0077ff/ffffff';
      }
    }
  }

// fires when an element is removed from the DOM
  disconnectedCallback() {
    this._btn.removeEventListener('click', this._onButtonClick);
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

