const puppeteer = require('puppeteer');
const path = require("path")
const fs = require("fs")
const glob = require("glob")
const thisDir = path.normalize(__dirname)
const shapeAppDir = path.normalize(__dirname + '/../../repository/shapes/')
const version =  process.env.VERSION || "local-version";
const isPi = require('detect-rpi');

function fileToPackage(file) {
  return file
    .replace(shapeAppDir, "")
    .replace(/\.shape$/g, "")
    .replace(/-/g, "_")
    .replace(/\//g, "_");
}

function concatFiles(dirname) {
  let indexFile = dirname + "index.js";
  let jsonFile = dirname + "index.json";
  try {fs.unlinkSync(indexFile);} catch (exc) {}
  try {fs.unlinkSync(jsonFile);} catch (exc) {}

  glob(dirname+"/**/*.js",  (er, files) => {
    let content = "";
    let list = [];
    files.forEach( (filename)=>  {
      let relativePath = filename.replace(dirname, "")
      let basenamePath = relativePath.replace(".js", "")
      let name = basenamePath.replace(/\//g , "_").replace(/-/g , "_")
      let basename = relativePath.split('/').pop()
      let displayName = basename.replace(".js", "")
      let tags = name.split("_")
      list.push({
        name: name,
        tags: tags,
        version: version,
        basename: basename,
        displayName: displayName,
        basedir: relativePath.substring(0, relativePath.lastIndexOf('/')),
        filePath: basenamePath + ".shape",
        image: basenamePath + ".png"
      });
      content += (fs.readFileSync(filename, 'utf8') + "\n\n\n")
    });

    fs.writeFileSync(jsonFile, JSON.stringify(list, undefined, 2))
    fs.writeFileSync(indexFile, content)
  })
}

module.exports = {

  generateShapeIndex: async () => {
    concatFiles(shapeAppDir)
  },

  thumbnail: async (baseDir, subDir) => {

    let shapefilePath = path.normalize(baseDir + subDir)

    try {
      let json = JSON.parse(fs.readFileSync(shapefilePath,'utf8'));
      let pkg = fileToPackage(shapefilePath);

      json = json.draw2d
      json = JSON.stringify(json, undefined, 2)

      let code = fs.readFileSync(thisDir + "/template.js", 'utf8');
      let injectedCode =
        "let json=" + json + ";\n" +
        "let pkg='" + pkg + "';\n" +
        code;


      let browser = null
      if ( isPi())
        browser = await puppeteer.launch({args:['--no-sandbox'], executablePath:'chromium-browser'})
      else
        browser = await puppeteer.launch()

      const page = await browser.newPage()
      await page.goto('http://localhost:7400/designer')
      await page.setViewport({width: 900, height: 1024})
      await page.waitForFunction(() => 'app' in window)
      await page.mainFrame().evaluate(injectedCode)
      await page.waitForFunction(() => img !== null)

      let jsCode = await page.evaluate(() => { return code });
      let customCode =await page.evaluate(() => { return customCode; });
      let markdown = await page.evaluate(() => { return markdown; });
      let img = await page.evaluate(() => { return img;});

      let pngFilePath = shapefilePath.replace(/\.shape$/, ".png");
      let jsFilePath = shapefilePath.replace(/\.shape$/, ".js");
      let customFilePath = shapefilePath.replace(/\.shape$/, ".custom");
      let markdownFilePath = shapefilePath.replace(/\.shape$/, ".md");

      // replace the generated "testShape" with the real figure name
      //
      jsCode = jsCode.replace(/testShape/g, pkg);
      jsCode = jsCode.replace(/\$\{VERSION\}/g, version);
      customCode = customCode.replace(/testShape/g, pkg);

      fs.writeFileSync(jsFilePath, jsCode, 'utf8');
      fs.writeFileSync(customFilePath, customCode, 'utf8');
      fs.writeFileSync(markdownFilePath, markdown, 'utf8');
      fs.writeFileSync(pngFilePath, Buffer.from(img, 'base64'), 'binary');

      browser.close()

      concatFiles(shapeAppDir)
    }
    catch(e){
      console.log(e)
    }
  }
}
