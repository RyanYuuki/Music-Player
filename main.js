const playElmt = document.getElementById("Play");
const pauseElmt = document.getElementById("Pause");
const NextSongElmt = document.getElementById("NextSong");
const PrevSongElmt = document.getElementById("PrevSong");
const durationElmt = document.getElementsByClassName("duration")[0];
const MusicCardElmt = document.getElementsByClassName("MusicCard")[0];
const MusicList = [
    {
        name: "Mine",
        source: "Musics/Mine.mp3",
        artistName: "Bazzi",
        imgSource: "./MusicCovers/Mine.png"
    },
    {
        name: "Beautiful",
        source: "Musics/Beautiful.mp3",
        artistName: "Bazzi",
        imgSource: "./MusicCovers/Beautiful.jpeg"
    },
    {
        name: "Hurts So Good",
        source: "./Musics/Hurts So Good.mp3",
        artistName: "Alyssa",
        imgSource: "./MusicCovers/Hurts So Good.jpg"
    },
    {
        name: "Lost On You",
        source: "./Musics/Lost On You.mp3",
        artistName: "LP",
        imgSource: "./MusicCovers/Lost On You.jpg"
    },
    {
        name: "Let The World Burn",
        source: "./Musics/Let The World Burn.mp3",
        artistName: "Chris Grey",
        imgSource: "./MusicCovers/LetTheWorldBurn.jpg"
    },
    {
        name: "Outrunning Karma",
        source: "./Musics/Outrunning Karma.mp3",
        artistName: "Alec Benjamin",
        imgSource: "./MusicCovers/Outrunning Karma.jpg"
    },
    {
        name: "Runaway",
        source: "./Musics/Runaway.mp3",
        artistName: "Aurora",
        imgSource: "./MusicCovers/Runaway.png",
    }
];
const musicCoverElmt = document.getElementById("Image");
const rangeElmt = document.getElementById("seekBar");
const rangeBarElmt = document.getElementById("progress-bar");
const songElmt = document.getElementById("Song");
let index = 6;
let isShuffled = false;
let isLooping = false;
let colorAccent;
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
        let formattedDuration = `${(durationMinutes).toString().padStart(1, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
        formattedDuration = formattedDuration.slice(0, 4);
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
        <div class="fullDuration">0${formattedDuration}</div>`
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
    isShuffled =!isShuffled;
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
    isLooping =!isLooping;
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