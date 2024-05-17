// Local Variable & Arrays
let index = 6;
let isShuffled = false;
let isLooping = false;
let colorAccent;
const MusicList = [
    {
        name: "Mine",
        source: "Musics/Mine.mp3",
        artistName: "Bazzi",
        imgSource: "./MusicCovers/Mine.png",
        Duration: '02:14'
    },
    {
        name: "Beautiful",
        source: "Musics/Beautiful.mp3",
        artistName: "Bazzi",
        imgSource: "./MusicCovers/Beautiful.jpeg",
        Duration: '03:00'
    },
    {
        name: "Hurts So Good",
        source: "./Musics/Hurts So Good.mp3",
        artistName: "Alyssa",
        imgSource: "./MusicCovers/Hurts So Good.jpg",
        Duration: '03:28'
    },
    {
        name: "Lost On You",
        source: "./Musics/Lost On You.mp3",
        artistName: "LP",
        imgSource: "./MusicCovers/Lost On You.jpg",
        Duration: '04:30'
    },
    {
        name: "Let The World Burn",
        source: "./Musics/Let The World Burn.mp3",
        artistName: "Chris Grey",
        imgSource: "./MusicCovers/LetTheWorldBurn.jpg",
        Duration: '02:43'
    },
    {
        name: "Outrunning Karma",
        source: "./Musics/Outrunning Karma.mp3",
        artistName: "Alec Benjamin",
        imgSource: './MusicCovers/Outrunning Karma.jpg',
        Duration: '03:08'
    },
    {
        name: "Runaway",
        source: "./Musics/Runaway.mp3",
        artistName: "Aurora",
        imgSource: "./MusicCovers/Runaway.png",
        Duration: '04:09'
    }
];
const DarkModeCode = `
<div id="darkmodeBtn" class="theme-toggle" title="Toggle theme">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    width="1em"
    height="1em"
    fill="currentColor"
    stroke-linecap="round"
    class="theme-toggle__classic"
    viewBox="0 0 32 32"
  >
    <clipPath id="theme-toggle__classic__cutout">
      <path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
    </clipPath>
    <g clip-path="url(#theme-toggle__classic__cutout)">
      <circle cx="16" cy="16" r="9.34" />
      <g stroke="currentColor" stroke-width="1.5">
        <path d="M16 5.5v-4" />
        <path d="M16 30.5v-4" />
        <path d="M1.5 16h4" />
        <path d="M26.5 16h4" />
        <path d="m23.4 8.6 2.8-2.8" />
        <path d="m5.7 26.3 2.9-2.9" />
        <path d="m5.8 5.8 2.8 2.8" />
        <path d="m23.4 23.4 2.9 2.9" />
      </g>
    </g>
  </svg> `;
// End

// Elmt Declarations 
const MusicListELmt = document.getElementById('MusicList');
const Songs = document.getElementsByClassName("song");
const songImages = document.getElementsByClassName("songImage");
const playElmt = document.getElementById("Play");
const pauseElmt = document.getElementById("Pause");
const NextSongElmt = document.getElementById("NextSong");
const PrevSongElmt = document.getElementById("PrevSong");
const durationElmt = document.getElementsByClassName("duration")[0];
const MusicCardElmt = document.getElementsByClassName("MusicCard")[0];
const MainContainer = document.getElementsByClassName("Main")[0];
const musicCoverElmt = document.getElementById("Image");
const rangeElmt = document.getElementById("seekBar");
const rangeBarElmt = document.getElementById("progress-bar");
const songElmt = document.getElementById("Song");
const icon = document.getElementById("icon");
const sideBar = document.getElementById("sideBar");
const sideBarBtn = document.getElementById("sideBarBtn");
// End

// Functions
function createSongs() {
    for (let i = 1; i < MusicList.length; i++) {
        MusicListELmt.innerHTML += `
        <div class="song">
                <div style="background-image: url('${MusicList[i].imgSource}');" class="songImage"></div>
                <div class="songInfo">
                    <div class="Title">${MusicList[i].name}</div>
                    <div class="artistName">${MusicList[i].artistName}</div>
                </div>
                <div class="songDuration">
                    <h4>${MusicList[i].Duration}</h4>
                </div>
            </div>
        `;
    }
    for (let i = 0; i < songImages.length; i++) {
        Songs[i].addEventListener("click", () => {
            index = i;
            PlaySong();
        });
    }
}

createSongs();


