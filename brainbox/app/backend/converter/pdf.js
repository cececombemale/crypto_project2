const puppeteer = require('puppeteer');
const isPi = require('detect-rpi');

module.exports = {

  render: async (url) => {

    try {
      let browser = null
      if ( isPi())
        browser = await puppeteer.launch({args:['--no-sandbox'], executablePath:'chromium-browser'})
      else
        browser = await puppeteer.launch()

      const page = await browser.newPage()
      await page.goto(url)
      await page.waitForFunction(() =>  mathMLdone === true)
      const pdf = await page.pdf({
        format: 'A4',
        displayHeaderFooter: true,
        printBackground: true,
        footerTemplate: `
          <div style="color: lightgray; border-top: solid lightgray 1px; font-size: 10px; padding-top: 5px; text-align: center; width: 100%;">
            Created with <a href="http://www.brainbox-demo.de/" target="_blank">Brainbox</a> and the powerful <a href="http://www.draw2d.org" target="_blank">Draw2D</a> library ( by Andreas Herz )
          </div>
        `,
        margin: {
          bottom: 70, // minimum required for footer msg to display
          left: 25,
          right: 35,
          top: 30,
        }
      });

      browser.close()

      return pdf
    }
    catch(e){
      console.log(e)
    }
  }
}
