// peliculas.js
// Datos de películas
const peliculas = [
    {
        titulo: "Culpa Mía Londres",
        descripcion: "Noah, de 18 años, se traslada de Estados Unidos a Londres con su madre, que se ha enamorado recientemente de William...",
        tags: ["Acción", "Romance", "Comedia"],
        año: 2025,
        imagenFondo: "https://www.accioncine.es/wp-content/uploads/2025/02/Culpa-Mia-Londres.jpg",
        miniatura: "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/q0HxfkF9eoa6wSVnzwMhuDSK7ba.jpg",
        link: "https://archive.org/download/mi.-falla.-londres.-2025.2160p.-4-k.-web.x-265.10bit.-aac-5.1-yts.-mx/My.Fault.London.2025.2160p.4K.WEB.x265.10bit.AAC5.1-%5BYTS.MX%5D.mp4"
    }
];

// Exponer globalmente
window.peliculas = peliculas;

// DOM references
const mainTitle = document.getElementById("main-title");
const mainDescription = document.getElementById("main-description");
const mainTags = document.getElementById("main-tags");
const mainYear = document.getElementById("main-year");
const mainBg = document.getElementById("main-bg");
const listaPeliculas = document.getElementById("lista-peliculas");
const btnVer = document.getElementById("btn-ver");

// Render de la peli principal
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
        btnVer.dataset.url = pelicula.link;
    }
}

// Render lista horizontal
function mostrarListaPeliculas() {
    if (!listaPeliculas) {
        console.warn('#lista-peliculas no encontrado en el DOM.');
        return;
    }
    listaPeliculas.innerHTML = "";

    peliculas.forEach((peli) => {
        const card = document.createElement("div");
        card.className = "flex-shrink-0 w-64 h-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300 pelicula";
        card.innerHTML = `
            <img src="${peli.miniatura || ''}" alt="${peli.titulo || ''}" class="w-full h-full object-cover">
            <div class="p-2 bg-transparent">
                <p class="mt-2 text-sm font-semibold text-center text-gray-200">${peli.titulo} (${peli.año || peli.anio || ''})</p>
            </div>
        `;
        // click: ir a detalles.html con el título como parámetro
        card.addEventListener("click", () => {
            const tituloEncoded = encodeURIComponent(peli.titulo);
            window.location.href = `detalles.html?titulo=${tituloEncoded}`;
        });

        listaPeliculas.appendChild(card);
    });
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    if (peliculas.length > 0) {
        mostrarPeliculaPrincipal(peliculas[0]);
    }
    mostrarListaPeliculas();
});