function PlaySong() {
    colorjs.prominent(`${MusicList[index].imgSource}`, { amount: 1 }).then(color => {
        document.getElementById("seekBar").style.backgroundColor = `rgb(${color.toString()})`;
        colorAccent = `rgb(${color.toString()}, 0.3)`;
        if (isLooping) {
            document.getElementById("Loop").style.backgroundColor = colorAccent;
        }
        if (isLooping) {
            document.getElementById("Shuffle").style.backgroundColor = colorAccent;
        }
    });
    Theme.innerHTML = DarkModeCode;
    songElmt.src = MusicList[index].source;
    songElmt.play();
    playElmt.style.display = "none";
    pauseElmt.style.display = "grid";
    document.body.style.backgroundImage = `url('${MusicList[index].imgSource}')`;
    document.body.style.backdropFilter = "blur(50px)";
    MusicCardElmt.innerHTML = `
    <div style="background-image: url('${MusicList[index].imgSource}');" id="Image" class="Image"></div>
    <div class="Info">
        <h2 class="songTitle">${MusicList[index].name}</h2>
        <h3 class="songArtist">${MusicList[index].artistName}</h3>
    </div>
    `

    setInterval(function () {
        var Second = parseInt(songElmt.currentTime % 60);
        var Minute = parseInt((songElmt.currentTime / 60) % 60);
        let percentage = (songElmt.currentTime / songElmt.duration) * 100;
        let durationMinutes = Math.floor(songElmt.duration / 60);
        let durationSeconds = Math.floor(songElmt.duration % 60);
        let formattedDuration = `${(durationMinutes).toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
        rangeElmt.style.width = `${percentage}%`;
        rangeBarElmt.addEventListener('click', (e) => {
            let derivedDuration = (e.layerX * 100) / 420;
            rangeElmt.style.width = `${derivedDuration}%`;
            let value = rangeElmt.style.width;
            value = value.slice(0, -1);
            songElmt.currentTime = (value / 100) * songElmt.duration;
        });
        durationElmt.innerHTML = `
        <div class="currDuration">${(Minute.toString()).padStart(2, "0")}:${(Second.toString()).padStart(2, "0")}</div>
        <div class="fullDuration">${formattedDuration}</div>`
    }, 1000);
    songElmt.addEventListener('ended', () => {
        if (isLooping) {
            songElmt.currentTime = 0;
            songElmt.play();
        }
        else {
            NextSong();
        }
    });
}

function PauseSong() {
    songElmt.pause();
    playElmt.style.display = "grid";
    pauseElmt.style.display = "none";
}

function NextSong() {
    index++;
    if (isShuffled) {
        index = Math.floor(Math.random() * MusicList.length) + 1;
        songElmt.src = MusicList[index].source;
        PlaySong();
    }
    else {
        if (index > MusicList.length - 1) {
            index = 0;
            songElmt.src = MusicList[index].source;
            PlaySong();
        }
        else {
            songElmt.src = MusicList[index].source;
            PlaySong();
        }
    }
}

function PrevSong() {
    index--;
    if (isShuffled) {
        index = Math.floor(Math.random() * MusicList.length) + 1;
        songElmt.src = MusicList[index].source;
        PlaySong();
    }
    else {
        if (index < 0) {
            index = MusicList.length - 1;;
            songElmt.src = MusicList[index].source;
            PlaySong();
        }
        else {
            songElmt.src = MusicList[index].source;
            PlaySong();
        }
    }
}

function ShuffleSong() {
    if (isShuffled) {
        document.getElementById("Shuffle").style.background = `rgba(255, 255, 255, 0.1)`;
        document.getElementById("Shuffle").style.color = "white";
    }
    else {
        document.getElementById("Shuffle").style.backgroundColor = colorAccent;
        document.getElementById("Shuffle").style.color = "white";
    }
    isShuffled = !isShuffled;
}
function LoopSong() {

    if (isLooping) {
        document.getElementById("Loop").style.background = `rgba(255, 255, 255, 0.1)`;
        document.getElementById("Loop").style.color = "white";
    }
    else {
        document.getElementById("Loop").style.backgroundColor = colorAccent;
        document.getElementById("Loop").style.color = "white";
    }
    isLooping = !isLooping;
}
let isDarkModeOn = false;

const Theme = document.getElementById("Theme");
Theme.addEventListener("click", (event) => {
    const darkModeBtn = document.getElementById("darkmodeBtn");
    const ionIcons = document.getElementsByTagName("ion-icon"); 
    const awesomeIcons = document.getElementsByTagName("i");
    if (isDarkModeOn) {
        Theme.style.color = "white";
        darkModeBtn.classList.remove("theme-toggle--toggled");
        MusicCardElmt.style.color = "white";
        rangeBarElmt.style.backgroundColor = "rgb(255, 255, 255, 0.3)";
        rangeBarElmt.style.boxShadow = "inset 0 0 1px black";
        for (let i = 0; i < ionIcons.length; i++) {
            ionIcons[i].style.color = "white";
        }
        for (let a = 0; a < awesomeIcons.length; a++) {
            awesomeIcons[a].style.color = "white";
        }
    } else {
        darkModeBtn.classList.add("theme-toggle--toggled");
        MusicCardElmt.style.color = "black";
        rangeBarElmt.style.backgroundColor = "rgb(0, 0, 0, 0.3)";
        rangeBarElmt.style.boxShadow = "inset 0 0 5px white";
        for (let i = 0; i < ionIcons.length; i++) {
            ionIcons[i].style.color = "black";
        }
        for (let a = 0; a < awesomeIcons.length; a++) {
            awesomeIcons[a].style.color = "black";
        }
        Theme.style.color = "black";
    }
    isDarkModeOn = !isDarkModeOn;
});

let isSideBarOpen = false;
sideBarBtn.addEventListener("click", () => {
    if (isSideBarOpen) {
        sideBar.classList.remove("sideBar--open");
        sideBar.classList.add("sideBar--close");
        MainContainer.style.transform = "translateX(0%)";
        sideBarBtn.style.transform = "translateX(0%)";
        icon.style.transform = "rotate(0deg)";
    }
    else {
        sideBar.classList.add("sideBar--open");
        sideBar.classList.remove("sideBar--close");
        MainContainer.style.transform = "translateX(35%)";
        sideBarBtn.style.transform = "translateX(470px)";
        icon.style.transform = "rotate(180deg)";
    }
    isSideBarOpen = !isSideBarOpen;
});