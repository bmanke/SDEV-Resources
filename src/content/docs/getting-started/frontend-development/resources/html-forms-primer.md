---
title: "HTML Forms: A Beginner's Primer"
description: "Course resource: HTML Forms: A Beginner's Primer"
---

Forms are how web pages collect information from people. Every login screen, search bar, signup page, and checkout flow you have ever used was built with an HTML form. This guide covers the form element itself, the input elements that go inside it, and the attributes you will use most often.

## What a form actually does

A form is a container for input fields. When the user fills in the fields and submits the form, the browser gathers up all the values and sends them somewhere, usually to a server. The server then does something with that data: checks a password, saves a comment, runs a search, and so on.

Here is the smallest useful form:

```html
<form action="/submit" method="post">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username">
  <button type="submit">Send</button>
</form>
```

Three things are happening here:

1. The `<form>` element wraps everything and says where the data should go.
2. The `<input>` element gives the user a box to type in.
3. The `<button>` element submits the form when clicked.

## The form element

The `<form>` tag has two attributes that control what happens on submit.

### action

The `action` attribute is the URL the form data gets sent to. It can be a full address or a path on the same site.

```html
<form action="https://example.com/signup">
<form action="/search">
```

If you leave `action` off, the form submits to the current page. In class exercises where JavaScript handles the form instead of a server, you will often see `action` omitted entirely.

### method

The `method` attribute controls how the data is sent. There are two common values.

**GET** puts the form data into the URL itself. If you search a site for "cats" you might end up at `example.com/search?q=cats`. The `q=cats` part came from the form. GET is right for searches and filters, anything where the data is not sensitive and where bookmarking the result would be useful.

**POST** sends the data inside the request body, hidden from the URL. POST is right for passwords, signups, file uploads, and anything that changes data on the server.

```html
<form action="/search" method="get">
<form action="/login" method="post">
```

If you do not specify a method, the browser uses GET.

## The input element

`<input>` is the workhorse of forms. It is a single self-closing tag, meaning it has no closing tag and no content inside it. What it looks like and how it behaves depends almost entirely on its `type` attribute.

```html
<input type="text">
<input type="checkbox">
<input type="date">
```

All three lines above use the same element, but the browser renders a text box, a checkbox, and a date picker.

### Common input types

**text** is the default. A plain single-line text box.

```html
<input type="text" name="city">
```

**password** hides what the user types behind dots.

```html
<input type="password" name="pwd">
```

**email** looks like a text box but the browser checks that the value resembles an email address before allowing the form to submit. On phones it also brings up a keyboard with the @ symbol handy.

```html
<input type="email" name="email">
```

**number** only accepts numeric input and usually shows little up and down arrows.

```html
<input type="number" name="age">
```

**checkbox** is a box the user can tick on or off. Checkboxes are independent of each other, so the user can tick several at once.

```html
<input type="checkbox" name="subscribe" value="yes">
```

**radio** buttons come in groups where only one can be selected at a time. The grouping works through the `name` attribute: radio buttons that share the same `name` belong to the same group.

```html
<input type="radio" name="size" value="small"> Small
<input type="radio" name="size" value="medium"> Medium
<input type="radio" name="size" value="large"> Large
```

**date** shows a calendar picker.

```html
<input type="date" name="birthday">
```

**file** lets the user choose a file from their computer.

```html
<input type="file" name="resume">
```

**range** shows a slider.

```html
<input type="range" name="volume" min="0" max="100">
```

**color** shows a color picker.

```html
<input type="color" name="theme">
```

**hidden** is invisible to the user but still gets submitted with the form. It is used to pass along data the user does not need to see, like an ID number.

```html
<input type="hidden" name="product-id" value="4821">
```

**submit** renders a button that submits the form. Most modern code uses a `<button>` element instead, but you will still see this in older examples.

```html
<input type="submit" value="Sign Up">
```

There are more types (`tel`, `url`, `search`, `time`, `week`, `month`) but the ones above cover the vast majority of what you will write.

## Other form elements

Inputs are not the only way to collect data. A few other elements round out the toolkit.

### label

A `<label>` is the text that describes an input. Always use one. Labels matter for two reasons: clicking the label focuses or toggles the input, which makes forms easier to use, and screen readers rely on labels to tell visually impaired users what each field is for.

The label connects to its input through the `for` attribute, which must match the input's `id`.

