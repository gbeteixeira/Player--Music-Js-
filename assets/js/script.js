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
    if (songsIndex > songs.length - 1) {

        songsIndex = 0;

    }

    loadMusic(songs[songsIndex]); //carrega a msc
    playMusic(); // reproduz a proxima musica
}
// next musica
btnNext.addEventListener('click', nextMusic);

// Previous
function prevMusic() {

    if (songsIndex > 0) {

        songsIndex--;

    } else {

        songsIndex = songs.length - 1; // caso nn tenha musicas anteriores vai para a ultima musica do array

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
const boxListMusic = document.querySelector('.box');

for (let i = 0; i < songs.length; i++) {

    let liMusic = document.createElement('li'); // cria li 
    let liAhref = document.createElement('a'); // cria hyperlink
    liMusic.setAttribute('id', 'msc' + i); // attr id à li

    //svg
    let svg = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60"style="enable-background:new 0 0 60 60;" xml:space="preserve" class="playIcon"><g><path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z" /><path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z" /></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';

    liAhref.innerHTML = svg; //attr svg ao hyperlink

    let musicName = document.createTextNode('   ' + songs[i]); //cria texto do menu
    liAhref.appendChild(musicName); // hyperlink recebe texto com nome da musica

    liMusic.appendChild(liAhref); // elemento li recebe elemento hyperlink
    boxListMusic.appendChild(liMusic); // ul recebe li ja incrementado


    let btn = document.getElementById('msc' + i);

    btn.addEventListener('click', (e) => {
        loadMusic(songs[i]);
        playMusic(i);
    })

}

// Themes
const btnHeart = document.getElementById('heart');

btnHeart.addEventListener('click', (e) => {

    if (localStorage.getItem('themePlayerMusic') == "light") {

        btnHeart.classList.remove('heartAnimation');
        btnHeart.classList.remove('heartAnimation1');

        setTimeout(function () {
            btnHeart.classList.add('heartAnimation');
            btnHeart.classList.add('heartAnimation1');
        }, 100);

        document.body.removeAttribute("data-theme", "light");
        localStorage.removeItem("themePlayerMusic");

    } else {

        btnHeart.classList.remove('heartAnimation');
        btnHeart.classList.remove('heartAnimation1');

        setTimeout(function () {
            btnHeart.classList.add('heartAnimation1');
        }, 100);

        document.body.setAttribute("data-theme", "light");
        localStorage.setItem("themePlayerMusic", "light");

    }

})

//heartAnimation heartAnimation1

window.onload = function () {

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
                                     rotateY(${dxNorm * 45}deg)
                                     rotateX(${yPosition * 45}deg)`;
})

box.addEventListener('mouseleave', () => {
    box.style.transform = 'none';
})