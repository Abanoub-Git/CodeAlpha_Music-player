const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');

const songs = [
    {
    title: 'Bad Bunny - DtMF ',
    artist: 'Peter Base',
    src: 'music/SSvid.net--Bad-Bunny-DtMF-Peter-Base-Afro-House-Remix.mp3'
    },
    {
    title: 'Yali Yali ',
    artist: 'Davido',
    src: 'music/SSvid.net--Yali-Yali-Murmusica-Remix.mp3'
    },
    {
    title: 'The Weeknd & Playboi Carti - Timeless ',
    artist: 'Theweeknd',
    src: 'music/SSvid.net--The-Weeknd-Playboi-Carti-Timeless-Tasty-Or-Not-Afro.mp3'
    },
    {
    title: 'Tasty Or Not - Oh La La La ',
    artist: 'Wizkid',
    src: 'music/SSvid.net--Tasty-Or-Not-Oh-La-La-La-Hot-Summer.mp3'
    },
    {
    title: 'David Guetta ft Sia - Titanium',
    artist: 'David Guetta',
    src: 'music/SSvid.net--David-Guetta-ft-Sia-Titanium-Vani-Afro-House-Remix.mp3'
    }
];

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    title.textContent = song.title;
    artist.textContent = song.artist;
    updatePlaylist();
}

function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.textContent = '⏸️';
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = '▶️';
}

playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
    }
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener('input', () => {
    audio.volume = volume.value;
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updatePlaylist() {
    playlistEl.innerHTML = '';
    songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    if (index === currentSongIndex) li.classList.add('active');
    li.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(index);
        playSong();
    });
    playlistEl.appendChild(li);
    });
}

audio.addEventListener('ended', () => {
    nextBtn.click();
});

loadSong(currentSongIndex);
