import conf from "./Configuration"
import Hogan from "hogan.js";
import TreeView from "js-treeview";

/**
 *
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 *
 * @author Andreas Herz
 */

export default class Palette {
  /**
   * @constructor
   *
   * @param {String} canvasId the id of the DOM element to use as paint container
   */
  constructor(permissions) {

    $.getJSON(conf.shapes.url + "index.json", (data) => {
      conf.shapes.version = data[0].version
      let tmpl = Hogan.compile($("#shapeTemplate").html());
      let html = tmpl.render({
        shapesUrl: conf.shapes.url,
        shapes: data
      })

      $("#paletteElements").html(html)

      this.buildTree(data)


      // Create the jQuery-Draggable for the palette -> canvas drag&drop interaction
      //
      $(".draw2d_droppable").draggable({
        appendTo: "body",
        helper: "clone",
        drag: function (event, ui) {
          event = app.view._getEvent(event)
          let pos = app.view.fromDocumentToCanvasCoordinate(event.clientX, event.clientY)
          app.view.onDrag(ui.draggable, pos.getX(), pos.getY(), event.shiftKey, event.ctrlKey)
        },
        stop: function (e, ui) {
        },
        start: function (e, ui) {
          $(ui.helper).addClass("shadow")
        }
      })

      $('.draw2d_droppable')
        .on('mouseover', () => {
          $(this).parent().addClass('glowBorder')
        })
        .on('mouseout', () => {
          $(this).parent().removeClass('glowBorder')
        })
    })

    socket.on("shape:generating", (msg) => {
      $("div[data-file='" + msg.filePath + "'] ").addClass("spinner")
    })

    socket.on("shape:generated", (msg) => {
      $("div[data-file='" + msg.filePath + "'] ").removeClass("spinner")
      $("div[data-file='" + msg.filePath + "'] img").attr({src: conf.shapes.url + msg.imagePath + "?timestamp=" + new Date().getTime()})
    })
  }

  buildTree(data) {
    let tree = []
    data.forEach(element => {
      tree.push(element.basedir.split("/"))
    })

    function arrangeIntoTree(paths) {
      let tree = []

      for (let i = 0; i < paths.length; i++) {
        let path = paths[i]
        let currentLevel = tree
        let rootPath = null
        for (let j = 0; j < path.length; j++) {
          let part = path[j]
          let existingPath = findWhere(currentLevel, 'name', part)
          rootPath = rootPath? rootPath+"/"+part:part
          if (existingPath) {
            currentLevel = existingPath.children
          } else {
            let newPart = {
              name: part,
              path: rootPath,
              children: []
            }

            currentLevel.push(newPart)
            currentLevel = newPart.children
          }
        }
      }
      return tree

      function findWhere(array, key, value) {
        let t = 0
        while (t < array.length && array[t][key] !== value) {
          t++
        }

        if (t < array.length) {
          return array[t]
        } else {
          return false
        }
      }
    }

    tree = arrangeIntoTree(tree)
    //
    // Create tree
    //

    new TreeView(tree, 'paletteFilter');
    $("#paletteElements").shuffle()
    $(".tree-leaf-content").on("click", (event) => {
      try {
        $(".tree-leaf-content").removeClass("selected")
        let target = $(event.currentTarget)
        target.addClass("selected")
        let path = target.data("item").path.toLowerCase()
        let $grid = $("#paletteElements");

        $grid.shuffle('shuffle', function ($el, shuffle) {
          let text = $.trim($el.data("path")).toLowerCase();
          return text.startsWith(path)
        });

        return false
      }
      catch(e){
        console.log(e)
      }
    })
  }

}
