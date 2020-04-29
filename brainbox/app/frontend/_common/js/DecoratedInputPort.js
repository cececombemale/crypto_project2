import MarkerFigure from "./MarkerFigure"

let locator = require("./PortDecorationCenterLocator")

let growPolicy = new draw2d.policy.port.IntrusivePortsFeedbackPolicy()
growPolicy.growFactor = 1.5

export default draw2d.InputPort.extend({

  NAME: "DecoratedInputPort",

  init: function (attr, setter, getter) {
    this.hasChanged = false

    this._super($.extend(attr, {coronaWidth: 2}), setter, getter)

    this.decoration = new MarkerFigure()

    this.add(this.decoration, new draw2d.layout.locator.LeftLocator({margin: 8}))

    this.on("disconnect", (emitter, event) => {
      this.decoration.setVisible(this.getConnections().getSize() === 0)

      // default value of a not connected port is always HIGH
      //
      if (this.getConnections().getSize() === 0) {
        this.setValue(true)
      }
    })

    this.on("connect", (emitter, event) => {
      this.decoration.setVisible(false)
    })

    this.on("dragend", (emitter, event) => {
      this.decoration.setVisible(this.getConnections().getSize() === 0);
    })

    this.on("drag", (emitter, event) => {
      this.decoration.setVisible(false)
    })

    // a port can have a value. Useful for workflow engines or circuit diagrams
    this.setValue(true)

    this.installEditPolicy(growPolicy)

    let circle = new draw2d.shape.basic.Circle({radius:2, stroke:0, bgColor: "#909090"})
    circle.hitTest = () => false
    this.add(circle, locator)
  },

  useDefaultValue: function () {
    this.decoration.setStick(true)
  },

  setValue: function (value) {
    this.hasChanged = this.value !== value
    this._super(value)
  },

  hasChangedValue: function () {
    return this.hasChanged
  },

  hasRisingEdge: function () {
    return this.hasChangedValue() && this.getValue()
  },

  hasFallingEdge: function () {
    return this.hasChangedValue() && !this.getValue()
  },


  /**
   *
   * Set Canvas must be overridden because all "children" must be painted BEHIND the main figures.
   * This behaviour is different to the base implementation.
   *
   * If the port fades out - the little circle stays visible. This is the wanted effect.
   *
   * @param {draw2d.Canvas} canvas the new parent of the figure or null
   */
  setCanvas: function (canvas) {
    // remove the shape if we reset the canvas and the element
    // was already drawn
    if (canvas === null && this.shape !== null) {
      if (this.isSelected()) {
        this.unselect()
      }
      this.shape.remove()
      this.shape = null
    }


    this.children.each(function (i, e) {
      e.figure.setCanvas(canvas)
    })

    this.canvas = canvas

    if (this.canvas !== null) {
      this.getShapeElement()
    }

    // reset the attribute cache. We must start by paint all attributes
    //
    this.lastAppliedAttributes = {}


    if (canvas === null) {
      this.stopTimer()
    } else {
      if (this.timerInterval >= this.MIN_TIMER_INTERVAL) {
        this.startTimer(this.timerInterval)
      }
    }

    return this
  }

})
