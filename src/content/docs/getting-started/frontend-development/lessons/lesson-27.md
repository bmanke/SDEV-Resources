---
title: "Lesson 27: Building and Deploying"
description: "Notes and commented code from lesson 27."
tags: [frontend, lesson-27]
sidebar:
  order: 27
---


In this lesson you will take a local front end app, build it for production, and deploy it to Netlify using the drag and drop workflow.

The goal is that, by the end of class, you have a live URL you can share that is running the built version of this app.

## Install dependencies and run the dev server (quick check)

0. Extract the starter zip for **lesson-27-starter**.
1. Move into the project directory:

   ```sh
   cd lesson-27-starter
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. (Optional but recommended) Run the dev server once to make sure the app works locally:

   ```sh
   npm run dev
   ```

   Open the URL shown in the terminal and quickly click around to confirm the app runs as expected. When you are satisfied, stop the dev server (ctrl + c in the terminal).

## Objectives

By the end of this walkthrough you should be able to:

- Explain why front end apps are **built for production** before deployment.
- Run the `npm run build` script to generate an optimized production bundle.
- Locate and understand the `dist` directory that contains the built app.
- Create or sign in to a Netlify account.
- Use Netlify's **drag and drop** deployment flow to deploy the contents of the `dist` folder.
- Verify that the deployed app is working at its public Netlify URL.

## Why build for production?

Modern front end tooling (Vite, React, etc.) usually has two modes:

- **Development mode** (`npm run dev`)
  - Fast rebuilds and hot reloading for local coding.
  - Extra debugging helpers and warnings.
  - Not optimized for performance or file size.

- **Production build** (`npm run build`)
  - Bundles your JavaScript modules together.
  - Minifies and compresses files to reduce file size.
  - Can remove unused code and debug-only helpers.
  - Generates static assets that are ready to be served by a simple web server or hosting provider.

Netlify does not need your source files or dev server. It just needs the **built output**. That is why we run the build script and deploy the contents of the `dist` folder, not the entire project.

## Part 1: Build the app

### 1. Check the build script

Open `package.json` and find the `scripts` section. You should see something like:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

We are going to use the `build` script.

### 2. Run the build

In the project folder, run:

```sh
npm run build
```

Watch the terminal output. You should see Vite or the build tool report a successful build and mention an output directory.

### 3. Inspect the `dist` directory

After the build finishes, you should see a new folder called `dist` in the project root. This folder contains:

- An `index.html` file.
- One or more JavaScript files with hashed names (for example, `assets/index-ABCD1234.js`).
- CSS files and other static assets.

This `dist` folder **is what you will deploy to Netlify**.

### 4. Preview the production build locally [OPTIONAL]

If you want to see exactly what Netlify will serve, you can run:

```sh
npm run preview
```

This starts a local server that serves the built files from `dist`. Open the URL it prints in the terminal and verify that everything still works.

## Part 2: Set up Netlify

### 1. Create or sign in to a Netlify account

1. Go to [https://app.netlify.com](https://app.netlify.com) in your browser.
2. If you already have an account, sign in.
3. If you do not have an account, sign up using your NAIT email (or another provider) and complete any required setup steps.

Keep this tab open. You will come back to it in a moment.

### 2. Open the deploy manually screen

1. In the Netlify dashboard, go to the **Projects** page.

You should see a drop zone that says something like *"Drag and drop your project folder here"*.

## Part 3: Deploy the `dist` folder with drag and drop

Now you will deploy the built app.

### 1. Locate the `dist` folder in your file explorer

1. In the File Explorer, open your `lesson-27` project folder.
2. Confirm that the `dist` folder exists and contains `index.html` and an `assets` folder.

### 2. Drag and drop to Netlify

1. With the Netlify deploy drop zone visible in your browser, drag the **`dist` folder itself** from your file system onto the drop area.
2. Netlify will upload the contents and start the deployment process.
3. Wait until Netlify shows that the site has been deployed.

Netlify will generate a random site name (for example, `sparkling-forest-12345.netlify.app`). You can rename it later if you want.

### 3. Test the deployed site

1. Click the generated site URL in the Netlify dashboard.
2. Verify that your app loads in the browser.
3. Click around and confirm that the app behaves the same as it did when you ran `npm run preview` locally.

If something is broken, go back to the steps above and check:

- Did you run `npm run build` after your last code changes?
- Did you drag the **`dist`** folder, not the entire project folder?
- Does the `dist/index.html` file exist and work when previewed locally?

## Assignment deployment 

Work through the following steps to deploy your Assignment 4 production build when you're ready. Ask for help if you get stuck.

1. Navigate to your assignment 4 project directory.
3. Run `npm run build` to generate a production build.
4. Inspect the `dist` folder and confirm that it contains `index.html` and an `assets` folder.
5. Sign in to Netlify.
6. Use the manual drag and drop flow demonstrated above to deploy the **`dist`** folder.
7. Open your live Netlify URL and confirm the app works.
8. Submit your deployed URL through the method your instructor specifies (include the URL at the top of the assignment README.md file).

## Stretch goals

If you finish early, try one or more of these:

- **Change and redeploy**  Make a small visible change in the app (for example, text in a heading), run `npm run build` again, and redeploy the updated `dist` folder. Confirm that the change appears on your Netlify site.
- **Custom site name**  In the Netlify project configuration, rename your site to something more meaningful instead of the random default name.
- **Preview vs dev**  Compare how the app behaves and loads when running `npm run dev` versus `npm run preview` and your Netlify deployment.

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

