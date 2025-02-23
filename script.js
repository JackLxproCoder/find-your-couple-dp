const API_URL = 'https://api.zetsu.xyz/cdp';
const songs = [
    'https://f.top4top.io/m_3335yz9lm1.mp33',
    'https://i.top4top.io/m_3328477of9.mp3',
    'https://e.top4top.io/m_3336uygem1.mp3',
    'https://b.top4top.io/m_33367ome01.mp3',
    'https://b.top4top.io/m_3336dxw3y1.mp3',
];

let currentSong = 0;
const audio = document.getElementById('backgroundMusic');
const playBtn = document.getElementById('playBtn');
const refreshBtn = document.getElementById('refreshBtn');

// Initialize random song
audio.src = songs[Math.floor(Math.random() * songs.length)];

// Function to force download an image
function forceDownload(url, filename) {
    fetch(url)
        .then(response => response.blob()) // Convert the image to a Blob
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob); // Create a temporary URL for the Blob
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename; // Set the filename for the download
            document.body.appendChild(a);
            a.click(); // Trigger the download
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl); // Clean up the temporary URL
        })
        .catch(error => console.error('Error downloading image:', error));
}

async function fetchDP() {
    try {
        document.querySelector('.loading').style.display = 'block';
        document.querySelector('.dp-container').style.display = 'none';

        const response = await axios.get(API_URL);
        const result1 = response.data.result.one;
        const result2 = response.data.result.two;

        document.querySelector('.loading').style.display = 'none';
        document.querySelector('.dp-container').style.display = 'flex';

        // Set image sources
        document.getElementById('dp1').src = result1;
        document.getElementById('dp2').src = result2;

        // Add event listeners to download buttons
        const download1 = document.getElementById('download1');
        const download2 = document.getElementById('download2');

        download1.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            forceDownload(result1, 'dp1.jpg'); // Force download the image
        });

        download2.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            forceDownload(result2, 'dp2.jpg'); // Force download the image
        });
    } catch (error) {
        console.error('Error fetching DPs:', error);
        document.querySelector('.loading').textContent = 'Failed to load DPs. Please try again later.';
    }
}

refreshBtn.addEventListener('click', fetchDP);

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

audio.addEventListener('ended', () => {
    currentSong = (currentSong + 1) % songs.length;
    audio.src = songs[currentSong];
    audio.play();
});

// Start music when user interacts with page
document.addEventListener('click', function initMusic() {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    document.removeEventListener('click', initMusic);
}, { once: true });

fetchDP();