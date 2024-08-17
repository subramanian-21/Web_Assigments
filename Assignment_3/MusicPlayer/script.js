document.getElementById("folder-open").addEventListener('change', (e) => {
    handleFileUpload(e.target.files);
});

let currentTrackIndex = 0;
let tracks = [];
let isPlaying = false;
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');

async function handleFileUpload(files) {
    const musicContainer = document.querySelector('.all-music-body');

    for (const file of files) {
        if (file.type.startsWith('audio/')) {
            jsmediatags.read(file, {
                onSuccess: function (tag) {
                    const tags = tag.tags;
                    const trackName = tags.title || file.name;
                    const artist = tags.artist || 'Unknown Artist';
                    const album = tags.album || 'Unknown Album';
                    let pictureBlob = null;

                    if (tags.picture) {
                        const picData = tags.picture.data;
                        const picFormat = tags.picture.format;
                        const byteArray = new Uint8Array(picData);
                        pictureBlob = new Blob([byteArray], { type: picFormat });
                    }

                    tracks.push({ file, trackName, artist, album, pictureBlob });
                    createMusicElement(trackName, artist, pictureBlob);
                },
                onError: function (error) {
                    console.log('Error reading metadata', error);
                }
            });
        }
    }
}

function createMusicElement(trackName, artist, pictureBlob) {
    const musicDiv = document.createElement('div');
    musicDiv.classList.add('m-player-body');
    musicDiv.style.position = "relative"
    musicDiv.style.fontSize = "40px"

    if (pictureBlob) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(pictureBlob);
        img.classList.add('album-art');
        musicDiv.appendChild(img);
    }

    const text = document.createElement('div');
    text.classList.add('track-info');
    text.textContent = `${trackName} - ${artist}`;
    musicDiv.appendChild(text);

    musicDiv.addEventListener('click', () => {
        const index = Array.from(musicDiv.parentNode.children).indexOf(musicDiv);
        playTrack(index);
    });

    document.getElementById("all-music-body").append(musicDiv);
}

function playTrack(index) {
    currentTrackIndex = index;
    const track = tracks[currentTrackIndex];

    const url = URL.createObjectURL(track.file);
    audioPlayer.src = url;
    audioPlayer.play();

    document.getElementById('current-track').textContent = `${track.trackName} - ${track.artist}`;
    
    if (track.pictureBlob) {
        document.getElementById('album-art').src = URL.createObjectURL(track.pictureBlob);

    } else {
        document.getElementById('album-art').src = '';
    }

    isPlaying = true;
    playPauseBtn.innerText = 'II';
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.innerText = '>';
    } else {
        audioPlayer.play();
        playPauseBtn.innerText = 'II';
    }
    isPlaying = !isPlaying;
});

document.getElementById('prev-track').addEventListener('click', () => {
    if (currentTrackIndex > 0) {
        playTrack(currentTrackIndex - 1);
    }
});

document.getElementById('next-track').addEventListener('click', () => {
    if (currentTrackIndex < tracks.length - 1) {
        playTrack(currentTrackIndex + 1);
    }
});

audioPlayer.addEventListener('ended', () => {
    if (currentTrackIndex < tracks.length - 1) {
        playTrack(currentTrackIndex + 1);
    } else {
        playPauseBtn.textContent = '>';
        isPlaying = false;
    }
});
