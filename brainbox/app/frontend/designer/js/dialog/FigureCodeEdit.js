import FigureTest from "./FigureTest"

export default class FigureCodeEdit {
  constructor() {
  }

  show() {
    Mousetrap.pause()
    let code = shape_designer.app.getConfiguration("code")
    let splash = $(`
          <div id="codeDialog">
            <pre class="codeContainer">${code}</pre>
              <div class="tinyFlyoverMenu codeOverlay">
                <div id="test_run"    class="fa fa-play"></div>
                <div id="test_commit" class="fa fa-check-square-o"></div>
                <div id="test_cancel" class='fa fa-minus-square-o' ></div>
              </div>
          </div>
            `
    )
    splash.hide()
    $("body").append(splash)
    splash.fadeIn()

    let before = function (obj, method, wrapper) {
      let orig = obj[method]
      obj[method] = function () {
        let args = Array.prototype.slice.call(arguments)
        return wrapper.call(this, function () {
          return orig.apply(obj, args)
        }, args)
      }

      return obj[method]
    }

    let intersects = function (range) {
      return editor.getSelectionRange().intersects(range)
    }

    let preventReadonly = function (next, args) {
      if (intersects(range)) return
      next()
    }

    let lines = code.split("\n")
    let last = lines.length - 1
    let first = lines.findIndex(function (element, index, array) {
      return element.startsWith("testShape")
    })

    let editor = ace.edit($("#codeDialog .codeContainer")[0]),
      session = editor.getSession(),
      Range = ace.require("ace/range").Range,
      range = new Range(0, 0, first, lines[first].length),
      range2 = new Range(last, 0, last, lines[last].length)

    session.addMarker(range, "readonly-highlight")
    session.addMarker(range2, "readonly-highlight")
    session.setMode("ace/mode/javascript")
    session.setUseWrapMode(true)
    editor.moveCursorTo(first + 1, 0)
    editor.focus()

    editor.keyBinding.addKeyboardHandler({
      handleKeyboard: function (data, hash, keyString, keyCode, event) {
        if (hash === -1 || (keyCode <= 40 && keyCode >= 37)) return false

        if (intersects(range) || intersects(range2)) {
          return {command: "null", passEvent: false}
        }
      }
    })

    before(editor, 'onPaste', preventReadonly)
    before(editor, 'onCut', preventReadonly)

    range.start = session.doc.createAnchor(range.start)
    range.end = session.doc.createAnchor(range.end)
    range.end.$insertRight = true

    range2.start = session.doc.createAnchor(range2.start)
    range2.end = session.doc.createAnchor(range2.end)
    range2.end.$insertRight = true

    $("#test_commit").on("click", function () {
      let code = editor.getValue()
      shape_designer.app.setConfiguration({code: code})
      Mousetrap.unpause()
      splash.fadeOut(function () {
        splash.remove()
      })
    })

    $("#test_cancel").on("click", function () {
      Mousetrap.unpause()
      splash.fadeOut(function () {
        splash.remove()
      })
    })

    $("#test_run").on("click", function () {
      let code = editor.getValue()
      shape_designer.app.setConfiguration({code: code})
      new FigureTest().show()
    })
  }
}
