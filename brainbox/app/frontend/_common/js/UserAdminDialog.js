
class Dialog {

  constructor() {
  }

  show(conf) {
    window.open(conf.useradmin.url, "user")
  }
}

let dialog = new Dialog()
export default dialog
