// app.js
document.addEventListener('DOMContentLoaded', () => {
    // ---- logout modal (tu código original, sin tocar) ----
    const perfilImage = document.getElementById('perfil-image');
    const logoutModal = document.getElementById('logout-modal');
    const logoutButton = document.getElementById('logout-button');
    const cancelButton = document.getElementById('cancel-button');

    if (perfilImage) {
        perfilImage.addEventListener('click', () => {
            if (logoutModal) logoutModal.classList.remove('hidden');
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            if (logoutModal) logoutModal.classList.add('hidden');
            window.location.href = 'index.html';
        });
    }

    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            if (logoutModal) logoutModal.classList.add('hidden');
        });
    }

    if (logoutModal) {
        logoutModal.addEventListener('click', (event) => {
            if (event.target === logoutModal) {
                logoutModal.classList.add('hidden');
            }
        });
    }

    // ---- reproductor tipo "Netflix" ----
    // buscar elementos si ya existen en el HTML
    let playerContainer = document.getElementById('player-container');
    let netflixPlayer = document.getElementById('netflix-player');
    let backButton = document.getElementById('back-button');

    // si no existen, los creamos (no toco tu HTML principal)
    if (!playerContainer || !netflixPlayer || !backButton) {
        playerContainer = document.createElement('div');
        playerContainer.id = 'player-container';
        playerContainer.className = 'hidden fixed inset-0 bg-black z-50 flex items-center justify-center';

        playerContainer.innerHTML = `
            <button id="back-button" class="absolute top-4 left-4 text-white text-3xl z-50 hover:text-red-500">←</button>
            <video id="netflix-player" class="w-full h-full bg-black" controls playsinline></video>
        `;

        document.body.appendChild(playerContainer);
        netflixPlayer = document.getElementById('netflix-player');
        backButton = document.getElementById('back-button');
    }

    function openPlayer(url) {
        if (!url) {
            console.warn('openPlayer: url inválida', url);
            return;
        }
        netflixPlayer.src = url;
        playerContainer.classList.remove('hidden');
        netflixPlayer.play().catch(() => {
            // Autoplay puede estar bloqueado, usuario puede presionar play
            console.warn('Autoplay bloqueado o no permitido por el navegador.');
        });
        document.body.style.overflow = 'hidden';
    }

    function closePlayer() {
        netflixPlayer.pause();
        netflixPlayer.removeAttribute('src');
        netflixPlayer.load();
        playerContainer.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    if (backButton) backButton.addEventListener('click', closePlayer);

    // Escuchar evento disparado por peliculas.js
    document.addEventListener('abrirPelicula', (e) => {
        const link = e?.detail?.link;
        if (link) {
            openPlayer(link);
        } else {
            console.warn('abrirPelicula sin link en detail:', e.detail);
        }
    });

    // Soporte para el botón principal "Ver" (usa dataset.url que carga peliculas.js)
    const btnVer = document.getElementById('btn-ver');
    if (btnVer) {
        btnVer.addEventListener('click', () => {
            const url = btnVer.dataset.url || (window.peliculas && window.peliculas[0] && window.peliculas[0].link);
            if (url) openPlayer(url);
            else console.warn('btn-ver: no se encontró URL de la película principal.');
        });
    }

    // cerrar con Escape
    document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape' && playerContainer && !playerContainer.classList.contains('hidden')) {
            closePlayer();
        }
    });
});
