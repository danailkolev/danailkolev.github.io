function displayVideoInIframe(videoUrl) {
        // Clear existing search results
        const resultsUl = document.getElementById('results');
        resultsUl.innerHTML = "";

        // Create the iframe element
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', videoUrl);
        iframe.setAttribute('width', '560'); // Adjust width as needed
        iframe.setAttribute('height', '315'); // Adjust height as needed
        iframe.setAttribute('frameborder', '0'); // Remove frame border
        iframe.setAttribute('id', 'videoFrame'); // Set the id
        iframe.setAttribute('allowfullscreen', ''); // Allow fullscreen

        // Append the iframe to the container (replace results list)
        const container = document.getElementById('iframe-container'); // Replace with your container ID
        container.appendChild(iframe);
    }
      
    // Function to delete every other element in an array
    function deleteEveryOther(arr) {
         return arr.filter((_, index) => index % 2 === 0);
    }
    
    function searchMovie() {
            // Get the list and empty it out before start and after every search
            const resultsUl = document.getElementById('results');
            while (resultsUl.firstChild) {
                resultsUl.removeChild(resultsUl.firstChild);
            }
            resultsUl.innerHTML = "";

            const existingIframe = document.getElementById('iframe-container');
            while (existingIframe.firstChild) {
                existingIframe.removeChild(existingIframe.firstChild);
            }
            existingIframe.innerHTML = "";

            // Get the search term from the search bar and encode it
            const searchTerm = document.getElementById('searchBar').value.toLowerCase();
            const encodedTerm = encodeURIComponent(searchTerm);

            // Scrape the TMDB website and get the results from the search
            fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.themoviedb.org/search?query=' + encodedTerm)}`)
                .then(response => response.json())
                .then(data => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data.contents, 'text/html');

                    // Scrape all h2 elements from the search, leave just the text content and add them to an array
                    const h2Elements = doc.querySelectorAll('h2');
                    const h2Texts = Array.from(h2Elements).map(h2 => h2.textContent.trim());

                    // Scrape all the "a" elements that have the class "result"
                    const aLinkElements = doc.querySelectorAll('.result');
                    const aLinks = Array.from(aLinkElements).map(a => a.href);

                    // Delete every other link because they are doubled because of the title and poster
                    const refinedALinks = deleteEveryOther(aLinks).map(link => `https://vidlink.pro${link.replace(/^https:\/\/danailkolev.github.io/, '')}`);
                    //const refinedALinks = deleteEveryOther(aLinks).map(link => `https://vidlink.pro${link.replace(/^file:\/\//, '')}`);

                    
                    // Get the list and populate it with the search results
                    const listContainer = document.getElementById('results');
                    h2Texts.forEach((text, index) => {
                        // Create the list item and the link
                        const listItem = document.createElement('li');
                        const listItemText = document.createElement('a');

                        // Add click event listener to the list item
                        listItem.addEventListener('click', (event) => {
                            // Prevent the default behavior
                            event.preventDefault();
                            
                            // Handle click event to display video in iframe
                            displayVideoInIframe(refinedALinks[index]);
                        });

                        // Add the link and text to the inner "a" element
                        listItemText.href = refinedALinks[index];
                        listItemText.textContent = text;

                        // Add the "a" element to the "li" element and the "li" element to the list
                        listItem.appendChild(listItemText);
                        listContainer.appendChild(listItem);
                    });
                })
                // Simple display of an error if it appears
                .catch(err => console.error('Error:', err));
    }
