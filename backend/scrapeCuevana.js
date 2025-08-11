const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function obtenerPeliculasCuevana() {
  console.log('Iniciando Puppeteer...');

  const browser = await puppeteer.launch({
    headless: 'new', // Puedes poner false para ver el navegador
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    console.log('Navegando a Cuevana...');
    await page.goto('https://cuevana3.nu/peliculas', {
      waitUntil: 'domcontentloaded',
      timeout: 0
    });

    console.log('Esperando a que cargue la lista de películas...');
    await new Promise(resolve => setTimeout(resolve, 5000)); // Espera general (por si Cloudflare aparece)

    // Captura el HTML y screenshot antes del scraping
    const html = await page.content();
    fs.writeFileSync(path.join(__dirname, 'debug.html'), html);
    await page.screenshot({ path: path.join(__dirname, 'debug.png'), fullPage: true });

    // Intenta varios selectores posibles
    const selectors = ['.TPost.B', '.TPost', '.MovieListTop .TPost'];

    let peliculas = [];

    for (const selector of selectors) {
      const elementos = await page.$$(selector);

      if (elementos.length > 0) {
        console.log(`✅ Selector válido encontrado: ${selector}`);
        peliculas = await page.$$eval(selector, cards => {
          return cards.slice(0, 30).map(card => {
        const titulo = card.querySelector('.Title')?.innerText.trim() || 'Sin título';
        const url = card.querySelector('a')?.href || '';
        const img = card.querySelector('img');
        const imagen = img?.getAttribute('data-src') || img?.getAttribute('src') || '';
        return { titulo, url, imagen };
        });

        });
        break;
      }
    }

    if (peliculas.length === 0) {
      console.warn('⚠️ No se encontraron películas con ningún selector válido.');
    }

    await browser.close();
    return peliculas;

  } catch (error) {
    console.error('Error al scrapear Cuevana:', error);
    await browser.close();
    return [];
  }
}

module.exports = obtenerPeliculasCuevana;
