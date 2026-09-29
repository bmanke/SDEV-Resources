# SDEV2150 — Lesson 06: Component and Asynchronous Programming Exercises

These exercises reinforce the asynchronous programming and web component concepts introduced in Lessons 02 through 05. Complete the practical coding challenges to build your mastery of Promises, `async`/`await`, custom events, and API integration within reusable web components.

Several exercises use the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/).

## Exercise 1: API Data Display Component

**Goal:** Combine asynchronous data fetching with dynamic rendering.

### Instructions

1. Build a `<user-list>` component that retrieves and displays users from the [users endpoint](https://jsonplaceholder.typicode.com/users).
2. Add a **Reload Data** button that triggers a new fetch when clicked.
3. Display loading and error states to improve the user experience.

**Key concepts:** `fetch()`, `async`/`await`, DOM updates, event handling.

## Exercise 2: Chained Promise Sequence

**Goal:** Practice sequential asynchronous logic using Promise chaining.

### Instructions

1. Fetch a list of posts from the [posts endpoint](https://jsonplaceholder.typicode.com/posts).
2. Use the first post's ID to fetch its comments from `https://jsonplaceholder.typicode.com/comments?postId={id}`.
3. Display the post title and its comments dynamically.
4. Handle network or parsing errors gracefully.

**Key concepts:** Promise chaining, sequential fetches, error handling.

## Exercise 3: Custom Event Integration

**Goal:** Reinforce communication between decoupled components.

### Instructions

1. Create two components: `<data-fetcher>` to fetch data and `<data-display>` to render it.
2. When fetching completes, dispatch a custom event named `data-loaded` containing the data.
3. Ensure `<data-display>` listens for the event and updates the UI accordingly.
4. Choose any endpoints you like from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/).

**Key concepts:** Custom events, event dispatching, component communication.

## Exercise 4: Parallel API Requests

**Goal:** Demonstrate control over concurrent asynchronous operations.

### Instructions

1. Write a function that requests data from two APIs at the same time using `Promise.all()`.
2. Display both datasets after both requests succeed.
3. Use `Promise.allSettled()` to show results when one request fails.

**Key concepts:** `Promise.all()`, `Promise.allSettled()`, concurrency, error handling.