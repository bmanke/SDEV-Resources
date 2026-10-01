---
title: "JavaScript Syntax: A Beginner's Guide"
description: "Course resource: JavaScript Syntax: A Beginner's Guide"
---

Syntax is a set of rules for how you write code so the computer can understand it. Think of it like grammar in English: if you put the words in the wrong order or forget your punctuation, the meaning gets lost. JavaScript has its own grammar, and this guide will help to walk you through it.

---

## Table of Contents

1. [What Is Syntax?](#what-is-syntax)
2. [Statements and Semicolons](#statements-and-semicolons)
3. [Comments](#comments)
4. [Variables: var, let, and const](#variables-var-let-and-const)
5. [Data Types](#data-types)
6. [Operators](#operators)
7. [Strings and Template Literals](#strings-and-template-literals)
8. [Arrays](#arrays)
9. [Objects](#objects)
10. [Conditionals: if, else, and switch](#conditionals-if-else-and-switch)
11. [Loops](#loops)
12. [Truthy and Falsy Values](#truthy-and-falsy-values)
13. [Common Beginner Mistakes](#common-beginner-mistakes)
14. [Practice Exercises](#practice-exercises)

---

## What Is Syntax?

Syntax is the rules of the language. JavaScript cares about things like:

- Spelling keywords correctly (`function`, not `Funktion`)
- Matching your brackets and quotes (every `{` needs a `}`, every `"` needs another `"`)
- Putting things in the right order
- Using the right punctuation between statements

When you break a syntax rule, JavaScript throws a **SyntaxError** and refuses to run your code.

---

## Statements and Semicolons

A **statement** is a single instruction. Most js developers end JavaScript statements end with a semicolon `;`.

```javascript
let name = 'Jennifer';
console.log(name);
let age = 30;
```

JavaScript can usually figure out where statements end on its own (this is called Automatic Semicolon Insertion), so semicolons are technically optional in many cases. But putting them in is the safer, more conventional habit. It also makes your code clearer.

```javascript
// This works
let x = 5;
let y = 10;

// This is the recommended style
let x = 5;
let y = 10;
```

---

## Comments

Comments are notes you leave in your code for other developers. JavaScript does not read comments.

```javascript
// This is a single-line comment

/* This is a
   multi-line comment.
   Useful for longer explanations. */

let price = 100; // You can also put comments at the end of a line
```

Use comments to explain **why** something is happening, not **what** is happening. The code itself shows what; comments should add context that the code can't.

```javascript
// Bad: just restates the code
let total = price * 1.05; // multiply price by 1.05

// Good: explains the reason
let total = price * 1.05; // adds 5% GST for Alberta orders
```

---

## Variables: var, let, and const

Variables are containers for storing data. JavaScript has three keywords for creating them.

### const

Use `const` when the value should not change.

```javascript
const PI = 3.14159;
const myName = 'Jennifer';
```

If you try to reassign a `const`, you'll get an error:

```javascript
const x = 5;
x = 10; // ERROR: Assignment to constant variable
```

### let

Use `let` when the value will change later.

```javascript
let score = 0;
score = score + 10;
score = score + 5;
console.log(score); // 15
```

### var

`var` is the old way. It still works, but it has some quirky behavior that causes bugs. You'll see it in older code, but in anything new, prefer `let` and `const`.

### Which Should You Use?

A simple rule:

- Start with `const`.
- If you discover you need to reassign the variable, change it to `let`.
- Avoid `var` in new code.

### Naming Variables

- Use **camelCase**: `firstName`, `totalPrice`, `isLoggedIn`.
- Names can contain letters, digits, `$`, and `_`, but can't start with a digit.
- Names are case-sensitive: `myName` and `myname` are different.
- Pick descriptive names. `x` and `data` tell you nothing; `userAge` and `cartItems` give you good context.

---

## Data Types

JavaScript has a handful of built-in data types. The ones you'll use constantly:

### Primitive Types

```javascript
// String: text
let name = 'Jennifer';
let greeting = 'Hello';

// Number: any number, whole or decimal
let age = 30;
let price = 19.99;

// Boolean: true or false
let isActive = true;
let isDone = false;

// Undefined: a variable declared but not assigned a value
let something;
console.log(something); // undefined

// Null: an intentional "nothing"
let empty = null;
```

### Reference Types

```javascript
// Array: an ordered list
let colors = ['red', 'green', 'blue'];

// Object: a collection of key-value pairs
let person = { name: 'Jennifer', age: 30 };
```

We'll cover arrays and objects in their own sections below.

### Checking a Type

The `typeof` operator tells you what type a value is:

```javascript
typeof 'hello'; // "string"
typeof 42; // "number"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof [1, 2, 3]; // "object" (arrays are technically objects)
typeof { a: 1 }; // "object"
```

Note that `typeof null` returns `"object"`. That's a famous historical bug in JavaScript.

---

## Operators

Operators are symbols that perform actions on values.

### Arithmetic Operators

```javascript
let a = 10;
let b = 3;

a + b; // 13 (addition)
a - b; // 7  (subtraction)
a * b; // 30 (multiplication)
a / b; // 3.333... (division)
a % b; // 1  (remainder, also called modulo)
a ** b; // 1000 (exponent, a to the power of b)
```

The `%` (modulo) operator is more useful than it looks. `n % 2 === 0` tells you if `n` is even.

### Assignment Operators

```javascript
let x = 5;

x += 3; // same as x = x + 3 (x is now 8)
x -= 2; // same as x = x - 2 (x is now 6)
x *= 4; // same as x = x * 4 (x is now 24)
x /= 2; // same as x = x / 2 (x is now 12)
```

### Comparison Operators

These return a boolean (`true` or `false`).

```javascript
5 === 5; // true  (strictly equal)
5 === '5'; // false (different types)
5 == '5'; // true  (loosely equal, coerces types)
5 !== 3; // true  (strictly not equal)
5 > 3; // true  (greater than)
5 < 3; // false (less than)
5 >= 5; // true  (greater than or equal)
5 <= 4; // false (less than or equal)
```

> **Strong recommendation:** Always use `===` and `!==`, not `==` and `!=`. The double-equals version does sneaky type conversions that lead to weird bugs. The triple-equals version compares both value and type, which is almost always what you actually want.

### Logical Operators

```javascript
true && true; // true  (AND: both must be true)
true && false; // false
true || false; // true  (OR: at least one must be true)
false || false; // false
!true; // false (NOT: flips the boolean)
!false; // true
```

You'll use these in conditionals:

```javascript
let age = 25;
let hasLicense = true;

if (age >= 18 && hasLicense) {
	console.log('You can drive.');
}
```

---

## Strings and Template Literals

Strings can be wrapped in single quotes, double quotes, or backticks.

```javascript
let a = 'double quotes';
let b = 'single quotes';
let c = `backticks`;
```

Single and double quotes are interchangeable. Pick one style. Backticks are special: they enable **template literals**.

### Template Literals

Template literals (backticks) let you do two useful things:

**1. Embed variables directly with `${}`.**

```javascript
let name = 'Jennifer';
let age = 30;

// Old way: clunky string concatenation
let message1 = 'My name is ' + name + ' and I am ' + age + '.';

// Modern way: template literal
let message2 = `My name is ${name} and I am ${age}.`;
```

Both produce the same string, but the second one is much easier to read.

**2. Write multi-line strings.**

```javascript
let poem = `Roses are red,
Violets are blue,
Coding is great,
And so are you.`;
```

With regular quotes, you'd have to use `\n` for newlines and concatenate.

```javascript
let poem2 = 'this is line 1 \n this is line 2 \n this is line 3';
```

### Useful String Methods

```javascript
let text = 'Hello, World!';

text.length; // 13
text.toUpperCase(); // "HELLO, WORLD!"
text.toLowerCase(); // "hello, world!"
text.includes('World'); // true
text.replace('World', 'JavaScript'); // "Hello, JavaScript!"
text.slice(0, 5); // "Hello"
text.trim(); // removes whitespace from both ends
```

Strings are **immutable**, meaning these methods don't change the original string; they return a new one.

---

## Arrays

An array is an ordered list of values.

```javascript
let fruits = ['apple', 'banana', 'cherry'];
```

### Accessing Items

Arrays are zero-indexed: the first item is at position 0.

```javascript
fruits[0]; // "apple"
fruits[1]; // "banana"
fruits[2]; // "cherry"
fruits[3]; // undefined (doesn't exist)

fruits.length; // 3
```

### Changing and Adding Items

```javascript
let fruits = ['apple', 'banana', 'cherry'];

fruits[1] = 'blueberry'; // changes "banana" to "blueberry"
fruits.push('date'); // adds to the end
fruits.pop(); // removes from the end
fruits.unshift('apricot'); // adds to the beginning
fruits.shift(); // removes from the beginning
```

### Looping Through an Array

```javascript
let fruits = ['apple', 'banana', 'cherry'];

// Classic for loop
for (let i = 0; i < fruits.length; i++) {
	console.log(fruits[i]);
}

// Cleaner: for...of loop
for (const fruit of fruits) {
	console.log(fruit);
}

// Even cleaner for many cases: forEach
fruits.forEach((fruit) => {
	console.log(fruit);
});
```

Arrays can hold any type of data, including mixing types or holding other arrays:

```javascript
let mixed = [1, 'two', true, null, [3, 4]];
```

---

## Objects

An object is a collection of **key-value pairs**. Where an array is an ordered list, an object is a labeled grouping.

```javascript
let person = {
	name: 'Jennifer',
	age: 30,
	city: 'Edmonton',
	isDeveloper: true,
};
```

### Accessing Properties

Two ways:

```javascript
person.name; // "Jennifer" (dot notation)
person['name']; // "Jennifer" (bracket notation)
```

Dot notation is cleaner and more common. Bracket notation is needed when the key has special characters or is stored in a variable:

```javascript
let key = 'age';
person[key]; // 30
```

### Adding and Changing Properties

```javascript
person.age = 31; // change existing
person.email = 'j@x.com'; // add new
delete person.city; // remove
```

### Nested Objects

Objects can contain other objects:

```javascript
let user = {
	name: 'Jennifer',
	address: {
		city: 'Edmonton',
		province: 'Alberta',
	},
};

user.address.city; // "Edmonton"
```

### Looping Through an Object

```javascript
for (const key in person) {
	console.log(`${key}: ${person[key]}`);
}
```

---

## Conditionals: if, else, and switch

Conditionals let your code make decisions.

### if / else if / else

```javascript
let temperature = 15;

if (temperature > 25) {
	console.log("It's hot.");
} else if (temperature > 10) {
	console.log("It's mild.");
} else {
	console.log("It's cold.");
}
```

The braces hold the code that runs if the condition is true. JavaScript evaluates each condition in order and runs the first matching block.

### Ternary Operator

A shorthand for simple if/else, useful when you're choosing between two values:

```javascript
let age = 20;
let status = age >= 18 ? 'adult' : 'minor';
```

Read it as: "is age >= 18? if yes, 'adult'; if no, 'minor'."

Don't overuse this for complex logic. It's great for one-liners and confusing for anything bigger.

### switch

When you're comparing one value against many possible options, `switch` can be cleaner than a long chain of `else if`:

```javascript
let day = 'Tuesday';

switch (day) {
	case 'Monday':
		console.log('Start of the week');
		break;
	case 'Tuesday':
	case 'Wednesday':
	case 'Thursday':
		console.log('Midweek');
		break;
	case 'Friday':
		console.log('Almost weekend');
		break;
	default:
		console.log('Weekend');
}
```

The `break` keyword is important. Without it, execution falls through to the next case, which is occasionally useful but usually a bug.

---

## Loops

Loops repeat code multiple times.

### for Loop

The classic, when you know how many times you want to loop:

```javascript
for (let i = 0; i < 5; i++) {
	console.log(i); // 0, 1, 2, 3, 4
}
```

The three parts inside the parentheses:

1. **Initialize**: `let i = 0` (runs once at the start)
2. **Condition**: `i < 5` (checked before each iteration)
3. **Update**: `i++` (runs after each iteration; `i++` means "add 1 to i")

### while Loop

When you don't know how many times you'll loop, but you have a condition:

```javascript
let count = 0;
while (count < 5) {
	console.log(count);
	count++;
}
```

Be careful: if your condition never becomes false, you've created an **infinite loop** and your program will hang.

### for...of Loop

The cleanest way to loop through arrays:

```javascript
const colors = ['red', 'green', 'blue'];

for (const color of colors) {
	console.log(color);
}
```

### break and continue

- `break` exits a loop entirely.
- `continue` skips the current iteration and moves to the next.

```javascript
for (let i = 0; i < 10; i++) {
	if (i === 5) break; // stop completely at 5
	if (i % 2 === 0) continue; // skip even numbers
	console.log(i); // prints 1, 3
}
```

---

## Truthy and Falsy Values

In conditions, JavaScript will convert non-boolean values to `true` or `false`. The values that count as `false` are:

- `false`
- `0`
- `""` (empty string)
- `null`
- `undefined`
- `NaN` (Not a Number)

Everything else is "truthy", including empty arrays `[]` and empty objects `{}` (which trips people up).

```javascript
if ('hello') {
	/* runs */
}
if (0) {
	/* doesn't run */
}
if ([]) {
	/* runs! arrays are truthy even when empty */
}
if (null) {
	/* doesn't run */
}
```

This lets you write concise checks:

```javascript
let name = '';

if (!name) {
	console.log('Please enter a name');
}
```

---

## Common Beginner Mistakes

**1. Using `=` when you mean `===`.**

```javascript
if ((x = 5)) {
} // assigns 5 to x and is always truthy
if (x === 5) {
} // actually checks equality
```

**2. Forgetting that arrays are zero-indexed.**

The first item is at index `0`, not `1`. The last item is at `length - 1`.

**3. Mismatched brackets and quotes.**

Every `{` needs a `}`. Every `(` needs a `)`. Every `"` needs another `"`. Code editors highlight matching pairs; use that to your advantage.

**4. Mixing up `null` and `undefined`.**

- `undefined` means "no value has been assigned yet" (JavaScript sets this automatically).
- `null` means "intentionally empty" (you set this yourself).

**5. Trying to reassign a `const`.**

```javascript
const x = 5;
x = 10; // ERROR
```

If you need to reassign, use `let`.

**6. Forgetting `break` in a `switch`.**

Without `break`, execution falls through to the next case.

**7. Off-by-one errors in loops.**

```javascript
// Wrong: misses the last element
for (let i = 0; i < arr.length - 1; i++) {}

// Right
for (let i = 0; i < arr.length; i++) {}
```

**8. Using `==` instead of `===`.**

This causes type coercion surprises like `0 == ""` being `true`. Just use `===`.

---

## Practice Exercises

**1.** Declare a variable for your name, your age, and whether you like coffee. Use the right keyword (`const` or `let`) for each.

**2.** Create an array of your three favorite foods. Print the second one to the console.

**3.** Create an object representing a book, with properties for title, author, and pages. Print the author using dot notation.

**4.** Write an `if/else if/else` chain that takes a number from 0 to 100 and prints "fail" (under 50), "pass" (50 to 79), or "honors" (80 and up).

**5.** Use a `for` loop to print the numbers 1 through 10.

**6.** Use a `for...of` loop to print each item in an array of colors.

**7.** Given the string `"Hello, World!"`, use string methods to print it in all uppercase and find its length.

**8.** Write a conditional that uses the ternary operator to set a variable to `"even"` or `"odd"` based on a number.

---

## Quick Reference

```javascript
// Variables
const PI = 3.14;
let count = 0;

// Strings
let name = 'Jennifer';
let greeting = `Hello, ${name}`;

// Arrays
let list = [1, 2, 3];
list.push(4);
list[0]; // 1

// Objects
let user = { name: 'Jen', age: 30 };
user.name; // "Jen"

// Conditionals
if (x === 5) {
	// ...
} else if (x > 5) {
	// ...
} else {
	// ...
}

// Ternary
let result = x > 0 ? 'positive' : 'non-positive';

// Loops
for (let i = 0; i < 5; i++) {}
for (const item of array) {
}
while (condition) {}

// Comparisons (always use ===)
a === b;
a !== b;
(a > b, a < b, a >= b, a <= b);

// Logical
a && b; // AND
a || b; // OR
!a; // NOT
```

---

## What's Next?

Once this syntax feels comfortable, the next things to learn are:

- **Functions** (if you haven't already covered them, this is the next big step)
- **Array methods** like `map`, `filter`, `reduce`, and `find`
- **The DOM** (manipulating HTML with JavaScript)
- **Events** (responding to clicks, typing, and other user actions)
- **Async JavaScript** (promises, `async`/`await`, fetching data)

Syntax is the alphabet. Once you have it, you can start writing real sentences and eventually real stories. Keep practicing the basics until they feel automatic, because everything else builds on them.

