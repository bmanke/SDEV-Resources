---
title: "When You're Stuck: A Protocol"
description: "Course resource: When You're Stuck: A Protocol"
---

Being stuck is part of programming. Every developer, from your first week to thirty years in, gets stuck. Building a good routine to run through when you solve problems is key to having success and moving forward. This is a good starter routine to start building those habits eary.

When you don't know what to do next, work through these steps in order. Don't skip ahead. Most problems are solved looking through your initial steps.

---

## Step 1: Read the Error Out Loud

If there's a red error message, read the whole thing. Out loud if you're alone. Note the **error type** and the **line number**.

Then go to that line and re-read your code.

About 60% of beginner "stuck" moments can be found here.

---

## Step 2: Check the Obvious

Before anything else, scan for:

- **Mismatched brackets.** Every `{` needs a `}`. Every `(` needs a `)`. Every `[` needs a `]`.
- **Mismatched quotes.** Don't open with `"` and close with `'`.
- **Typos.** `consol.log`, `retrun`, `lenght`. Spelling matters.
- **Capitalization.** `userName` and `username` are different variables.
- **Missing semicolons** at the ends of lines (less critical, but worth a glance).
- **Did you actually call the function?** `sayHello` is just the name. `sayHello()` runs it.

These five things cause more bugs than almost anything else.

---

## Step 3: console.log Everything

If your code runs but does the wrong thing, you need to see what your variables actually contain.

Add `console.log` lines on every important variable:

```javascript
function getDiscount(price, percent) {
	console.log('price is:', price);
	console.log('percent is:', percent);
	let discount = price * (percent / 100);
	console.log('discount is:', discount);
	return price - discount;
}
```

Then run it and read what gets printed. Reality is almost always different from what you assumed.

This is called "print debugging." and a very useful way to troubleshoot.

---

## Step 4: Re-Read the Problem

Go back to the original question or worksheet. Read it again, slowly.

Ask yourself:

- What is it actually asking for?
- What inputs go in?
- What should come out?
- Did I miss a word like "return" or "print" or "array of objects"?

---

## Step 5: Solve It Out of Code First

Close your code editor. Open a text file or grab paper.

Describe the solution in plain English, writing pseudo code if it helps.

For example, if the problem is "sum the numbers in an array":

```
1. Start with a total of zero.
2. Look at each number in the array.
3. Add it to the total.
4. After the last number, the total is the answer.
```

Now translate each English step into one line of code.

If you can't describe it in English, you're not going to be able to write it in code. The bottleneck is understanding, not syntax.

---

## Step 6: Make It Smaller

If you're trying to solve a big problem and nothing is working, solve a tiny version first.

Trying to loop through an array and apply a discount to each price? First, just log one price. Then log all the prices. Then apply a discount to one price. Then apply it to all of them.

Build up one tiny step at a time. Run your code after every step. If somethings breaks, you know exactly where the breakdown started.

---

## Step 7: Type It Again From Scratch

Sometimes the fastest fix is to delete the broken code and rewrite it. You'll often spot the bug as you retype, or find a cleaner approach.

---

## Step 8: Take a Break (Touch Grass)

Honestly. Walk away for 10 minutes. Get water. Look at something that isn't a screen, often times the solution shows up the moment you stop trying.

If you've been stuck for more than 30 minutes, take a break and focus on something else.

---

## Step 9: Ask for Help

If you're still stuck, ask. Ask anytime. Asking is part of how programmers work, not a sign you're behind.

To make it easier for someone to help you quickly, share these things together:

For example:

> "I'm trying to sum the numbers in this array. My code is below. I expected the result to be 60, but I got 0. Here's what console.log shows me..."

Include:

- What you're trying to do (in plain English)
- What you tried (the code)
- What you expected to happen
- What actually happened (the error or wrong output)
- What you've already tried

Writing this out often makes you solve it yourself before you hit send. Programmers have a name for this: **rubber duck debugging.** Explaining the problem to anyone, even an inanimate object, frequently reveals the answer.

---

## The Mindset

Being stuck is part of the learning process. It tells you exactly which concepts you don't fully understand yet.

The programmers who improve fastest are not the ones who never get stuck. They're the ones who get stuck, work the protocol, and move forward.

---

## Quick Version

Key takeaway:

1. Read the error
2. Check brackets and typos
3. console.log everything
4. Re-read the problem
5. Solve it in English first

Most problems can be resolved in those five steps.

