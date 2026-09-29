// Exercise 3: Two independent web components communicate through an event.
// This works with the existing <div id="app"></div> in index.html.

        // This component is responsible only for requesting data, not displaying it.

        // fetch() does not reject for HTTP error responses such as 404 or 500.
        
        // Parsing JSON is asynchronous and can fail if the response is invalid.
        
        // detail carries the fetched data to any component listening for it.
        // bubbles allows the event to travel up to #app, where the display listens.
        
        // Report failures separately so the display can show an error message.


        // Set up the display before the fetcher is added to the page.

        // Sibling components cannot receive each other's events directly.
        // Listen on their shared parent, which receives the fetcher's bubbling event.

        // Remove listeners if this component is taken off the page.

        // Build DOM nodes rather than placing API values in HTML strings.

        // Show an error message if the fetcher fails to get data.

// Register both custom elements before inserting them into the page.

// Add the display first so its listeners exist before fetching starts.