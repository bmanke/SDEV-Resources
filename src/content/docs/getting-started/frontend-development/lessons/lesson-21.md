---
title: "Lesson 21: Web Components: Custom Events"
description: "Notes and commented code from lesson 21."
tags: [frontend, lesson-21]
sidebar:
  order: 21
---


## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-21`
1. Move into the lesson-21/ directory:
```sh
cd lesson-21
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

## Instructor Demo

### Add Button to Trigger Custom Event

In `user.card.js`, update the template markup by adding a Follow `<button>`:

```js
// user-card.js
...
<slot name="name" class="name"></slot>
<slot name="description" class="description"></slot>
<button>Follow</button>
...
```

This button will be used to dispatch a custom event when clicked with user id in event.detail.

### Add Property to Custom Component

To track the current state of being "followed", add a private property to the `UserCard`:

```js
// user-card.js
...
constructor() {
  super();

  // Added property to track follow state
  this._followed = false;
  ...
```

Now, we need to add support for toggling the followed state for the component. 

```js
// user-card.js
...
constructor() {
  ...
}

_setFollow(value) {
  this._followed = value;
}
...
```

The last thing to do is connect the button to the followed state. Add an event listener to the button in the constructor:

```js
// user-card.js
...
constructor() {
  super();
  this._followed = false;
  const shadow = this.attachShadow({ mode: 'open' });
  const content = template.content.cloneNode(true);
  const img = content.querySelector('img');
  img.src = this.getAttribute('avatar') || 'https://placehold.co/80x80/0077ff/ffffff';
  
  this._btn = content.querySelector('button');
  this._btn.addEventListener('click', () => {
    this._setFollow(!this._followed);
    console.log('Follow button clicked');
  });

  shadow.appendChild(content);
}
...
```

### Improve the UX

Update the example so that the state change is reflected in the UI. Add a private method for updating the state (`_onFollow()`) and update the text in the Follow button:

```js
// user-card.js
...
constructor() {
  super();
  this._followed = false;
  const shadow = this.attachShadow({ mode: 'open' });
  const content = template.content.cloneNode(true);
  const img = content.querySelector('img');
  img.src = this.getAttribute('avatar') || 'https://placehold.co/80x80/0077ff/ffffff';
  this._btn = content.querySelector('button');

  this._btn.addEventListener('click', () => this._onFollow());

  shadow.appendChild(content);
}

_setFollow(value) {
    this._followed = value;
    this._btn.textContent = this._followed ? 'Following' : 'Follow';
  }

// Follow button handler
_onFollow() { 
  this._setFollow(!this._followed); 
}
```

### Enable Programmatic Access

Expose `follow()` and `unfollow()` methods that toggles an internal follow state. This will allow external APIs to interact with the component programmatically.

```js
// user-card.js
...
constructor() {
  ...
}

follow() {
  this._setFollow(true);
}
unfollow() {
  this._setFollow(false);
}
...
```
We can now set the followed state from our JS. Select the first user-card and `follow()` and `unfollow()` it programmatically:

```js
// main.js
...
// Programmatically follow the first user card
document.querySelector('user-card').follow();
```

When the page loads, you should now see that the first `<user-card>` is followed (e.g., the button text shows "Following").

Open the console and enter the following to see the effect of unfollowing a user:

```js
document.querySelector('user-card').unfollow();
```

### Dispatch a Custom Event and Property for External Communication

Finally, let's dispatch a custom event (`follow-change`) in case any listeners want to be notified when a `<user-card>` is followed/unfollowed. Add a read-only property to read the state of `_followed` as well:

```js
// user-card.js
...
constructor() {
  ...
}
...
_setFollow(value) {
  this._followed = value;
  this._btn.textContent = this._followed ? 'Following' : 'Follow';
  // emit event so parent can react
  this.dispatchEvent(new CustomEvent('follow-change', {
    detail: { id: this.getAttribute('user-id') || null, followed: this._followed },
    bubbles: true,
    composed: true
  }));
}

// Property to read followed state
get followed() {
  return this._followed;
}
...
```

Listen for and respond to the event in the main application:

```js
// main.js
document.querySelector('user-card').addEventListener('follow-change', (e) => {
  const card = e.target;
  const name = card.querySelector('[slot=name]').textContent;
  console.log(`User ${name} is ${card.followed? 'followed' : 'not followed'}`);
});
```

## Student Exercise

### Styling Update
Add styling for the added Follow button.

### Toggle the Details
If you have completed the previous student task of adding a "Details" section to the card, add the ability to toggle the visiblity of the "Details" within the component (e.g., CSS display update). Trigger an event whenever the details display is toggled.

## Push to Your GitHub Workbook Repo

Once you're done making your own custom updates to the project, stage your files, commit your work, and push to the remote repository.

1. Open a terminal in VS Code
2. Stage all updated and created files:
```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 21 Example'
```
4. Push your changes to the remote workbook repository: 
```sh
git push origin main
```

## Common Errors & Fixes

| Issue | Cause | Solution |
|-------|-------|----------|
| Parent doesn't receive event | CustomEvent not bubbled/composed | Use { bubbles: true, composed: true } when dispatching |
| Property updates not reflected | Using attributes only or missing setter | Implement a setter that updates internal state and the rendered UI |
| Can't call method on element | Query happened before element parsed/connected | Query after DOMContentLoaded or place code after import that defines the custom element |


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
  <main>
    <user-card avatar="assets/zelda-avatar.png">
      <span slot="name"><span style="color:gold">Zelda</span></span>
      <span slot="description">Princess of Hyrule</span>
    </user-card>

    <user-card avatar="assets/link-avatar.png">
      <span slot="name">Link</span>
      <span slot="description">Hero of Hyrule</span>
    </user-card>
  </main>

</body>

</html>
```

### `src/main.js`

```js title="src/main.js"
// Import the user-card component to register the custom element
import './user-card.js';

// Create an additional user card using HTML and append it to the main element
const dynamicUserCard = `
    <user-card avatar="https://placehold.co/80x80/7700ff/ffffff">
      <span slot="name">Mipha</span>
      <span slot="description">Zora Champion</span>
    </user-card>`;

document.querySelector('main').insertAdjacentHTML('beforeend', dynamicUserCard);

// Create another user card using JavaScript DOM API only and append it to the main element
const anotherUserCard = document.createElement('user-card');
anotherUserCard.setAttribute('avatar', 'https://placehold.co/80x80/770000/ffffff');
const nameSpan = document.createElement('span');
nameSpan.setAttribute('slot', 'name');
nameSpan.textContent = 'Yunobo';
const descSpan = document.createElement('span');
descSpan.setAttribute('slot', 'description');
descSpan.textContent = 'President of YunoboCo';
anotherUserCard.appendChild(nameSpan);
anotherUserCard.appendChild(descSpan);

document.querySelector('main').appendChild(anotherUserCard);

// Add a button to toggle the theme accent color (used to demonstrate CSS variables cascading into Shadow DOM)
const toggleBtn = document.createElement('button');
toggleBtn.textContent = 'Toggle theme';
document.body.prepend(toggleBtn);

let dark = false;
toggleBtn.addEventListener('click', () => {
  dark = !dark;
  document.documentElement.style.setProperty('--global-card-bg', dark ? '#1f2937' : '#ffffff');
  document.documentElement.style.setProperty('--global-card-color', dark ? '#e5e7eb' : '#222222');
  document.documentElement.style.setProperty('--global-card-accent', dark ? 'gold' : '#0077ff');
});
// lesson 22 remaining part starts here
document.querySelector('user-card').addEventListener('follow-change', (e) => {
  const card = e.target;
  const name = card.querySelector('[slot=name]').textContent;
  console.log(`User ${name} is ${card.followed ? 'followed' : 'not followed'}`);
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
  constructor() {
    super();
    // Added property to track follow state
    this._followed = false;
    const shadow = this.attachShadow({ mode: 'open' });
    const content = template.content.cloneNode(true);
    const img = content.querySelector('img');
    img.src = this.getAttribute('avatar') || 'https://placehold.co/80x80/0077ff/ffffff';

    this._btn = content.querySelector('button');
    this._btn.addEventListener('click', () => {
      this._onFollow();
    });
    shadow.appendChild(content);
  }

  _setFollow(value) {
    this._followed = value;
    this._btn.textContent = this._followed ? 'Following' : 'Follow';
    this.dispatchEvent(new CustomEvent('follow-change', {
      detail: { id: this.getAttribute('user-id') || null, followed: this._followed },
      bubbles: true,
      composed: true,
    }));
  }

  _onFollow() {
    this._setFollow(!this._followed);
  }

  follow() {
    this._setFollow(true);
  }

  unFollow() {
    this._setFollow(false);
  }

  get followed() {
    return this._followed;
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
```

