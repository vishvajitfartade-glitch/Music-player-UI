// ==========================================
// SURTAAL - HINDI MUSIC PLAYER
// ==========================================


// Audio element
const audio = document.getElementById("audio");


// Buttons
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const shuffleBtn =
    document.getElementById("shuffleBtn");

const repeatBtn =
    document.getElementById("repeatBtn");


// Progress
const progressBar =
    document.getElementById("progressBar");

const volumeBar =
    document.getElementById("volumeBar");

const currentTimeElement =
    document.getElementById("currentTime");

const durationElement =
    document.getElementById("duration");


// Song information
const songTitle =
    document.getElementById("songTitle");

const artistName =
    document.getElementById("artistName");


// Playlist
const playlistContainer =
    document.getElementById("playlistContainer");


// Album
const albumArt =
    document.getElementById("albumArt");


// Song count
const songCount =
    document.getElementById("songCount");


// ==========================================
// SONG LIST
// ==========================================

const songs = [

    {
        title: "Kesariya",
        artist: "Arijit Singh",
        url: "songs/kesariya.mp3"
    },

    {
        title: "Apna Bana Le",
        artist: "Arijit Singh",
        url: "songs/apna-bana-le.mp3"
    },

    {
        title: "Tum Kya Mile",
        artist: "Arijit Singh",
        url: "songs/tum-kya-mile.mp3"
    },

    {
        title: "O Maahi",
        artist: "Arijit Singh",
        url: "songs/o-maahi.mp3"
    },

    {
        title: "Heeriye",
        artist: "Jasleen Royal",
        url: "songs/heeriye.mp3"
    }

];


// ==========================================
// VARIABLES
// ==========================================

let currentSongIndex = 0;

let isPlaying = false;

let isShuffle = false;

let isRepeat = false;


// ==========================================
// LOAD SONG
// ==========================================

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent =
        song.title;

    artistName.textContent =
        song.artist;

    audio.src =
        song.url;

    audio.load();

    updatePlaylist();
}


// ==========================================
// PLAY SONG
// ==========================================

function playSong() {

    audio.play()
        .then(() => {

            isPlaying = true;

            updatePlayButton();

            albumArt.classList.add(
                "playing"
            );

        })
        .catch((error) => {

            console.log(
                "Audio playback error:",
                error
            );

        });
}


// ==========================================
// PAUSE SONG
// ==========================================

function pauseSong() {

    audio.pause();

    isPlaying = false;

    updatePlayButton();

    albumArt.classList.remove(
        "playing"
    );
}


// ==========================================
// PLAY / PAUSE BUTTON
// ==========================================

playBtn.addEventListener(
    "click",
    () => {

        if (isPlaying) {

            pauseSong();

        } else {

            playSong();

        }

    }
);


// ==========================================
// UPDATE PLAY BUTTON
// ==========================================

function updatePlayButton() {

    if (isPlaying) {

        playBtn.innerHTML =
            '<i class="fa-solid fa-pause"></i>';

        playBtn.title =
            "Pause";

    } else {

        playBtn.innerHTML =
            '<i class="fa-solid fa-play"></i>';

        playBtn.title =
            "Play";

    }
}


// ==========================================
// NEXT SONG
// ==========================================

function nextSong() {

    if (isShuffle) {

        let randomIndex;

        do {

            randomIndex =
                Math.floor(
                    Math.random() *
                    songs.length
                );

        }
        while (
            randomIndex === currentSongIndex &&
            songs.length > 1
        );

        currentSongIndex =
            randomIndex;

    } else {

        currentSongIndex++;

        if (
            currentSongIndex >=
            songs.length
        ) {

            currentSongIndex = 0;

        }

    }

    loadSong(
        currentSongIndex
    );

    playSong();
}


// ==========================================
// PREVIOUS SONG
// ==========================================

function previousSong() {

    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex =
            songs.length - 1;

    }

    loadSong(
        currentSongIndex
    );

    playSong();
}


nextBtn.addEventListener(
    "click",
    nextSong
);

prevBtn.addEventListener(
    "click",
    previousSong
);


// ==========================================
// AUDIO TIME UPDATE
// ==========================================

audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration) {
            return;
        }

        const progress =
            (
                audio.currentTime /
                audio.duration
            ) * 100;

        progressBar.value =
            progress;

        currentTimeElement.textContent =
            formatTime(
                audio.currentTime
            );

    }
);


// ==========================================
// AUDIO DURATION
// ==========================================

