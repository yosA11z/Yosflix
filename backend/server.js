const express = require('express');
const cors = require('cors');
const obtenerPeliculasCuevana = require('./scrapeCuevana'); // 👈 este importa el scraper

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/peliculas', async (req, res) => {
  try {
    const peliculas = await obtenerPeliculasCuevana(); // 👈 llama al scraper real
    res.json(peliculas);
  } catch (error) {
    console.error("Error al scrapear Cuevana:", error);
    res.status(500).json({ error: 'Error al obtener películas desde Cuevana' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}/peliculas`);
});
