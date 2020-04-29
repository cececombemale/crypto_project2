class Dialog {

  /**
   * @constructor
   *
   */
  constructor() {
    $("body").append(`
            <div id="inputPromptDialog" class="modal fade genericDialog" tabindex="-1">
            <div class="modal-dialog ">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="media-heading">Input Prompt</h4>
                </div>
                <div class="modal-body">
                  <div class="media">
                    <div class="promptValueLabel">Value:</div>
                    <fieldset>
                      <div class="form-group">
                        <div class="col-lg-12">
                          <input type="text" class="form-control floating-label inputPromptValue" value="" >
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="modal-footer">
                  <button class="btn" data-dismiss="modal">Close</button>
                  <button class="btn btn-primary okButton"><span>Create</span></button>
                </div>
              </div>
            </div>
          </div>
    `)
  }

  /**
   */
  show(title, label, defaultValue, callback) {
      if(typeof defaultValue === "function"){
        callback = defaultValue
        defaultValue = ""
      }

      $("#inputPromptDialog .media-heading").html(title)
      $("#inputPromptDialog .promptValueLabel").html(label)
      $('#inputPromptDialog .inputPromptValue').val(defaultValue)

      $('#inputPromptDialog').on('shown.bs.modal', (event) => {
        $(event.currentTarget).find('input:first').focus()
      })
      $("#inputPromptDialog").modal("show")
      Mousetrap.pause()

      $('#inputPromptDialog .inputPromptValue').on('keypress', function (e) {
        let key = e.charCode || e.keyCode || 0;
        if (key === 13) {
          $("#inputPromptDialog .okButton").click()
        }
      })

      // Save Button
      //
      $("#inputPromptDialog .okButton").off('click').on("click", () => {
        Mousetrap.unpause()
        $('#inputPromptDialog').modal('hide')
        let value = $("#inputPromptDialog .inputPromptValue").val()
        callback(value)
      })
  }
}


let dialog = new Dialog()
export default dialog
