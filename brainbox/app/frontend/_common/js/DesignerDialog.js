import "google-code-prettify/bin/prettify.min.css"

class Dialog {

  constructor() {
  }

  show(conf, figure) {
    if(figure){
      let baseName = figure.attr("userData.file").replace(/\.shape$/, "")
      let pathToDesign = conf.designer.url
        + "?timestamp=" + new Date().getTime()
        + "&global=" + baseName + ".shape"
      window.open(pathToDesign, "designer")
    }
    else{
      let pathToDesign = conf.designer.url
      window.open(pathToDesign, "designer")
    }

  }
}


let dialog = new Dialog()
export default dialog
