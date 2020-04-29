/**
 *
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 *
 * @author Andreas Herz
 */
import Userinfo from "../../_common/js/Userinfo"
import designerDialog from "../../_common/js/DesignerDialog"
import userAdminDialog from "../../_common/js/UserAdminDialog"
import authorDialog from "../../_common/js/AuthorDialog"
import toast from "../../_common/js/toast"
import checkElement from "../../_common/js/checkElement"

import Palette from "./Palette"
import View from "./View"
import Files from "../../_common/js/FilesScreen"
import Addons from "./view/AddonScreen"
import conf from "./Configuration"
import reader from "./io/Reader"
import fileSave from "./dialog/FileSave"
import shareDialog from "../../_common/js/LinkShareDialog";
import writer from "./io/Writer";
import AuthorPage from "../../_common/js/AuthorPage";
let storage = require('../../_common/js/BackendStorage')(conf)


class Application {

  /**
   * @constructor
   *
   * @param {String} canvasId the id of the DOM element to use as paint container
   */
  constructor() {
  }

  init(permissions) {
    this.currentFile = { name:"NewDocument"+conf.fileSuffix, scope:"user"}
    this.permissions = permissions
    this.hasUnsavedChanges = false
    this.palette = new Palette(permissions)
    this.view = new View("draw2dCanvas", permissions)
    this.filePane = new Files(this, conf, permissions.brains)
    this.addonPane = new Addons(permissions)
    this.userinfo = new Userinfo(permissions, conf)
    this.indexPane = new AuthorPage("#home", "readme/en/circuit/Readme.sheet")

    this.indexPane.render()

    // Show the user an alert if there are unsaved changes
    //
    window.onbeforeunload = ()=> {
      return this.hasUnsavedChanges?  "The changes you made will be lost if you navigate away from this page": undefined;
    }

    this.view.getCommandStack().addEventListener(this)

    $(".applicationSwitchDesigner").on("click", () => {
      designerDialog.show(conf)
    })

    $(".applicationSwitchAuthor").on("click", () => {
      authorDialog.show(conf)
    })
    if(permissions.featureset.usermanagement===true) {
      $(document).on("click", ".applicationSwitchUser", () => {
        userAdminDialog.show(conf)
      })
    }
    else{
      $(".applicationSwitchUser").remove()
    }

    if(permissions.brains.update || permissions.brains.create) {
      $("#editorFileSave").on("click", () => {
        this.fileSave()
      })
    }
    else{
      $("#editorFileSave").remove()
    }


    this.shareButton = $("#editorFileShare")
    if(permissions.featureset.share) {
      this.shareButton.on("click", () => {
        this.shareButton.tooltip("hide")
        app.fileShare()
      })
    }
    else{
      this.shareButton.remove()
    }


    // check if the user has added a "file" parameter. In this case we load the shape from
    // the draw2d.shape github repository
    //
    let user = this.getParam("user")
    let global = this.getParam("global")
    let shared = this.getParam("shared")
    if (user) {
      $("#leftTabStrip .editor").click()
      this.load(user, "user")
    }
    // check if the user has added a "file" parameter. In this case we load the shape from
    // the draw2d.shape github repository
    //
    else if (global) {
      $("#leftTabStrip .editor").click()
      this.load(global, "global")
    }
    else if (shared) {
      $("#leftTabStrip .editor").click()
      this.load(shared, "shared")
    }
    else {
      this.fileNew()
    }

    // listen on the history object to load files
    //
    window.addEventListener('popstate', (event) => {
      if (event.state && event.state.id === 'editor') {
        let scope = event.state.scope
        this.load(event.state.file, scope)
      }
    })
  }

  load(name, scope) {
    let url = conf.backend[scope].get(name)
    this.view.clear()
    $("#leftTabStrip .editor").click()
    return storage.loadUrl(url)
      .then((content) => {
        this.view.clear()
        reader.unmarshal(this.view, content)
        this.view.getCommandStack().markSaveLocation()
        this.view.centerDocument()
        this.hasUnsavedChanges = false
        $("#editorFileSave div").removeClass("highlight")
        this.currentFile = { name, scope}

        // check if a tutorial exists for the named file and load/activate them
        //
        storage.loadUrl(url.replace(conf.fileSuffix, ".guide"))
          .then(guide => {
            if (typeof guide === "string") {
              guide = JSON.parse(guide)
            }
            $(guide.screen).click()
            checkElement("#paletteElementsScroll").then(() => {
              let anno = new Anno(guide.steps)
              anno.show()
            })
          })
          .catch(error => {
            // ignore 404 HTTP error silently
          })
        return content
      })
  }

  getParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]")
    let regexS = "[\\?&]" + name + "=([^&#]*)"
    let regex = new RegExp(regexS)
    let results = regex.exec(window.location.href)
    // the param isn't part of the normal URL pattern...
    //
    if (results === null) {
      // maybe it is part in the hash.
      //
      regexS = "[\\#]" + name + "=([^&#]*)"
      regex = new RegExp(regexS)
      results = regex.exec(window.location.hash)
      if (results === null) {
        return null
      }
    }
    return results[1]
  }


  fileShare() {
    this.view.setCurrentSelection(null)
    writer.marshal(this.view, json => {
      storage.saveFile(json, "unused", "shared")
        .then(( response) => {
          let data = response.data
          let file = data.filePath
          shareDialog.show(file)
        })
    })
  }

  fileSave(){
    let callback = () => {
      this.hasUnsavedChanges = false
      toast("Saved")
      $("#editorFileSave div").removeClass("highlight")
      this.filePane.refresh(conf, this.permissions.brains, this.currentFile)
    }
    // if the user didn't has the access to write "global" files, the scope of the file is changed
    // // from "global" to "user". In fact the user creates a copy in his/her own repository.
    //
    if(this.permissions.brains.global.update ===false){
      this.currentFile.scope = "user"
    }

    if (this.permissions.brains.create && this.permissions.brains.update) {
      // allow the user to enter a file name....
      fileSave.show(this.currentFile, this.view, callback)
    } else if (this.permissions.brains.create) {
      // just save the file with a generated filename. It is a codepen-like modus
      fileSave.save(this.currentFile, this.view, callback)
    }
  }

  fileNew(name, scope) {
    $("#leftTabStrip .editor").click()

    this.view.clear()

    if (name) {
      this.currentFile = { name, scope }
    } else {
      this.currentFile = { name: "MyNewBrain" , scope:"user"}
    }
    this.view.centerDocument()
  }

  stackChanged(event) {
    if (event.isPreChangeEvent()) {
      return // silently
    }
    if (event.getStack().canUndo()){
      $("#editorFileSave div").addClass("highlight")
      this.hasUnsavedChanges = true
    }
  }
}

let app = new Application()
export default app
