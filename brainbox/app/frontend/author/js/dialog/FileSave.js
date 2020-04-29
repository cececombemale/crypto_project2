import conf from "./../configuration"
import fs from "path"

class Dialog {

  /**
   * @constructor
   *
   */
  constructor() {
    $("body").append(` 
          <div id="fileSaveDialog" class="modal fade genericDialog" tabindex="-1">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="media-heading">Save Sheet</h4>
                    </div>
                    <div class="modal-body">
                        <div class="media">
                            <div class="media-left media-middle">
                                <a href="#">
                                    <img class="media-object filePreview" src="">
                                </a>
                            </div>
                            <div class="media-body">
        
                                <div class="form-horizontal">
                                    <br>
                                    Filename:
                                    <fieldset>
                                        <div class="form-group">
                                            <div class="col-lg-12">
                                                <input type="text"
                                                       class="form-control floating-label fileName"
                                                       value=""
                                                        >
                                            </div>
                                        </div>
        
                                    </fieldset>

                                    <div class="row"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn" data-dismiss="modal">Abort</button>
                        <button class="btn btn-primary okButton"><span>Save</span></button>
                    </div>
                </div>
            </div>
        </div>
    `)
  }

  /**
   * @method
   *
   * Open the file picker and load the selected file.<br>
   *
   * @param {Function} successCallback callback method if the user select a file and the content is loaded
   * @param {Function} errorCallback method to call if any error happens
   *
   * @since 4.0.0
   */
  show(currentFile, storage, document, callback) {

      $("#fileSaveDialog .fileName").val(fs.basename(currentFile.name).replace(conf.fileSuffix, ""))

      $('#fileSaveDialog').on('shown.bs.modal', (event) => {
        $(event.currentTarget).find('input:first').focus()
      })
      $("#fileSaveDialog").modal("show")
      Mousetrap.pause()

      $('#fileSaveDialog .fileName').on('keypress', function (e) {
        let key = e.charCode || e.keyCode || 0;
        if (key === 13) {
          $("#fileSaveDialog .okButton").click()
        }
      })

      // Save Button
      //
      $("#fileSaveDialog .okButton").off('click').on("click", () => {
        Mousetrap.unpause()
        let name = $("#fileSaveDialog .fileName").val()
        name = name.replace(conf.fileSuffix, "")
        name = fs.basename(name) // remove any directories
        currentFile.name = fs.join(fs.dirname(currentFile.name), name + conf.fileSuffix)
        this.save(currentFile, storage, document, (response)=>{
          $('#fileSaveDialog').modal('hide')
          if(typeof callback === "function"){
            callback(response)
          }
        })
      })
  }

  save(currentFile, storage, document, callback){
    storage.saveFile(document.toJSON(), currentFile.name, currentFile.scope)
      .then(( response) => {
        let data = response.data
        currentFile.name = data.filePath
        history.pushState({
          id: 'editor',
          scope: currentFile.scope,
          file: currentFile.name
        }, conf.appName+' | ' + name, window.location.href.split('?')[0] + '?'+currentFile.scope+'=' + currentFile.name)
        if(typeof callback === "function"){
          callback(response)
        }
      });
  }

}

let dialog = new Dialog()
export default dialog
