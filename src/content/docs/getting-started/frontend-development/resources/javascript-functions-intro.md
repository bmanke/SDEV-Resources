---
title: "JavaScript Functions: A Beginner's Guide"
description: "Course resource: JavaScript Functions: A Beginner's Guide"
---

Functions are one of the most important building blocks in JavaScript. If variables are the "nouns" of your program (the things you store), functions are the "verbs" (the things you do). This guide walks you through what they are, how to write them, and how to use them, starting from zero.

---

## Table of Contents

- [JavaScript Functions: A Beginner's Guide](#javascript-functions-a-beginners-guide)
  - [Table of Contents](#table-of-contents)
  - [What Is a Function?](#what-is-a-function)
  - [Why Do We Use Functions?](#why-do-we-use-functions)
  - [Declaring Your First Function](#declaring-your-first-function)
  - [Calling (Invoking) a Function](#calling-invoking-a-function)
  - [Parameters and Arguments](#parameters-and-arguments)
    - [Multiple Parameters](#multiple-parameters)
    - [Template Literals (a Cleaner Way to Combine Strings)](#template-literals-a-cleaner-way-to-combine-strings)
  - [Return Values](#return-values)
    - [Console.log vs. Return](#consolelog-vs-return)
    - [Functions Stop at Return](#functions-stop-at-return)
  - [Function Expressions](#function-expressions)
    - [Declarations vs. Expressions: What's the Difference?](#declarations-vs-expressions-whats-the-difference)
  - [Arrow Functions](#arrow-functions)
    - [Shorter Forms](#shorter-forms)
  - [Scope: Where Variables Live](#scope-where-variables-live)
  - [Default Parameters](#default-parameters)
  - [Common Beginner Mistakes](#common-beginner-mistakes)

---

## What Is a Function?

A **function** is a reusable block of code that performs a specific task. Think of it like a recipe: you write down the steps once, then you can follow that recipe as many times as you want without rewriting it.

Here's a real-world analogy. Imagine a coffee machine. You don't care how it grinds the beans or heats the water. You press a button (call the function), and you get coffee (the result). The internal steps are hidden, the outcome is what matters.

In code:

```javascript
function makeCoffee() {
	console.log('Grinding beans...');
	console.log('Heating water...');
	console.log('Brewing coffee...');
	console.log("Done! Here's your coffee.");
}

makeCoffee();
```

When you run that, the four messages print to the console.

---

## Why Do We Use Functions?

Three big reasons:

1. **Reusability.** Write the code once, use it many times.
2. **Readability.** A well-named function tells you what it does without you having to read every line inside it.
3. **Organization.** Functions break big problems into smaller, manageable pieces.

Without functions, you'd end up copying and pasting the same code over and over. That gets messy fast, and if you find a bug, you have to fix it in every copy.

---

## Declaring Your First Function

The most basic way to create a function is with a **function declaration**. The syntax looks like this:

```javascript
function functionName() {
	// code goes here
}
```

Breaking that down:

- `function` is the keyword that tells JavaScript "I'm making a function."
- `functionName` is the name you choose. Use camelCase (start lowercase, capitalize each new word: `sayHello`, `calculateTotal`).
- The parentheses `()` will hold parameters later (more on that soon).
- The curly braces `{ }` contain the function's body, which is the code that runs.

A simple example:

```javascript
function sayHello() {
	console.log('Hello, world!');
}
```

That function exists now, but it hasn't actually done anything yet. Declaring a function is like writing a recipe and putting it on a shelf. You still need to use it.

---

## Calling (Invoking) a Function

To run a function, you **call** it (also called "invoking" it). You do that by writing the function's name followed by parentheses:

```javascript
function sayHello() {
	console.log('Hello, world!');
}

sayHello(); // This is the function call
```

Output:

```
Hello, world!
```

You can call a function as many times as you want:

```javascript
sayHello();
sayHello();
sayHello();
```

Output:

```
Hello, world!
Hello, world!
Hello, world!
```

> **Important:** The parentheses are what make the function actually run. If you write `sayHello` without the parentheses, you're just referring to the function, not calling it.

---

## Parameters and Arguments

Functions become much more powerful when you can pass information into them. That's where **parameters** and **arguments** come in.

- **Parameters** are placeholders in the function definition.
- **Arguments** are the actual values you pass in when you call the function.

```javascript
function greet(name) {
	console.log('Hello, ' + name + '!');
}

greet('Jennifer'); // "Jennifer" is the argument
greet('Alex');
greet('Sam');
```

Output:

```
Hello, Jennifer!
Hello, Alex!
Hello, Sam!
```

In that example, `name` is the parameter (the placeholder inside the function), and `"Jennifer"`, `"Alex"`, and `"Sam"` are the arguments passed in.

### Multiple Parameters

You can have more than one parameter, separated by commas:

```javascript
function addNumbers(a, b) {
	console.log(a + b);
}

addNumbers(5, 3); // prints 8
addNumbers(10, 20); // prints 30
```

The order matters. The first argument matches the first parameter, the second argument matches the second parameter, and so on.

### Template Literals (a Cleaner Way to Combine Strings)

Instead of using `+` to join strings, you can use **template literals** with backticks:

```javascript
function greet(name) {
	console.log(`Hello, ${name}!`);
}

greet('Jennifer');
```

The `${name}` part gets replaced with the value of `name`. This is easier to read than `"Hello, " + name + "!"` and is the preferred modern style.

---

## Return Values

So far, our functions have only printed things to the console. But often you want a function to **give you back** a value so you can use it later. That's what `return` does.

```javascript
function add(a, b) {
	return a + b;
}

let result = add(5, 3);
console.log(result); // 8
```

What's happening here:

1. We call `add(5, 3)`.
2. Inside the function, `a + b` evaluates to `8`.
3. The `return` keyword sends `8` back to where the function was called.
4. That `8` gets stored in the `result` variable.

### Console.log vs. Return

This trips up beginners constantly. They are not the same thing.

- `console.log` **displays** a value in the console. The function doesn't give you anything back.
- `return` **hands back** a value that the rest of your code can use.

Compare these two:

```javascript
function addAndLog(a, b) {
	console.log(a + b);
}

function addAndReturn(a, b) {
	return a + b;
}

let x = addAndLog(2, 3); // prints 5, but x is undefined
let y = addAndReturn(2, 3); // doesn't print anything, but y is 5
```

If you want to use the result of a function in more code, you need `return`.

### Functions Stop at Return

Once a function hits a `return` statement, it stops executing. Any code after `return` is ignored:

```javascript
function example() {
	return 'first';
	console.log('This line never runs');
}
```

This is actually useful for early exits:

```javascript
function divide(a, b) {
	if (b === 0) {
		return 'Cannot divide by zero';
	}
	return a / b;
}
```

---

## Function Expressions

There's another way to create functions: you can assign a function to a variable. This is called a **function expression**.

```javascript
const sayHi = function () {
	console.log('Hi!');
};

sayHi();
```

The function on the right side of `=` doesn't have a name (it's "anonymous"). The variable `sayHi` holds the function, so you call it using the variable name.

### Declarations vs. Expressions: What's the Difference?

The main practical difference is **hoisting**. Function declarations get "lifted" to the top of their scope, so you can call them before they appear in your code:

```javascript
sayHello(); // works fine

function sayHello() {
	console.log('Hello!');
}
```

Function expressions do not. You have to define them before you use them:

```javascript
sayHi(); // ERROR: Cannot access 'sayHi' before initialization

const sayHi = function () {
	console.log('Hi!');
};
```

For now, just know both styles exist. You'll see both in real code.

---

## Arrow Functions

ES6 (a 2015 update to JavaScript) introduced **arrow functions**, a shorter syntax for writing function expressions. You'll see these constantly in modern JavaScript.

The basic syntax:

```javascript
const add = (a, b) => {
	return a + b;
};
```

That's identical in behavior to:

```javascript
const add = function (a, b) {
	return a + b;
};
```

### Shorter Forms

Arrow functions have some shortcuts:

**One parameter? Parentheses are optional.**

```javascript
const double = (x) => {
	return x * 2;
};
```

**Single return statement? You can skip the braces and the `return` keyword.**

```javascript
const double = (x) => x * 2;
const add = (a, b) => a + b;
```

That last form is called an **implicit return**, and it's very common.

**No parameters? You still need the parentheses.**

```javascript
const greet = () => console.log('Hello!');
```

Arrow functions have a few subtle behavior differences from regular functions (specifically around something called `this`), but you don't need to worry about that as a beginner.

---

## Scope: Where Variables Live

**Scope** is the area of your code where a variable is accessible. Functions create their own scope.

```javascript
function myFunction() {
	let message = 'I live inside the function';
	console.log(message); // works
}

myFunction();
console.log(message); // ERROR: message is not defined
```

The variable `message` only exists inside `myFunction`. Once the function finishes, that variable is gone.

Variables declared outside any function are in the **global scope**, which means they can be accessed anywhere:

```javascript
let globalGreeting = 'Hello from outside';

function showGreeting() {
	console.log(globalGreeting); // works
}

showGreeting();
console.log(globalGreeting); // also works
```

> **Good habit:** Keep variables as local as you can. Functions that rely on a lot of global variables tend to cause bugs.

---

## Default Parameters

You can give parameters default values, which are used if no argument is passed:

```javascript
function greet(name = 'friend') {
	console.log(`Hello, ${name}!`);
}

greet('Jennifer'); // "Hello, Jennifer!"
greet(); // "Hello, friend!"
```

Default parameters make your functions more forgiving and easier to use.

---

## Common Beginner Mistakes

Here are the mistakes that trip up almost everyone learning functions:

**1. Forgetting the parentheses when calling a function.**

```javascript
function sayHi() {
	console.log('Hi!');
}

sayHi; // does nothing, just references the function
sayHi(); // actually calls it
```

**2. Confusing `console.log` with `return`.**

Logging shows you something on screen. Returning gives a value back to your code. They are different. If you need to use the result somewhere else, you need `return`.

**3. Trying to use a variable outside its scope.**

```javascript
function setup() {
	let count = 5;
}

console.log(count); // ERROR: count doesn't exist out here
```

**4. Putting code after a `return` statement.**

```javascript
function example() {
	return 'done';
	console.log('this never runs');
}
```

**5. Argument order mistakes.**

```javascript
function subtract(a, b) {
	return a - b;
}

subtract(3, 10); // -7, not 7
subtract(10, 3); // 7
```

**6. Naming a function with a verb that doesn't match what it does.**

Function names should describe the action: `calculateTotal`, `getUserName`, `isValidEmail`. Don't name a function `data` or `thing`. Future you (and your teammates) will thank you.

---

