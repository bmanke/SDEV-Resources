---
title: "JavaScript Glossary"
description: "Course resource: JavaScript Glossary"
---

The words your instructor uses, with plain-language definitions. If a sentence in class doesn't make sense, the problem is usually one of these terms. Look it up here.

> **Jump to:** [A](#a) · [B](#b) · [C](#c) · [D](#d) · [E](#e) · [F](#f) · [G](#g) · [H](#h) · [I](#i) · [L](#l) · [M](#m) · [N](#n) · [O](#o) · [P](#p) · [R](#r) · [S](#s) · [T](#t) · [U](#u) · [V](#v)
>
> Scroll to the bottom for [the three pairs that confuse everyone](#the-pairs-that-confuse-everyone).

---

## A

### Argument

The actual value you pass into a function when you call it.

```javascript
greet('Instructor'); // "Instructor" is the argument
```

Often confused with **parameter** (see below).

### Array

An ordered list of values, written with square brackets.

```javascript
let fruits = ['apple', 'banana', 'cherry'];
```

Items are accessed by their position (the **index**), starting at 0.

### Assign

To give a variable a value, using `=`.

```javascript
let x = 5; // assigns 5 to x
```

---

## B

### Boolean

A data type with only two possible values: `true` or `false`.

```javascript
let isActive = true;
let isDone = false;
```

---

## C

### Call (a function)

To run a function. Done by writing its name followed by parentheses.

```javascript
sayHello(); // calls the function
```

Also called **invoking**.

### camelCase

A naming style where the first word is lowercase and each following word starts with a capital. The standard for JavaScript variables and functions.

> Examples: `firstName`, `totalPrice`, `isLoggedIn`

### Comment

A note in your code that JavaScript ignores. For humans, not the computer.

```javascript
// single-line comment
/* multi-line
   comment */
```

### Concatenation

Joining strings together with `+`.

```javascript
'Hello, ' + name;
```

Template literals are usually cleaner.

### Condition

An expression that evaluates to true or false, used in `if` statements and loops.

```javascript
if (age >= 18) {
}
//  ^^^^^^^^^ this is the condition
```

### Console

The text-based output area in your browser's DevTools (or your code editor's terminal). Where `console.log` prints things.

### Constant

A variable declared with `const`. Its value cannot be reassigned.

```javascript
const PI = 3.14;
PI = 4; // ERROR
```

---

## D

### Declare

To create a variable using `let`, `const`, or `var`.

```javascript
let x; // declares x
let x = 5; // declares AND assigns
```

### Default value

A value a parameter uses if you don't pass anything in.

```javascript
function greet(name = 'friend') {}
//                  ^^^^^^^^^^ default value
```

### DOM

**Document Object Model.** The structure of an HTML page, which JavaScript can read and change.

---

## E

### Element

Two meanings depending on context:

- An HTML element like a button or paragraph
- One item in an array

### Equal (loosely vs strictly)

| Operator | Name            | Behavior                                |
| -------- | --------------- | --------------------------------------- |
| `==`     | Loose equality  | Does sneaky type conversion. **Avoid.** |
| `===`    | Strict equality | Compares value and type. **Use this.**  |

### Error

A message JavaScript shows when something goes wrong. Errors are helpful: they tell you what went wrong and usually where. See the error messages guide.

### Expression

Any piece of code that produces a value.

```javascript
5 + 3; // expression (produces 8)
name; // expression (produces the value of name)
age >= 18; // expression (produces true or false)
add(2, 3); // expression (produces the function's return)
```

---

## F

### Falsy

A value that counts as `false` in a condition, even though it isn't literally `false`.

> The falsy values: `false`, `0`, `""`, `null`, `undefined`, `NaN`
>
> **Everything else is truthy**, including `[]` and `{}`.

### Function

A reusable block of code that performs a task.

```javascript
function add(a, b) {
	return a + b;
}
```

---

## G

### Global scope

The outermost level of your code. Variables declared here are accessible everywhere.

> Try to keep variables out of the global scope when you can.

---

## H

### Hard-coded

A value written directly in the code instead of being passed in or calculated.

```javascript
let tax = 0.05; // hard-coded
let tax = getTaxRate(); // not hard-coded
```

### Hoisting

JavaScript's behavior of moving function declarations to the top of their scope, so you can call them before they appear in the file. Doesn't apply to `let`, `const`, or function expressions.

---

## I

### Index

The position of an item in an array. Starts at 0, not 1.

```javascript
let arr = ['a', 'b', 'c'];
//          0    1    2     <- indexes
```

### Initialize

To give a variable its first value.

```javascript
let count = 0; // count is initialized to 0
```

### Invoke

Another word for **call**.

```javascript
greet(); // invokes the function
```

---

## L

### Literal

A value written directly in the code.

```javascript
5; // number literal
('hello'); // string literal
true[(1, 2, 3)]; // boolean literal // array literal
{
	a: 1;
} // object literal
```

The opposite of a variable, which refers to a value indirectly.

### Logical operator

Operators that combine or invert booleans.

| Operator | Name | Meaning                   |
| -------- | ---- | ------------------------- |
| `&&`     | AND  | Both must be true         |
| `\|\|`   | OR   | At least one must be true |
| `!`      | NOT  | Flips true/false          |

### Loop

Code that repeats. Main kinds: `for`, `while`, `for...of`, `forEach`.

---

## M

### Method

A function attached to an object or value. The dot is the giveaway.

```javascript
'hello'.toUpperCase(); // toUpperCase is a method
myArr.push(5); // push is a method
```

### Modulo

The `%` operator. Returns the remainder of a division.

```javascript
10 % 3; // 1
10 % 2; // 0
```

> Useful for checking even/odd: `n % 2 === 0` is true when `n` is even.

### Mutate

To change something in place.

```javascript
arr.push(5); // mutates arr
arr.sort(); // mutates arr
'hi'.toUpperCase(); // does NOT mutate (returns a new string)
```

---

## N

### null

A value that means "intentionally empty." You set this yourself when you want to say "there's no value here, on purpose."

### Number

A data type for any number, whole or decimal.

```javascript
42; // number
3.14 - // number
	7; // number
```

---

## O

### Object

A collection of key-value pairs, written with curly braces.

```javascript
let person = { name: 'Jen', age: 30 };
```

Keys are like labels; values are the data.

### Operator

A symbol that performs an action.

> Examples: `+`, `-`, `*`, `/`, `===`, `&&`, `!`

---

## P

### Parameter

A placeholder name in a function definition.

```javascript
function greet(name) {}
//             ^^^^ parameter
```

When you call the function, you pass an **argument** that fills in for the parameter.

### Primitive

A basic data type.

> The primitives: `string`, `number`, `boolean`, `null`, `undefined`, `bigint`, `symbol`
>
> Compare to **reference types** (objects and arrays).

### Property

A key in an object.

```javascript
let obj = { name: 'Jen' };
//          ^^^^ property
```

---

## R

### Reassign

To give a variable a new value after it was already set.

```javascript
let x = 5;
x = 10; // reassigning

const y = 5;
y = 10; // ERROR: cannot reassign const
```

### Return

The keyword that sends a value back from a function.

```javascript
function add(a, b) {
	return a + b; // sends a + b back to the caller
}
```

Different from `console.log`, which just prints.

---

## S

### Scope

The region of code where a variable exists.

```javascript
function setup() {
	let count = 5; // count only exists inside setup()
}
console.log(count); // ERROR: out of scope
```

### Semicolon

The `;` character. Marks the end of a statement.

```javascript
let x = 5;
console.log(x);
```

Optional in many cases, but conventional to include.

### Statement

A single complete instruction.

```javascript
let x = 5; // statement
console.log(x); // statement
```

### String

A data type for text. Written in single quotes, double quotes, or backticks.

```javascript
'hello';
'hello'`hello`;
```

### Syntax

The rules of how to write code. A "syntax error" means you broke a rule.

---

## T

### Template literal

A string written with backticks that lets you embed variables.

```javascript
`Hello, ${name}!`;
```

Also lets you write multi-line strings naturally.

### Ternary

A short if/else written with `?` and `:`.

```javascript
let label = age >= 18 ? 'adult' : 'minor';
//                    ^ if true ^ if false
```

### Truthy

A value that counts as `true` in a condition, even though it isn't literally `true`.

> Everything that isn't **falsy** is truthy, including `[]` and `{}`.

### Type

The kind of data a value is: string, number, boolean, etc.

```javascript
typeof 'hello'; // "string"
typeof 42; // "number"
```

---

## U

### undefined

A value that means "this variable was declared but never given a value." JavaScript sets this automatically.

```javascript
let x;
console.log(x); // undefined
```

---

## V

### Variable

A named container for a value. Created with `let`, `const`, or `var`.

```javascript
let name = 'Jennifer';
//   ^^^^ the variable
```

---

## The Pairs That Confuse Everyone

These three pairs trip up almost everyone. If you remember nothing else, remember these.

### Parameter vs. Argument

| Term          | What it is           | Where it lives             |
| ------------- | -------------------- | -------------------------- |
| **Parameter** | The placeholder name | In the function definition |
| **Argument**  | The actual value     | In the function call       |

```javascript
function greet(name) {
	// 'name' is the parameter
	console.log(name);
}

greet('Jennifer'); // "Jennifer" is the argument
```

### Declare vs. Assign

| Term        | What it does         | Example      |
| ----------- | -------------------- | ------------ |
| **Declare** | Creates the variable | `let x;`     |
| **Assign**  | Gives it a value     | `x = 5;`     |
| **Both**    | Creates and sets it  | `let x = 5;` |

### `console.log` vs. `return`

| Method        | What it does                       | When you need it                      |
| ------------- | ---------------------------------- | ------------------------------------- |
| `console.log` | Displays a value on screen         | When you want to see something        |
| `return`      | Hands a value back from a function | When you want to use the result later |

```javascript
function addAndLog(a, b) {
	console.log(a + b); // prints to console
}

function addAndReturn(a, b) {
	return a + b; // gives the value back
}

let x = addAndLog(2, 3); // x is undefined (function didn't return)
let y = addAndReturn(2, 3); // y is 5 (function returned 5)
```

> **The rule:** If you want to use the result somewhere else in your code, you need `return`.

