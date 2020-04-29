import {Remarkable, utils} from "remarkable"
import CircuitFigure from "../figures/CircuitFigure";

class Dialog {

  constructor() {
    this.defaults = {
      html: true,             // Enable HTML tags in source
      xhtmlOut: false,        // Use '/' to close single tags (<br />)
      breaks: false,          // Convert '\n' in paragraphs into <br>
      langPrefix: 'language-',// CSS language prefix for fenced blocks
      linkTarget: '_blank',   // set target to open link in
      typographer: true       // Enable smartypants and other sweet transforms
    }
  }

  show(conf, figure) {
    let baseName = figure.attr("userData.file").replace(/\.shape$/, "")
    let pathToMD = conf.shapes.url + baseName + ".md"
    $.get(pathToMD,  (content) => {
      let version = figure.VERSION
      let markdownParser = new Remarkable('full', this.defaults)
      markdownParser.inline.validateLink = (url)=> this.validateLink(url)
      $('#markdownDialog .markdownRendering').html(markdownParser.render(content))
      $('#markdownDialog .version').html(version)
      if(figure instanceof CircuitFigure){
        $('#markdownDialog .editButton').show()
      }
      else{
        $('#markdownDialog .editButton').hide()
      }


      $('#markdownDialog').modal('show')

      $("#markdownDialog .editButton").off("click").on("click", () => {
        let baseName = figure.attr("userData.file").replace(/\.shape$/, "")
        let pathToDesign = conf.designer.url
          + "?timestamp=" + new Date().getTime()
          + "&global=" + baseName + ".shape"
        window.open(pathToDesign, "designer")
      })

      $("#markdownDialog .editButtonGuided").off("click").on("click", () => {
        let baseName = figure.attr("userData.file").replace(/\.shape$/, "")
        let pathToDesign = conf.designer.url
          + "?timestamp=" + new Date().getTime()
          + "&global=" + baseName + ".shape"
          + "&tutorial=markdown"
        window.open(pathToDesign, "designer")
      })
    })
  }

  validateLink(url) {
    let BAD_PROTOCOLS = [ 'vbscript', 'javascript', 'file'];
    let str = url.trim().toLowerCase();
    // Care about digital entities "javascript&#x3A;alert(1)"
    str = utils.replaceEntities(str);
    if (str.indexOf(':') !== -1 && BAD_PROTOCOLS.indexOf(str.split(':')[0]) !== -1) {
      return false;
    }
    return true;
  }
}

let dialog = new Dialog()
export default dialog
