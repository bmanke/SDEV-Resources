---
title: "Lesson 20: Web Components: Styling"
description: "Notes and commented code from lesson 20."
tags: [frontend, lesson-20]
sidebar:
  order: 20
---


## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-20`
1. Move into the lesson-20/ directory:
```sh
cd lesson-20
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

### Component Element CSS Overrides

In `index.html`, update the markup for the first web component to include inline CSS styling. Add a `<span>` with a `style` attribute to the component:

```html
<user-card avatar="assets/zelda-avatar.png">
   <span slot="name"><span style="color:gold">Zelda</span></span>
   <span slot="description">Princess of Hyrule</span>
</user-card>
```

> NOTE: that the inline CSS is applied to the individual component's name slot. It's important to note that styles applied this way will also take precedence over any scoped CSS set inside the web component (demonstrated later on).

### Scoped CSS Variables

We can utilize scoped CSS variables to make updating the components CSS easier. Add the `:host` selector rule to the style for the user card component (there are a few more updates added from the previous lesson):

```css
<style>
  :host {
    --card-bg: #ffffff;
    --card-color: #222222;
    --card-accent: #0077ff;
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
```

The CSS variables defined in the `:host` can be applied in other rulesets (e.g., `.card` and `.name` make use of the variables).

### Expose CSS Vars for Global Styling

Components can be styled from outside the component as well by exposing CSS vars. To demonstrate, we'll expose three global CSS vars that can be used to override the three variable values set in the previous section:

```css
<style>
  :host {
    --card-bg: var(--global-card-bg, #ffffff);
    --card-color: var(--global-card-color, #222222);
    --card-accent: var(--global-card-accent, #0077ff);
    display: block;
  }
  ...
</style>
```

Add a toggle button to the app to quickly test the application of these new global CSS vars:

```js
// main.js
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
```

The handler for the button will add/modify the global CSS vars on the document with values to demonstrate how they can be used within the web component.

### Handle Attribute Updates (A Look Ahead)

The work last day left us with a strange situation (well, strange until we unpack it). When creating the second `<user-card>` programatically, we found that the custom placeholder colour was unchanged (i.e., it was still the default). This is because the element was created first, which called the constructor, and then the avatar attribute was altered afterwards, which has no effect. To respond to attribute *changes*, we need to add a callback handler to the web component:

```js
// user-card.js

class UserCard extends HTMLElement {
  constructor() {
    ...
  }

  // Respond to attribute changes if needed in the future
  // The upcoming lessons will cover component lifecycle and state management in more detail
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

Now that we have defined the observed attributes (which to watch) and an attribute handler, we can update the component when the avatar attribute is changed. You should now see that the placeholder colour updates as expected.

## Student Exercise

### Allow for Additional Global Styling
- Add a CSS var to control the description colour for dark mode
- Expose a `theme` attribute on `<user-card>` that toggles a small internal dark-mode class. (Refer to the demonstrated `attributeChangedCallback` for the `avatar` attribute to make this update).

## Common Errors & Fixes

| Issue | Cause | Solution |
|-------|-------|----------|
| Styles not applied | `<style>` not inside template or shadow root | Move scoped styles into the template appended to shadow root.<br>Use Elements panel to inspect the component's shadow root to see applied CSS. |
| Slots empty | Slot name mismatch | Match slot="name" with &lt;slot name="name"&gt; exactly |
| Avatar missing for programmatic element | Attribute set after construction and constructor uses it | Set attributes before appending or handle in connectedCallback / attributeChangedCallback |

## Push to Your GitHub Workbook Repo

Once you're done making your own custom updates to the project, stage your files, commit your work, and push to the remote repository.

1. Open a terminal in VS Code
2. Stage all updated and created files:
```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 20 Example'
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
  <title>Lesson 20 - Web Components (Styling)</title>
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
// Why doesn't the custom avatar show up for this element?
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
```

### `src/user-card.js`

```js title="src/user-card.js"
// Self-contained user card web component with Shadow DOM
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      --card-bg: var(--global-card-bg , #ffffff);
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
    </div>
  </div>
`;
document.body.appendChild(template);

class UserCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    // Use the template defined above, no longer need to query the document
    // const template = document.getElementById('user-card-template');
    const content = template.content.cloneNode(true);
    const img = content.querySelector('img');
    img.src = this.getAttribute('avatar') || 'https://placehold.co/80x80/0077ff/ffffff';
    shadow.appendChild(content);
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

