const proxyUrl = 'https://api.allorigins.win/get?url=';
        const csvUrl = encodeURIComponent('../TMDB.csv');
        let movies = [];

        // Load and parse the CSV file using the proxy server
        fetch(proxyUrl + csvUrl)
            .then(response => response.json())
            .then(data => {
                const csvData = data.contents;
                const lines = csvData.split('\n');
                lines.forEach(line => {
                    const [id, title] = line.split(',');
                    if (id && title) {
                        movies.push({ id: id.trim(), title: title.trim() });
                    }
                });
            })
            .catch(error => console.error('Error loading the CSV file:', error));

        function searchMovie() {
            const searchTerm = document.getElementById('searchBar').value.toLowerCase();
            const results = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
            displayResults(results);
        }

        function displayResults(results) {
            const resultsList = document.getElementById('results');
            resultsList.innerHTML = '';

            results.forEach(movie => {
                const listItem = document.createElement('li');
                listItem.textContent = `${movie.title} (ID: ${movie.id})`;
                listItem.onclick = () => updateVideoLink(movie.id);
                resultsList.appendChild(listItem);
            });
        }

        function updateVideoLink(movieId) {
            const baseUrl = 'https://vidlink.pro/tv/1434/';
            const videoUrl = `${baseUrl}${movieId}/?ref=mapple&icons=vid&autoplay=false&unmute=false&progress=0`;
            document.getElementById('videoFrame').src = videoUrl;
        }