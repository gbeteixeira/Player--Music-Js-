const musicaContainer = document.getElementById('music-container');
const btnPlay = document.getElementById('play');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');

const audio = document.getElementById('audio');
const progressBar = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const imgCover = document.getElementById('cover');

// lista musicas
const songs = ['Depois Do Jantar', 'Dormi na praça'];

let songsIndex = 0;

// musica inicial 
loadMusic(songs[songsIndex]);

function loadMusic(music) {

    title.innerText = music;
    audio.src = `assets/music/${music}.mp3`;
    imgCover.src = `assets/images/${music}.jpg`;

}

// Reproduzir musica
function playMusic() {
    
    musicaContainer.classList.add('play');
    btnPlay.querySelector('i.fas').classList.remove('fa-play'); //remove o icon de play
    btnPlay.querySelector('i.fas').classList.add('fa-pause'); // add icon de pause

    audio.play()// toca a musica

}

// Pausar 
function pauseMusic() {

    musicaContainer.classList.remove('play');
    btnPlay.querySelector('i.fas').classList.remove('fa-pause'); //remove o icon de pause
    btnPlay.querySelector('i.fas').classList.add('fa-play'); //add icon play

    audio.pause(); // pausa a reprodução da musica

}

// Next 
function nextMusic() {
    
    songsIndex++;

    //verifica se tem mais itens no array, caso nn exista volta para a primeira musica
    if (songsIndex > songs.length -1) { 

        songsIndex = 0;

    }

    loadMusic(songs[songsIndex]); //carrega a msc
    playMusic(); // reproduz a proxima musica
}
// next musica
btnNext.addEventListener('click', nextMusic);

// Previous
function prevMusic() {
    
    songsIndex--;

    //caso nn esteja no index 0 ele volta 1 index no array (volta 1 musica)
    if (songsIndex < 0) { 

        songsIndex = songsIndex.length - 1;

    }

    loadMusic(songs[songsIndex]); //carrega a msc
    playMusic(); // reproduz a proxima musica
}

// prev musica
btnPrev.addEventListener('click', prevMusic);

// progressBar
function setProgressBar(e) {

    const width = this.clientWidth;
    // posição onde a barra foi clicada
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;

}

// Atualiza progressBar
function updateProgressBar(e) {

    const { duration, currentTime } = e.srcElement;
    const progresoPorcentaje = (currentTime / duration) * 100;

    progress.style.width = `${progresoPorcentaje}%`;

}

// Eventos
btnPlay.addEventListener('click', () => {

    const isPlaying = musicaContainer.classList.contains('play');
    
    if (isPlaying) {

        pauseMusic();

    } else {

        playMusic();

    }

});

//atualiza tempo da msc
audio.addEventListener('timeupdate', updateProgressBar);

// click na progressBar
progressContainer.addEventListener('click', setProgressBar);

// quando terminar a musica troca para a proxima
audio.addEventListener('ended', nextMusic);

// lista musicas
const btnMsc01 = document.getElementById('msc01');
const btnMsc02 = document.getElementById('msc02');

btnMsc02.addEventListener('click', (e) => {
    loadMusic(songs[1]);
    playMusic();
})

btnMsc01.addEventListener('click', (e) => {
    loadMusic(songs[0]);
    playMusic();
})




// Themes
const btnHeart = document.getElementById('heart');

btnHeart.addEventListener('click', (e) => {

    if(localStorage.getItem('themePlayerMusic') == "light") {

        btnHeart.classList.remove('heartAnimation');
        btnHeart.classList.remove('heartAnimation1');

        setTimeout(function() {
            btnHeart.classList.add('heartAnimation');
            btnHeart.classList.add('heartAnimation1');
        }, 100);

        document.body.removeAttribute("data-theme","light");
        localStorage.removeItem("themePlayerMusic");

    } else {

        btnHeart.classList.remove('heartAnimation');
        btnHeart.classList.remove('heartAnimation1');

        setTimeout(function() {
            btnHeart.classList.add('heartAnimation1');
        }, 100);

        document.body.setAttribute("data-theme","light");
        localStorage.setItem("themePlayerMusic","light");

    }
    
})

//heartAnimation heartAnimation1

window.onload = function() {
    
    let colorStorange = localStorage.getItem('themePlayerMusic');

    document.body.setAttribute("data-theme", colorStorange); 

    if (colorStorange == 'light') {

        btnHeart.classList.remove('heartAnimation');
        btnHeart.classList.add('heartAnimation1');
    
    } else {

        btnHeart.classList.add('heartAnimation1');
        btnHeart.classList.add('heartAnimation');

    }
}

// 3d effects player music
const box = document.querySelector('#music-container');
const boxRect = musicaContainer.getBoundingClientRect();

box.addEventListener('mousemove', e => {
    const xPosition = (e.clientX - boxRect.left) / boxRect.width;
    const yPosition = (e.clientY - boxRect.top) / boxRect.height - 0.6;
    const xOffSet = -(xPosition - 0.6);
    const dxNorm = Math.min(Math.max(xOffSet, -0.6), 0.6);
    box.style.transform = `perspective(1000px)
                                     rotateY(${dxNorm*45}deg)
                                     rotateX(${yPosition*45}deg)`;
})

box.addEventListener('mouseleave', () => {
    box.style.transform = 'none';
})