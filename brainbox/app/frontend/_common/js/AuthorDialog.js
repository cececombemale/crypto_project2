
class Dialog {

  constructor() {
  }

  show(conf) {
    window.open(conf.author.url, "author")
  }
}

let dialog = new Dialog()
export default dialog
