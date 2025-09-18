document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('video-search-input');
    const videoItems = document.querySelectorAll('.video-item');
    const noResultsMessage = document.getElementById('no-results-message');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            let resultsFound = false;

            videoItems.forEach(item => {
                const keywords = item.dataset.keywords.toLowerCase();
                if (keywords.includes(searchTerm)) {
                    item.style.display = 'block';
                    resultsFound = true;
                } else {
                    item.style.display = 'none';
                }
            });

            if (noResultsMessage) {
                noResultsMessage.style.display = resultsFound ? 'none' : 'block';
            }
        });
    }
});
