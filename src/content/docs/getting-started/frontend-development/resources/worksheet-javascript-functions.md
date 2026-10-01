---
title: "JavaScript Functions Worksheet"
description: "Course resource: JavaScript Functions Worksheet"
---

**Instructions:** Open a fresh JavaScript file (or use the console at [playcode.io](https://playcode.io) or your browser's DevTools console). Try each problem on your own before checking the answer key at the bottom. If you get stuck, that's normal. Note where you got stuck and bring it up next class or in the channel.

For each problem, write the function **and** at least one line that calls it to prove it works.

---

## Problem 1

Write a function called `sayHello` that takes no parameters and prints `"Hello!"` to the console. Call it once.

---

## Problem 2

Write a function called `greetUser` that takes one parameter, `name`, and prints `"Hello, [name]!"` using a template literal. Call it with your own name.

---

## Problem 3

Write a function called `add` that takes two numbers as parameters and **returns** their sum. Call it with `5` and `7`, and print the result.

(Remember: `return`, not `console.log` inside the function.)

---

## Problem 4

Write a function called `square` that takes one number and returns it multiplied by itself. Call it with `6` and print the result.

---

## Problem 5

Write a function called `getArea` that takes a `width` and a `height` and returns the area of a rectangle (width times height). Call it with `4` and `5`, and print the result.

---

## Problem 6

Write a function called `isAdult` that takes an `age` and returns `true` if the age is 18 or older, and `false` if not. Call it with `20` and again with `15`, and print both results.

---

## Problem 7

Rewrite this function as an arrow function:

```javascript
function double(n) {
  return n * 2;
}
```

Call your arrow function with `8` and print the result.

---

## Problem 8

Write a function called `greet` that takes a `name` parameter with a default value of `"friend"`. If called with no argument, it should print `"Hello, friend!"`. If called with a name, it should print `"Hello, [name]!"`. Call it both ways.

---

## Problem 9

Write a function called `getFullName` that takes `firstName` and `lastName` and returns them combined with a space in between. Call it with your first and last name, and print the result.

---

## Problem 10 (Intermediate)

Write a function called `getDiscountPrice` that takes two parameters: `price` and `discountPercent`. It should return the final price after the discount is applied.

For example:
- `getDiscountPrice(100, 20)` should return `80` (100 minus 20%)
- `getDiscountPrice(50, 10)` should return `45` (50 minus 10%)

Call it twice with different values and print the results.

(Hint: a 20% discount means you pay 80% of the price. Think about how to express that in math.)

---
---

# Answer Key

> Don't peek until you've tried each problem.

### Problem 1

```javascript
function sayHello() {
  console.log("Hello!");
}

sayHello();
```

Don't forget the parentheses when calling it. `sayHello` (no parens) just references the function; `sayHello()` actually runs it.

### Problem 2

```javascript
function greetUser(name) {
  console.log(`Hello, ${name}!`);
}

greetUser("Jennifer");
```

Backticks (not quotes) for template literals. The `${name}` part gets replaced with whatever you passed in.

### Problem 3

```javascript
function add(a, b) {
  return a + b;
}

let result = add(5, 7);
console.log(result); // 12
```

The key thing here is `return`. If you used `console.log` inside the function instead, the function wouldn't give you a value back to use later. `return` hands the value back to wherever the function was called.

### Problem 4

```javascript
function square(n) {
  return n * n;
}

console.log(square(6)); // 36
```

You can also use `n ** 2` (the exponent operator), but `n * n` is fine for squaring.

### Problem 5

```javascript
function getArea(width, height) {
  return width * height;
}

console.log(getArea(4, 5)); // 20
```

Parameter order matters. `getArea(4, 5)` is not the same as `getArea(5, 4)` in general, even though for a rectangle the area happens to be the same either way.

### Problem 6

```javascript
function isAdult(age) {
  return age >= 18;
}

console.log(isAdult(20)); // true
console.log(isAdult(15)); // false
```

A common beginner version:

```javascript
function isAdult(age) {
  if (age >= 18) {
    return true;
  } else {
    return false;
  }
}
```

This works, but it's longer than it needs to be. `age >= 18` already evaluates to `true` or `false`, so you can just return it directly.

### Problem 7

```javascript
const double = (n) => {
  return n * 2;
};

console.log(double(8)); // 16
```

Or with implicit return (shorter form):

```javascript
const double = n => n * 2;
console.log(double(8)); // 16
```

Both are correct. The second uses two shortcuts: parentheses around a single parameter are optional, and if the function body is just one expression you can drop the braces and the `return` keyword.

### Problem 8

```javascript
function greet(name = "friend") {
  console.log(`Hello, ${name}!`);
}

greet();             // "Hello, friend!"
greet("Jennifer");   // "Hello, Jennifer!"
```

The `= "friend"` in the parameter list is the default value. It's used only when no argument is passed.

### Problem 9

```javascript
function getFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

console.log(getFullName("Jennifer", "Johnston")); // "Jennifer Johnston"
```

Note the space between `${firstName}` and `${lastName}` inside the template literal. That's what puts the space in the result. You could also do `return firstName + " " + lastName;` but the template literal is cleaner.

### Problem 10 (Intermediate)

```javascript
function getDiscountPrice(price, discountPercent) {
  let discountAmount = price * (discountPercent / 100);
  return price - discountAmount;
}

console.log(getDiscountPrice(100, 20)); // 80
console.log(getDiscountPrice(50, 10));  // 45
```

Or in one line:

```javascript
function getDiscountPrice(price, discountPercent) {
  return price - (price * (discountPercent / 100));
}
```

Or, a slicker version (paying the remaining percentage):

```javascript
function getDiscountPrice(price, discountPercent) {
  return price * (1 - discountPercent / 100);
}
```

All three return the same answer. The first version is the easiest to read when you're learning. The last is shorter but requires you to think about it ("if it's 20% off, I pay 80%, which is 1 minus 0.20").

The breakdown for `getDiscountPrice(100, 20)`:
- `discountPercent / 100` is `20 / 100`, which is `0.20`
- `price * 0.20` is `100 * 0.20`, which is `20` (the discount in dollars)
- `price - 20` is `80` (the final price)

---

**Done?** Send this back with your answers filled in, or just a note saying which problems you got stuck on. Either is useful.

