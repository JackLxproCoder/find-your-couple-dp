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

// Shuffle songs array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialize music player
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
        const result1 = response.data.result.male;
        const result2 = response.data.result.female;

        const download1 = document.getElementById('download1');
        const download2 = document.getElementById('download2');
        download1.replaceWith(download1.cloneNode(true));
        download2.replaceWith(download2.cloneNode(true));

        document.getElementById('download1').addEventListener('click', (e) => {
            e.preventDefault();
            forceDownload(result1, `dp1_${Date.now()}.jpg`);
        });

        document.getElementById('download2').addEventListener('click', (e) => {
            e.preventDefault();
            forceDownload(result2, `dp2_${Date.now()}.jpg`);
        });
        
        document.getElementById('dp1').src = result1;
        document.getElementById('dp2').src = result2;

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
