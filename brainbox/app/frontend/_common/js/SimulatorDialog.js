class Dialog {
  constructor() {
  }

  show(conf) {
    window.open(conf.simulator.url, "circuit")
  }
}


let dialog = new Dialog()
export default dialog
