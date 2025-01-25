const episodesPerSeasonFamilyGuy = {
    1: 7,
    2: 21,
    3: 22,
    4: 30,
    5: 18,
    6: 12,
    7: 16,
    8: 21,
    9: 18,
    10: 23,
    11: 22,
    12: 21,
    13: 18,
    14: 20,
    15: 20,
    16: 20,
    17: 20,
    18: 20,
    19: 20,
    20: 20,
    21: 20,
    22: 17,
};

document.addEventListener('DOMContentLoaded', (event) => {
    function updateEpisodeOptions() {
        const season = document.getElementById('season').value;
        const episodeSelect = document.getElementById('episode');
        episodeSelect.innerHTML = ''; // Clear existing options

        const episodeCount = episodesPerSeasonFamilyGuy[season];
        for (let i = 1; i <= episodeCount; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            episodeSelect.appendChild(option);
        }
    }

    function updateVideoLink() {
        const season = document.getElementById('season').value;
        const episode = document.getElementById('episode').value;
        const baseUrl = 'https://vidlink.pro/tv/1434/';
        const videoUrl = `${baseUrl}${season}/${episode}/?ref=mapple&icons=vid&autoplay=false&unmute=false&progress=0`;
        document.getElementById('videoFrame').src = videoUrl;
    }

    window.updateEpisodeOptions = updateEpisodeOptions;
    window.updateVideoLink = updateVideoLink;

    // Initialize episode options for the default selected season
    updateEpisodeOptions();
});