```html
<label for="email">Email address:</label>
<input type="email" id="email" name="email">
```

You can also wrap the input inside the label, which connects them without needing `for` and `id`:

```html
<label>
  Email address:
  <input type="email" name="email">
</label>
```

### textarea

For multi-line text like comments or messages, use `<textarea>`. Unlike `<input>`, it has a closing tag.

```html
<textarea name="message" rows="5" cols="40"></textarea>
```

`rows` and `cols` set the starting size, though CSS is the better way to control sizing.

### select and option

A `<select>` element creates a dropdown menu. Each choice is an `<option>` inside it.

```html
<select name="state">
  <option value="">Choose a province</option>
  <option value="AB">Alberta</option>
  <option value="ON">Ontario</option>
  <option value="BC">British Colombia</option>
</select>
```

Note the difference between the `value` attribute and the text between the tags. The user sees "Alberta" but the form submits "AB".

### button

A `<button>` inside a form submits the form by default. The `type` attribute can change that.

```html
<button type="submit">Submit the form</button>
<button type="reset">Clear all fields</button>
<button type="button">Does nothing unless JavaScript handles it</button>
```

The `type="button"` version is what you use when JavaScript will respond to the click and you do not want the form to submit on its own.

### fieldset and legend

For longer forms, `<fieldset>` groups related fields together and draws a border around them. `<legend>` provides a caption for the group.

```html
<fieldset>
  <legend>Shipping Address</legend>
  <label for="street">Street:</label>
  <input type="text" id="street" name="street">
  <label for="zip">ZIP:</label>
  <input type="text" id="zip" name="zip">
</fieldset>
```

## The attributes you will use constantly

These attributes appear on inputs over and over. Learn these and you can read almost any form.

### name

The single most important attribute. When a form submits, the data is sent as name and value pairs. An input without a `name` is not submitted at all.

```html
<input type="text" name="first-name">
```

If the user types "Jen" into that field, the form sends `first-name=Jen`. The server uses the name to know which value is which.

### id

A unique identifier for the element. No two elements on a page should share an `id`. In forms, its main job is connecting labels to inputs through the label's `for` attribute. It is also how JavaScript and CSS target a specific element.

`name` and `id` often have the same value, which is fine, but they do different jobs. `name` is for the data being submitted. `id` is for connecting things within the page.

### value

The initial or current content of the input. For text fields it pre-fills the box. For checkboxes, radios, and options, it defines what gets submitted when that choice is selected.

```html
<input type="text" name="country" value="CA">
```

### placeholder

Faint hint text shown inside an empty field. It disappears as soon as the user starts typing. A placeholder is a hint, not a label, so do not use it as a substitute for a real `<label>`.

```html
<input type="email" name="email" placeholder="you@example.com">
```

### required

A boolean attribute, meaning it has no value, its presence alone turns it on. With `required` set, the browser refuses to submit the form while the field is empty and shows a message to the user.

```html
<input type="text" name="username" required>
```

### disabled

Grays out the field so the user cannot interact with it. Disabled fields are not submitted with the form.

```html
<input type="text" name="code" disabled>
```

### readonly

The user can see and select the value but cannot change it. Unlike `disabled`, a readonly field still gets submitted.

```html
<input type="text" name="order-number" value="10042" readonly>
```

### checked

For checkboxes and radio buttons, makes the option selected when the page loads. Like `required`, it is a boolean attribute.

```html
<input type="checkbox" name="terms" checked>
```

### min, max, and step

For `number`, `range`, and date inputs, these set the allowed bounds and the increment.

```html
<input type="number" name="quantity" min="1" max="10" step="1">
```

### minlength and maxlength

Set how few or how many characters a text field will accept.

```html
<input type="password" name="pwd" minlength="8" maxlength="64">
```

### pattern

A regular expression the value must match before the form will submit. You do not need to know regular expressions yet, but you will see this attribute in the wild.

```html
<input type="text" name="zip" pattern="[0-9]{5}" title="Five digit ZIP code">
```

The `title` attribute here gives the user a useful message when the value does not match.

### autocomplete

Tells the browser whether and how to suggest saved values, like a remembered email address.

```html
<input type="email" name="email" autocomplete="email">
<input type="text" name="one-time-code" autocomplete="off">
```

### autofocus

