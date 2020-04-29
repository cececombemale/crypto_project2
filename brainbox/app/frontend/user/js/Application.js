let Palette = require("./Palette")
let View = require("./View")
let Toolbar = require("./Toolbar")
let Userinfo = require("../../_common/js/Userinfo")

class App {

  constructor() {

  }

  init(permissions) {
    this.palette = new Palette(this)
    this.view = new View(this)
    this.toolbar = new Toolbar(this)
    this.userinfo = new Userinfo(permissions, conf)
  }
}

let app = new App()
export default app
