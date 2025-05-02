const API_URL = 'https://apis-markdevs69v2.onrender.com/api/randomgambar/couplepp';
const songs = [
    'https://f.top4top.io/m_3335yz9lm1.mp3',
    'https://i.top4top.io/m_3328477of9.mp3',
    'https://e.top4top.io/m_3336uygem1.mp3',
    'https://b.top4top.io/m_33367ome01.mp3',
    'https://b.top4top.io/m_3336dxw3y1.mp3'
];

let currentSong = 0;
let isFirstPlay = true;
const audio = document.getElementById('backgroundMusic');
const playBtn = document.getElementById('playBtn');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initMusicPlayer() {
    shuffleArray(songs);
    audio.src = songs[currentSong];
    audio.loop = false;

    audio.addEventListener('ended', () => {
        currentSong = (currentSong + 1) % songs.length;
        audio.src = songs[currentSong];
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });

    document.addEventListener('click', function initMusic() {
        if (isFirstPlay) {
            audio.play().catch(() => {});
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isFirstPlay = false;
        }
        document.removeEventListener('click', initMusic);
    }, { once: true });
}

async function forceDownload(url, filename) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
        console.error('Download failed:', error);
        alert('Download failed. Please try again.');
    }
}

async function fetchDP() {
    try {
        document.querySelector('.loading').style.display = 'block';
        document.querySelector('.dp-container').style.display = 'none';

        const response = await axios.get(API_URL);
        // Corrected data access from response
        const result1 = response.data.result.male;  // Changed to response.data
        const result2 = response.data.result.female; // Changed to response.data

        // Refresh download buttons
        const download1 = document.getElementById('download1');
        const download2 = document.getElementById('download2');
        const newDownload1 = download1.cloneNode(true);
        const newDownload2 = download2.cloneNode(true);
        download1.replaceWith(newDownload1);
        download2.replaceWith(newDownload2);

        // Add event listeners to new buttons
        newDownload1.addEventListener('click', (e) => {
            e.preventDefault();
            forceDownload(male, `couple-male-${Date.now()}.jpg`);
        });

        newDownload2.addEventListener('click', (e) => {
            e.preventDefault();
            forceDownload(female, `couple-female-${Date.now()}.jpg`);
        });
        
        // Update image sources with correct variables
        document.getElementById('dp1').src = male;  // Fixed variable name
        document.getElementById('dp2').src = female;  // Fixed variable name

        document.querySelector('.loading').style.display = 'none';
        document.querySelector('.dp-container').style.display = 'flex';
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('.loading').textContent = 'Failed to load. Please try again.';
    }
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

initMusicPlayer();
fetchDP();
document.getElementById('refreshBtn').addEventListener('click', fetchDP);
