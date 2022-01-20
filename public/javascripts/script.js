/*
El siguiente Script utiliza la libreria puppeteer.js 
para realizar un scrapping en la pagina del Diario.

Requiere: un texto de busqueda para el filtrado
Retorna: un arreglo de objetos con los datos de las noticias
*/

const puppeteer = require('puppeteer');

async function getNews(req) {

    let news = [];
    const browser = await puppeteer.launch({
        'args': [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();

    async function getPageData(pageNumber = 1) {

        if (pageNumber <= 1) {
            await page.goto('https://www.abc.com.py/buscar/' + req);
        }

        const data = await page.evaluate(() => {
            const $news = document.querySelectorAll('.item-article'); //Corresponde al Selector que contiene clase Noticias de la pagina
            const data = [];
            let fecha = "";
            $news.forEach($news => {

                /*Se obtiene la fecha y se la estructura para convertirla al formato ISO 8601*/
                if ($news.querySelector('.article-time').textContent.indexOf('minutos') != -1) {
                    let minutos = parseInt($news.querySelector('.article-time').textContent.match(/(\d+)/g));
                    const tiempoTranscurrido = Date.now();
                    const hoy = new Date(tiempoTranscurrido - (minutos * 60000));
                    fecha = hoy.toISOString();
                } else if ($news.querySelector('.article-time').textContent.indexOf('horas') != -1) {
                    let horas = parseInt($news.querySelector('.article-time').textContent.match(/(\d+)/g));
                    const tiempoTranscurrido = Date.now();
                    const hoy = new Date(tiempoTranscurrido - (horas * 60 * 60000));
                    fecha = hoy.toISOString();
                } else if ($news.querySelector('.article-time').textContent.indexOf('una') != -1) {
                    const tiempoTranscurrido = Date.now();
                    const hoy = new Date(tiempoTranscurrido - (60 * 60000));
                    fecha = hoy.toISOString();
                } else {
                    let fechaExtraida = $news.querySelector('.article-time').textContent;
                    fechaArray = fechaExtraida.split('/');
                    fechaArray[3] = fechaArray[2].split(' ')[1];
                    fechaArray[2] = fechaArray[2].split(' ')[0];
                    const date = new Date(Date.parse(`${fechaArray[2]}/${fechaArray[1]}/${fechaArray[0]} ${fechaArray[3]}`));
                    fecha = date.toISOString();
                }

                //Los siguientes datos se mantiene de formato de origen
                const enlace = $news.querySelector('.article-info').querySelector('a').href;
                const enlace_foto_previo = $news.querySelector('.article-photo').innerHTML;
                const titulo = $news.querySelector('.article-title').textContent;
                const resumen = $news.querySelector('.article-intro').textContent;
                //Se utiliza una expresion regular para extraer solo el enlace de la imagen de la noticia
                const matches = enlace_foto_previo.match(/"(.*?)"/);
                const enlace_foto = matches ? matches[1] : enlace_foto_previo;

                //Guarda los datos en un arreglo
                data.push({
                    fecha,
                    enlace,
                    enlace_foto,
                    titulo,
                    resumen,
                });
            });

            return {
                news: data,
            }
        });

        //Creamos un arreglo general en caso de realizar una paginacion
        news = [...news, ...data.news];

        if (pageNumber <= 1) {
            getPageData(pageNumber + 1);
        } else {
            await browser.close();
        }

        return news;

    }

    return getPageData();

}

module.exports = getNews;