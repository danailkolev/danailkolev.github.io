function searchMovie() {
        const searchTerm = document.getElementById('searchBar').value.toLowerCase();
        const encodedTerm = encodeURIComponent(searchTerm);
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.themoviedb.org/search?query=' + encodedTerm)}`)
                .then(response => response.json())
                .then(data => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data.contents, 'text/html');
                    const h2Elements = doc.querySelectorAll('h2');
                    const h2Texts = Array.from(h2Elements).map(h2 => h2.textContent.trim());

                    const listContainer = document.getElementById('results');
                    h2Texts.forEach(text => {
                        const listItem = document.createElement('li');
                        listItem.textContent = text;
                        listContainer.appendChild(listItem);
                    });

                    document.body.appendChild(listContainer);
                })
                .catch(err => console.error('Error:', err));
}
