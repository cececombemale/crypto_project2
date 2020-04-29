import Hogan from "hogan.js";

let userDb = require("./Users")

export default class Palette {

  constructor(app) {
    $(document).on("click", "#paletteElements .paletteItem", (event) => {
      let element = $(event.target)
      let id = "" + element.data("id")
      userDb.findById(id).then( (user)=>{
        $(".paletteItem").removeClass("selected")
        element.addClass("selected")
        app.view.setUser(user)
      })
    })

    this.update()
  }

  update(){
    userDb.list().then((users) => {
      let tmpl = Hogan.compile($("#userlistTemplate").html());
      let html = tmpl.render({
        users: users
      })
      $("#paletteElements").html(html)
    })
  }
}
