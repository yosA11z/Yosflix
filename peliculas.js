// peliculas.js
const peliculas = [
    {
        titulo: "Culpa Mía Londres",
        descripcion: "Una joven de 18 años se traslada de Estados Unidos a Londres con su madre y su rico padrastro. Conoce a su hermanastro y, a pesar de sus esfuerzos, se sienten atraídos. Sin saberlo, su padre, del que está separada, la busca tras salir de la cárcel.",
        tags: ["Acción", "Romance", "Comedia"],
        año: 2025,
        imagenFondo: "https://www.accioncine.es/wp-content/uploads/2025/02/Culpa-Mia-Londres.jpg",
        miniatura: "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/q0HxfkF9eoa6wSVnzwMhuDSK7ba.jpg",
        link: "https://archive.org/download/culpa-mia-londres-2025-web-dl-ligero-1080-p-latino-descargatepelis.-com/Culpa%20M%C3%ADa%20Londres%20%282025%29%20Web-Dl%20Ligero%201080P%20Latino%20Descargatepelis.Com.mp4"
    },
    {
        titulo: "Minecraft: La película",
        descripcion: "Bienvenido al mundo de Minecraft, donde la creatividad no sólo ayuda a crear, sino que es esencial para la supervivencia. Cuatro inadaptados -Garrett “El Basurero” Garrison (Momoa), Henry (Hansen), Natalie (Myers) y Dawn (Brooks)- se ven arrastrados a través de un misterioso portal al Mundo Exterior: un extraño país de las maravillas cúbico que se nutre de la imaginación. Para volver a casa, tendrán que dominar este mundo (y protegerlo de cosas malvadas como Piglins y Zombies, también) mientras se embarcan en una búsqueda mágica con un inesperado experto artesano, Steve (Black). Juntos, su aventura desafiará a los cinco a ser audaces y a volver a conectar con las cualidades que hacen que cada uno de ellos sea único y creativo… las mismas habilidades que necesitan para prosperar en el mundo real.",
        tags: ["Acción", "Aventura", "Comedia"],
        año: 2025,
        imagenFondo: "https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/05eee581-3112-4515-b17f-219ff6265ef8/1d84e9fb-47e8-11f0-b15c-121c7645ec99?host=wbd-images.prod-vod.h264.io&partner=beamcom",
        miniatura: "https://m.media-amazon.com/images/M/MV5BMGJjMDZiNzYtOWNjNS00MmYwLTg4NjAtYTJmYjZmODBlMzYzXkEyXkFqcGc@._V1_.jpg",
        link: "https://archive.org/download/a.-minecraft.-m_202508/A.Minecraft.M.mp4"
    }
];

window.peliculas = peliculas;

const mainTitle = document.getElementById("main-title");
const mainDescription = document.getElementById("main-description");
const mainTags = document.getElementById("main-tags");
const mainYear = document.getElementById("main-year");
const mainBg = document.getElementById("main-bg");
const listaPeliculas = document.getElementById("lista-peliculas");
const btnVer = document.getElementById("btn-ver");

function mostrarPeliculaPrincipal(pelicula) {
    if (!pelicula) return;
    if (mainTitle) mainTitle.textContent = pelicula.titulo || "";
    if (mainDescription) mainDescription.textContent = pelicula.descripcion || "";
    if (mainTags) {
        mainTags.innerHTML = '';
        if (Array.isArray(pelicula.tags)) {
            mainTags.innerHTML = pelicula.tags.map(t => `<span class="text-gray-300">${t}</span>`).join('<span class="text-gray-400 px-1">•</span>');
        }
    }
    const año = pelicula.año || pelicula.anio || pelicula.year || "";
    if (mainYear) mainYear.textContent = año;
    if (mainBg && pelicula.imagenFondo) mainBg.style.backgroundImage = `url('${pelicula.imagenFondo}')`;
    
    if (btnVer && pelicula.link) {
        const tituloEncoded = encodeURIComponent(pelicula.titulo);
        btnVer.href = `detalles.html?titulo=${tituloEncoded}`;
    }
}

function mostrarListaPeliculas() {
    if (!listaPeliculas) return;
    listaPeliculas.innerHTML = "";

    peliculas.forEach((peli) => {
        const card = document.createElement("a");
        card.href = `detalles.html?titulo=${encodeURIComponent(peli.titulo)}`;
        // Se añade la clase 'relative' para que el título se posicione correctamente
        card.className = "flex-shrink-0 w-64 rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300 pelicula focusable relative";
        card.style.height = "auto"; // Permite que la altura se ajuste automáticamente al contenido

        card.innerHTML = `
            <div class="h-[350px]">
                <img src="${peli.miniatura || ''}" alt="${peli.titulo || ''}" class="w-full h-full object-cover">
            </div>
            <div class="movie-card-title-box">
                <p class="text-sm font-semibold text-center text-white">${peli.titulo} (${peli.año || peli.anio || ''})</p>
            </div>
        `;

        listaPeliculas.appendChild(card);
    });
    
    document.dispatchEvent(new CustomEvent('moviesLoaded'));
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const titulo = params.get('titulo');

    let peliculaPrincipal;

    if (titulo) {
        peliculaPrincipal = peliculas.find(p => p.titulo.toLowerCase().trim() === titulo.toLowerCase().trim());
    }

    if (!peliculaPrincipal) {
        peliculaPrincipal = peliculas[0];
    }

    mostrarPeliculaPrincipal(peliculaPrincipal);

    if (listaPeliculas) {
        mostrarListaPeliculas();
    }
});