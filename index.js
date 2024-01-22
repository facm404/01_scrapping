const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({
        headless: false, defaultViewport: null,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 });


    await page.goto('https://www.google.com/');
    await page.screenshot({ path: 'captura.png' });
    await page.type("#APjFqb", 'hola')
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000)

    const h3Elements = await page.$$eval('h3', elements => {
        return elements.map(element => element.textContent);
    });
    await page.screenshot({ path: 'holas.png' });

    console.log('Contenido de los h3:', h3Elements);

    await browser.close();
})();

(async () => {

    const browser = await puppeteer.launch({
        headless: false, defaultViewport: null,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 });


    await page.goto('https://www.youtube.com/');

    const elemento = await page.$x("//yt-formatted-string[contains(text(), 'Tendencias')]");

    if (elemento.length > 0) {
        await elemento[0].click();
    } else {
        console.error('Elemento no encontrado');
    }

  
    await page.waitForSelector('.style-scope.ytd-video-renderer');

    const elementos = await page.$$('.yt-simple-endpoint.style-scope.ytd-video-renderer');
  
    const textos = [];
  
    for (const elemento of elementos) {
      const textoElemento = await page.evaluate(el => el.textContent, elemento);
      textos.push(textoElemento);
    }
    await page.screenshot({ path: 'captura.png' });

  
    console.log(textos);

    await page.waitForTimeout(5000)

    

    await browser.close();
})();