audio.addEventListener(
    "loadedmetadata",
    () => {

        durationElement.textContent =
            formatTime(
                audio.duration
            );

    }
);


// ==========================================
// PROGRESS BAR SEEK
// ==========================================

progressBar.addEventListener(
    "input",
    () => {

        if (!audio.duration) {
            return;
        }

        audio.currentTime =
            (
                progressBar.value /
                100
            ) *
            audio.duration;

    }
);


// ==========================================
// FORMAT TIME
// ==========================================

function formatTime(seconds) {

    if (
        isNaN(seconds) ||
        seconds < 0
    ) {

        return "0:00";

    }

    const minutes =
        Math.floor(
            seconds / 60
        );

    const remainingSeconds =
        Math.floor(
            seconds % 60
        );

    return (
        minutes +
        ":" +
        String(
            remainingSeconds
        ).padStart(2, "0")
    );
}


// ==========================================
// VOLUME
// ==========================================

audio.volume = 0.7;

volumeBar.value = 0.7;


volumeBar.addEventListener(
    "input",
    () => {

        audio.volume =
            volumeBar.value;

    }
);


// ==========================================
// SONG ENDED
// ==========================================

audio.addEventListener(
    "ended",
    () => {

        if (isRepeat) {

            audio.currentTime = 0;

            playSong();

        } else {

            nextSong();

        }

    }
);


// ==========================================
// SHUFFLE
// ==========================================

shuffleBtn.addEventListener(
    "click",
    () => {

        isShuffle =
            !isShuffle;

        shuffleBtn.classList.toggle(
            "active",
            isShuffle
        );

    }
);


// ==========================================
// REPEAT
// ==========================================

repeatBtn.addEventListener(
    "click",
    () => {

        isRepeat =
            !isRepeat;

        repeatBtn.classList.toggle(
            "active",
            isRepeat
        );

    }
);


// ==========================================
// CREATE PLAYLIST
// ==========================================

function createPlaylist() {

    playlistContainer.innerHTML =
        "";

    songCount.textContent =
        `${songs.length} Songs`;

    songs.forEach(
        (song, index) => {

            const item =
                document.createElement(
                    "div"
                );

            item.classList.add(
                "song-item"
            );

            item.innerHTML = `

                <div class="song-number">
                    ${index + 1}
                </div>

                <div class="song-icon">
                    <i class="fa-solid fa-music"></i>
                </div>

                <div class="song-info">

                    <strong>
                        ${song.title}
                    </strong>

                    <small>
                        ${song.artist}
                    </small>

                </div>

                <div class="playing-icon">
                    <i class="fa-solid fa-play"></i>
                </div>

            `;


            item.addEventListener(
                "click",
                () => {

                    currentSongIndex =
                        index;

                    loadSong(
                        currentSongIndex
                    );

                    playSong();

                }
            );


            playlistContainer.appendChild(
                item
            );

        }
    );

}


// ==========================================
// UPDATE PLAYLIST
// ==========================================

function updatePlaylist() {

    const items =
        document.querySelectorAll(
            ".song-item"
        );

    items.forEach(
        (item, index) => {

            const icon =
                item.querySelector(
                    ".playing-icon i"
                );

            item.classList.toggle(
                "active",
                index ===
                currentSongIndex
            );


            if (
                index ===
                currentSongIndex &&
                isPlaying
            ) {

                icon.className =
                    "fa-solid fa-volume-high";

            } else {

                icon.className =
                    "fa-solid fa-play";

            }

        }
    );

}


// ==========================================
// UPDATE PLAYLIST WHEN PLAYING
// ==========================================

audio.addEventListener(
    "play",
    () => {

        updatePlaylist();

    }
);


audio.addEventListener(
    "pause",
    () => {

        updatePlaylist();

    }
);


// ==========================================
// KEYBOARD CONTROLS
// ==========================================

document.addEventListener(
    "keydown",
    (event) => {

        // Space = Play/Pause
        if (
            event.code ===
            "Space"
        ) {

            event.preventDefault();

            if (isPlaying) {

                pauseSong();

            } else {

                playSong();

            }

        }


        // Right Arrow = Next
        if (
            event.code ===
            "ArrowRight"
        ) {

            nextSong();

        }


        // Left Arrow = Previous
        if (
            event.code ===
            "ArrowLeft"
        ) {

            previousSong();

        }

    }
);


// ==========================================
// INITIALIZE PLAYER
// ==========================================

createPlaylist();

loadSong(
    currentSongIndex
);

updatePlayButton();