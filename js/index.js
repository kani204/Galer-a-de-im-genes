document.addEventListener('DOMContentLoaded', () => {
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-theme');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    localStorage.setItem('darkMode', body.classList.contains('dark-theme'));
});

const imagenes = document.querySelectorAll('.gallery-image');
const modal = document.getElementById('imagenModal');
const modalImg = document.getElementById('imagen-modal-contenido');
const modalTitulo = document.getElementById('modal-titulo');
const modalTexto = document.getElementById('modal-texto');
const cerrarModal = document.querySelector('.cerrar-modal');

imagenes.forEach(imagen => {
    imagen.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = imagen.src;
        modalTitulo.textContent = imagen.getAttribute('data-title');
        modalTexto.textContent = imagen.getAttribute('data-description');
    });
});

cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const gallery = document.querySelector('.gallery');
const images = document.querySelectorAll('.gallery-image');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

// funcion para mostrar la imagen siguiente
function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateGalleryPosition();
}

// funcion para mostrar la imagen anterior
function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGalleryPosition();
}

// actualizar la posicion del slider
function updateGalleryPosition() {
    const slideWidth = images[0].offsetWidth;
    gallery.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// botones de navegacion
nextBtn.addEventListener('click', () => {
    showNextImage();
});

prevBtn.addEventListener('click', () => {
    showPrevImage();
});

let carouselInterval = setInterval(showNextImage, 5000);

// pausa el auto carousel al pasar el mouse
gallery.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

gallery.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(showNextImage, 5000);
});

const citas = [
    { texto: "La creatividad es inteligencia divirtiéndose.", autor: "Albert Einstein" },
    { texto: "El éxito es la suma de pequeños esfuerzos, repetidos día tras día.", autor: "Robert Collier" },
    { texto: "Cree que puedes y ya estás a medio camino.", autor: "Theodore Roosevelt" }
];

function cambiarCita() {
    const citaAleatoria = citas[Math.floor(Math.random() * citas.length)];
    document.getElementById('cita-texto').textContent = `"${citaAleatoria.texto}"`;
    document.getElementById('cita-autor').textContent = `- ${citaAleatoria.autor}`;
}

// variables de musica
const audio = document.getElementById('backgroundMusic');
const playPauseButton = document.getElementById('playPauseMusic');
const prevTrackButton = document.getElementById('prevTrack');
const nextTrackButton = document.getElementById('nextTrack');
const songTitleElement = document.getElementById('songTitle');
const progressBar = document.querySelector('.progress-bar');

let currentTrackIndex = 0;

// Play/Pausa
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
        `;
    } else {
        audio.pause();
        playPauseButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 4l12 8-12 8z"/>
            </svg>
        `;
    }
}

function changeTrack(direction) {
    currentTrackIndex += direction;
    
    if (currentTrackIndex >= tracks.length) {
        currentTrackIndex = 0;
    } else if (currentTrackIndex < 0) {
        currentTrackIndex = tracks.length - 1;
    }

    audio.src = tracks[currentTrackIndex].src;
    songTitleElement.textContent = tracks[currentTrackIndex].title;
    audio.play();
    
    playPauseButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
    `;
}

function updateProgressBar() {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percentage}%`;
}

playPauseButton.addEventListener('click', togglePlayPause);

prevTrackButton.addEventListener('click', () => changeTrack(-1));
nextTrackButton.addEventListener('click', () => changeTrack(1));

const musicProgress = document.querySelector('.music-progress');
musicProgress.addEventListener('click', (e) => {
    const progressWidth = musicProgress.clientWidth;
    const clickPosition = e.offsetX;
    const percentage = clickPosition / progressWidth;
    
    audio.currentTime = percentage * audio.duration;
});

audio.addEventListener('ended', () => changeTrack(1));

audio.addEventListener('timeupdate', updateProgressBar);

songTitleElement.textContent = tracks[currentTrackIndex].title;

// Inicializar funciones
cambiarCita();
setInterval(cambiarCita, 10000); // Cambiar cita cada 10 segundos
});