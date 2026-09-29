// Define a custom HTML element that can be used as <user-list>.

        // Give this component its own DOM so its styles and content stay isolated.

        // Keep references to elements that will change as data is fetched.

        // Keep a stable function reference so the listener can be removed later.

    // Runs when <user-list> is added to the page.
    // Load users automatically the first time.

    // Clean up the button listener if the component is removed from the page.

        // Show a loading state and prevent repeated clicks while the request runs.

            // await pauses this method until fetch returns an HTTP response.

            // fetch only rejects for request failures; HTTP errors need this check.

            // Convert the response body from JSON into a JavaScript value.

            // Create an <li> for each user. textContent inserts API values as text,
            // rather than interpreting them as HTML.

            // Replace the list contents with the newly fetched users.

            // Network failures, HTTP errors, and invalid JSON all arrive here.

            // Always re-enable Reload Data, whether the request succeeds or fails.

// Register the class so the browser recognizes <user-list> in HTML.
