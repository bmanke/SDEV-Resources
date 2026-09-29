// This file works with the existing <div id="app"></div> in index.html.

// Create the page elements once; the API data will be inserted later.

// Keep the HTTP check and JSON parsing in one place for both requests.
// fetch() can fulfill even when the server responds with an HTTP error.

    // response.json() returns a Promise and may reject if the JSON is invalid.

    // Step 1: Request the posts and convert the response to JavaScript data.
            // Stop the chain if the API did not return a usable first post.

            // Step 2: Start the comments request only after the posts are available.
            // Returning its Promise makes the next .then() wait for its result.

            // Use textContent so API text is displayed instead of treated as HTML.

            // Build each comment as DOM elements, then add them to the list.

            // Network errors, HTTP failures, invalid JSON, and unexpected data
            // all end up here instead of leaving the page stuck on "Loading".

// Start the sequence as soon as the module runs.