Puts the cursor in this field automatically when the page loads. Use it on at most one field per page.

```html
<input type="text" name="search" autofocus>
```

### multiple

Lets a `file` or `email` input accept more than one value, or a `<select>` allow several selections.

```html
<input type="file" name="photos" multiple>
```

### accept

For file inputs, limits which file types the picker offers.

```html
<input type="file" name="avatar" accept=".png,.jpg,image/*">
```

## Built-in validation

You may have noticed that several attributes (`required`, `min`, `max`, `minlength`, `pattern`, and the `email`, `url`, and `number` types) cause the browser to check the data before submitting. This is called client-side validation, and you get it free, no JavaScript needed. If a field fails validation, the browser blocks the submit and points the user at the problem.

Two things to remember about it:

1. It improves the user experience by catching mistakes early.
2. It is not security. Anyone can bypass the browser and send whatever they want to a server, so real applications always validate again on the server side.

## A complete example

Here is a signup form that ties everything together. Read it top to bottom and check that you can explain what each attribute is doing.

```html
<form action="/signup" method="post">
  <fieldset>
    <legend>Create an Account</legend>

    <label for="username">Username:</label>
    <input type="text" id="username" name="username"
           required minlength="3" maxlength="20"
           placeholder="3 to 20 characters">

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required
           autocomplete="email">

    <label for="password">Password:</label>
    <input type="password" id="password" name="password"
           required minlength="8">

    <label for="birthdate">Date of birth:</label>
    <input type="date" id="birthdate" name="birthdate">

    <label for="plan">Plan:</label>
    <select id="plan" name="plan">
      <option value="free">Free</option>
      <option value="pro">Pro</option>
    </select>

    <p>Preferred contact method:</p>
    <label><input type="radio" name="contact" value="email" checked> Email</label>
    <label><input type="radio" name="contact" value="phone"> Phone</label>

    <label>
      <input type="checkbox" name="newsletter" value="yes">
      Send me the newsletter
    </label>

    <label for="bio">Tell us about yourself:</label>
    <textarea id="bio" name="bio" rows="4"></textarea>

    <button type="submit">Sign Up</button>
  </fieldset>
</form>
```

## Quick reference


| Element                   | Purpose                                        |
| ------------------------- | ---------------------------------------------- |
| `<form>`                  | Container; defines where and how data is sent  |
| `<input>`                 | Single field; behavior set by `type`           |
| `<label>`                 | Describes a field; click it to focus the field |
| `<textarea>`              | Multi-line text                                |
| `<select>` / `<option>`   | Dropdown menu and its choices                  |
| `<button>`                | Submits, resets, or triggers JavaScript        |
| `<fieldset>` / `<legend>` | Groups related fields with a caption           |



| Attribute                 | Where               | What it does                                        |
| ------------------------- | ------------------- | --------------------------------------------------- |
| `action`                  | form                | URL the data is sent to                             |
| `method`                  | form                | `get` (in the URL) or `post` (in the body)          |
| `type`                    | input               | What kind of field it is                            |
| `name`                    | any field           | Key for the submitted data; required for submission |
| `id`                      | any element         | Unique identifier; pairs with a label's `for`       |
| `value`                   | any field           | Initial content, or what a choice submits           |
| `placeholder`             | text fields         | Hint text shown while empty                         |
| `required`                | any field           | Field must be filled before submitting              |
| `disabled`                | any field           | Field is unusable and not submitted                 |
| `readonly`                | text fields         | Visible and submitted, but not editable             |
| `checked`                 | checkbox, radio     | Pre-selects the option                              |
| `min` / `max` / `step`    | number, range, date | Allowed bounds and increment                        |
| `minlength` / `maxlength` | text fields         | Character limits                                    |
| `pattern`                 | text fields         | Regular expression the value must match             |
| `autocomplete`            | any field           | Controls browser autofill suggestions               |
| `autofocus`               | any field           | Cursor lands here on page load                      |
| `multiple`                | file, email, select | Allows more than one value                          |
| `accept`                  | file                | Limits selectable file types                        |
| `for`                     | label               | Matches the `id` of the field it describes          |


## Where to go from here

The MDN Web Docs page on forms is the standard reference and is worth bookmarking: [https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms)

A good exercise: build a pizza order form using at least one of each element from the first table above, then open it in a browser and try to submit it with fields left blank to watch the validation kick in.
