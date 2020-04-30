// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var crypto_SaltGenerator = CircuitFigure.extend({

   NAME: "crypto_SaltGenerator",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:204,height:98},attr), setter, getter);
     var port;
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 204;
      this.originalHeight= 98;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L204,0 L204,98 L0,98");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");

       // Rectangle
       shape = this.canvas.paper.path('M0 0L204 0L204 98L0 98Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");

       // Label
       shape = this.canvas.paper.text(0,0,'SaltGen');
       shape.attr({"x":67,"y":47.5,"text-anchor":"start","text":"SaltGen","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");


       return this.canvas.paper.setFinish();
   }
});

/**
 * Generated Code for the Draw2D touch HTML5 lib.
 * File will be generated if you save the *.shape file.
 *
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
crypto_SaltGenerator = crypto_SaltGenerator.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

         // your special code here
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
        var output = this.getOutputPort("output");
        var salt = 100+Math.floor(Math.random()*900);
        output.setValue(salt);
        console.log("this is salt", salt);
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        raspi: false,
        arduino: false
      }
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var crypto_SHA256 = CircuitFigure.extend({

   NAME: "crypto_SHA256",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:101,height:70},attr), setter, getter);
     var port;
     // input
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 66.78571428571429 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100, y: 66.78571428571429 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 101;
      this.originalHeight= 70;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L101,0 L101,70 L0,70");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");

       // Rectangle
       shape = this.canvas.paper.path('M0 0L101 0L101 70L0 70Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");

       // Label
       shape = this.canvas.paper.text(0,0,'SHA256');
       shape.attr({"x":19.203125,"y":17.5,"text-anchor":"start","text":"SHA256","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");

       // Label
       shape = this.canvas.paper.text(0,0,'input');
       shape.attr({"x":10,"y":47,"text-anchor":"start","text":"input","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");

       // Label
       shape = this.canvas.paper.text(0,0,'hash');
       shape.attr({"x":67.96875,"y":47,"text-anchor":"start","text":"hash","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");


       return this.canvas.paper.setFinish();
   }
});

/**
 * Generated Code for the Draw2D touch HTML5 lib.
 * File will be generated if you save the *.shape file.
 *
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
crypto_SHA256 = crypto_SHA256.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

         // your special code here
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        var input = this.getInputPort(0).getValue();
        var output = this.getOutputPort(0);
        var bitArray = sjcl.hash.sha256.hash(input);
        var hash = sjcl.codec.hex.fromBits(bitArray);
        output.setValue(hash);
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        raspi: false,
        arduino: false
      }
    }

});



var documentation_Markdown = draw2d.shape.basic.Rectangle.extend({
    NAME: "documentation_Markdown",
    VERSION: "1.0.0",

    init: function (attr) {
        this._super($.extend({bgColor: "#FDFDFD", color: "#1B1B1B"}, attr));

        this
            .on("change:userData.text", (figure, event) => {
                let rendered = markdown.render(this.attr("userData.text"))
                if(this.overlay) {
                    this.overlay.html(rendered)
                }
            })
            .on("added", (emitter, event) => {
                let rendered = markdown.render(this.attr("userData.text"))
                this.overlay = $(`<div id="${this.id}" style="padding:5px;font-size:80%;overflow:hidden;position:absolute; top:${this.getY()}px;left:${this.getY()}px">
                        ${rendered}
                        </div>`)
                event.canvas.html.append(this.overlay)
                this.overlay.css({
                    width: this.getWidth(),
                    height: this.getHeight(),
                    top: this.getY(),
                    left: this.getX()
                })
            })
            .on("removed", (emitter, event) => {
                this.overlay.remove()
            })
            .on("change:dimension", (emitter, event) => {
                if(this.overlay) {
                    this.overlay.css({width: event.width, height: event.height})
                }
            })
            .on("move", (emitter, event) => {
                if(this.overlay) {
                    this.overlay.css({top: event.y, left: event.x})
                }
            })

        this.attr("userData.text", "The quick brown fox $ **jumps** over the *lazy* dog")
    },

    calculate: function( context )
    {
    },

    onStart: function(context)
    {
    },

    onStop:function(context)
    {
    },

    getParameterSettings: function () {
        return [
            {
                name: "text",
                label: "Markdown Text",
                property: {
                    type: "longtext"
                }

            }];
    }

});




var documentation_Text = draw2d.shape.basic.Text.extend({

    NAME: "documentation_Text",
    VERSION: "1.0.0",

    init: function () {
        this._super({bold: false, fontFamily: "Verdana", fontSize: 10, bgColor: "#fafafa"});


        this.on("change:userData.text", (figure, event) => {
            this.setText(event.value)
        })

        this.attr("userData.text", "The quick brown fox $ jumps over the lazy dog")
    },

    calculate: function( context )
    {
    },

    onStart: function(context)
    {
    },

    onStop:function(context)
    {
    },

    getParameterSettings: function () {
        return [
            {
                name: "text",
                label: "Text",
                property: {
                    type: "longtext"
                }

            }];
    }

});




// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var text_concatenate = CircuitFigure.extend({

   NAME: "text_concatenate",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:121,height:75},attr), setter, getter);
     var port;
     // first
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.3813223140489506, y: 50 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("first");
     port.setMaxFanOut(20);
     // last
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.3813223140489506, y: 82 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("last");
     port.setMaxFanOut(20);
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.93768595041345, y: 67.33333333333333 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 121;
      this.originalHeight= 75;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L121,0 L121,75 L0,75");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");

       // Rectangle
       shape = this.canvas.paper.path('M0 0L121 0L121 75L0 75Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");

       // Label
       shape = this.canvas.paper.text(0,0,'Concatenate');
       shape.attr({"x":14.205850000000282,"y":12.5,"text-anchor":"start","text":"Concatenate","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");

       // Label
       shape = this.canvas.paper.text(0,0,'first');
       shape.attr({"x":7.205850000000282,"y":37,"text-anchor":"start","text":"first","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");

       // Label
       shape = this.canvas.paper.text(0,0,'last');
       shape.attr({"x":8.205850000000282,"y":61,"text-anchor":"start","text":"last","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");

       // Label
       shape = this.canvas.paper.text(0,0,'firstlast');
       shape.attr({"x":72.90897500000028,"y":50,"text-anchor":"start","text":"firstlast","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");


       return this.canvas.paper.setFinish();
   }
});

/**
 * Generated Code for the Draw2D touch HTML5 lib.
 * File will be generated if you save the *.shape file.
 *
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
text_concatenate = text_concatenate.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        let first = this.getInputPort("first").getValue();
        let last = this.getInputPort("last").getValue();
        let outputPort = this.getOutputPort("output")

        outputPort.setValue(first + last);
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        raspi: false,
        arduino: false
      }
    }

});



// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var text_display = CircuitFigure.extend({

   NAME: "text_display",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:82.21600000000035,height:67},attr), setter, getter);
     var port;
     // port_a
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 36.18517076967971, y: -4.477611940298508 }));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("port_a");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 82.21600000000035;
      this.originalHeight= 67;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L82.21600000000035,0 L82.21600000000035,67 L0,67");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");

       // label
       shape = this.canvas.paper.text(0,0,'???');
       shape.attr({"x":58.18475000000035,"y":34.16705000000002,"text-anchor":"start","text":"???","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","label");

       // Label
       shape = this.canvas.paper.text(0,0,'📺');
       shape.attr({"x":4,"y":33.5,"text-anchor":"start","text":"📺","font-family":"\"Arial\"","font-size":50,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");


       return this.canvas.paper.setFinish();
   }
});

/**
 * Generated Code for the Draw2D touch HTML5 lib.
 * File will be generated if you save the *.shape file.
 *
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
text_display = text_display.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

         // your special code here
        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        var _this = this;

        // get the connected port and forward the port to the related party ( SignalSource shape)
        //
        this.getInputPort(0).on("change:value", function(emitter, event){
            var foo = _this.getInputPort(0).getValue();
            console.log(foo);
            console.log(typeof foo);
           _this.layerAttr("label", {text: JSON.stringify(event.value)})
        })
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function(context)
    {
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        raspi: false,
        arduino: false
      }
    },
});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var text_equal = CircuitFigure.extend({

   NAME: "text_equal",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:121,height:53},attr), setter, getter);
     var port;
     // input2
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.3813223140489506, y: 29.245283018867926 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input2");
     port.setMaxFanOut(20);
     // input1
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.3813223140489506, y: 74.52830188679245 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input1");
     port.setMaxFanOut(20);
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.93768595041345, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 121;
      this.originalHeight= 53;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L121,0 L121,53 L0,53");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");

       // Rectangle
       shape = this.canvas.paper.path('M0 0L121 0L121 53L0 53Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");

       // Label
       shape = this.canvas.paper.text(0,0,'Equal?');
       shape.attr({"x":61.09647500000028,"y":26.59375,"text-anchor":"start","text":"Equal?","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");

       // Label
       shape = this.canvas.paper.text(0,0,'input1');
       shape.attr({"x":8.205850000000282,"y":15.75,"text-anchor":"start","text":"input1","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");

       // Label
       shape = this.canvas.paper.text(0,0,'input2');
       shape.attr({"x":8.205850000000282,"y":39.75,"text-anchor":"start","text":"input2","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");


       return this.canvas.paper.setFinish();
   }
});

/**
 * Generated Code for the Draw2D touch HTML5 lib.
 * File will be generated if you save the *.shape file.
 *
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
text_equal = text_equal.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        let input1 = this.getInputPort("input1").getValue();
        let input2 = this.getInputPort("input2").getValue();
        console.log("hello");
        let outputPort = this.getOutputPort("output")

        outputPort.setValue(input1 == input2);
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        raspi: false,
        arduino: false
      }
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var text_input = CircuitFigure.extend({

   NAME: "text_input",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:66.9765625,height:64},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 35.37851393911116, y: 97.65625 }));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 66.9765625;
      this.originalHeight= 64;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L66.9765625,0 L66.9765625,64 L0,64");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");

       // label
       shape = this.canvas.paper.text(0,0,'???');
       shape.attr({"x":41.2734375,"y":32,"text-anchor":"start","text":"???","font-family":"\"Arial\"","font-size":13,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","label");

       // Label
       shape = this.canvas.paper.text(0,0,'✎');
       shape.attr({"x":4,"y":32,"text-anchor":"start","text":"✎","font-family":"\"Arial\"","font-size":50,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");


       return this.canvas.paper.setFinish();
   }
});

/**
 * Generated Code for the Draw2D touch HTML5 lib.
 * File will be generated if you save the *.shape file.
 *
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
text_input = text_input.extend({

    init: function(attr, setter, getter){
        this._super(attr, setter, getter);

        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        var _this = this;

        this.on("change:userData.value",function(emitter, event){
            _this.layerAttr("label", {text: event.value});
        });

        this.on("added", function(){
            var value = _this.attr("userData.value");
            _this.layerAttr("label", {text: value});
        });

    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function(context)
    {
        this.getOutputPort(0).setValue(JSON.parse(this.attr("userData.value")));
    },

    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function(context)
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function(context)
    {
    },


    getParameterSettings: function()
    {
        return [
        {
            name:"value",
            property:{
                type: "string"
            }
        }];
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        raspi: false,
        arduino: false
      }
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var text_length = CircuitFigure.extend({

   NAME: "text_length",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:80,height:26},attr), setter, getter);
     var port;
     // input
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.5767499999990378, y: 50 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input");
     port.setMaxFanOut(20);
     // output
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.90575000000035, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 26;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L80,0 L80,26 L0,26");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");

       // Rectangle
       shape = this.canvas.paper.path('M0 0L80 0L80 26L0 26Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");

       // Label
       shape = this.canvas.paper.text(0,0,'Length');
       shape.attr({"x":15.205850000000282,"y":12.6875,"text-anchor":"start","text":"Length","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");


       return this.canvas.paper.setFinish();
   }
});

/**
 * Generated Code for the Draw2D touch HTML5 lib.
 * File will be generated if you save the *.shape file.
 *
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
text_length = text_length.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function( context)
    {
        let input = this.getInputPort(0).getValue();
        let outputPort = this.getOutputPort(0);

        outputPort.setValue(input.length);
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        raspi: false,
        arduino: false
      }
    }

});


// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var text_split = CircuitFigure.extend({

   NAME: "text_split",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:121,height:75},attr), setter, getter);
     var port;
     // split_input_text
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.3813223140489506, y: 50 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("split_input_text");
     port.setMaxFanOut(20);
     // split_input_left_length
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: -0.3813223140489506, y: 82 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("split_input_left_length");
     port.setMaxFanOut(20);
     // split_output_right
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.61867768595106, y: 81.02083333333333 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("split_output_right");
     port.setMaxFanOut(20);
     // split_output_left
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 99.61867768595106, y: 49 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("split_output_left");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 121;
      this.originalHeight= 75;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L121,0 L121,75 L0,75");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");

       // Rectangle
       shape = this.canvas.paper.path('M0 0L121 0L121 75L0 75Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");

       // Label
       shape = this.canvas.paper.text(0,0,'Split');
       shape.attr({"x":44.9375,"y":12.59375,"text-anchor":"start","text":"Split","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");

       // Label
       shape = this.canvas.paper.text(0,0,'text');
       shape.attr({"x":8.205850000000282,"y":37,"text-anchor":"start","text":"text","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");

       // Label
       shape = this.canvas.paper.text(0,0,'left_length');
       shape.attr({"x":8.205850000000282,"y":61,"text-anchor":"start","text":"left_length","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");

       // Label
       shape = this.canvas.paper.text(0,0,'left');
       shape.attr({"x":96.20585000000028,"y":37,"text-anchor":"start","text":"left","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");

       // Label
       shape = this.canvas.paper.text(0,0,'right');
       shape.attr({"x":89.328125,"y":61.015625,"text-anchor":"start","text":"right","font-family":"\"Arial\"","font-size":12,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");


       return this.canvas.paper.setFinish();
   }
});

/**
 * Generated Code for the Draw2D touch HTML5 lib.
 * File will be generated if you save the *.shape file.
 *
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custom code and event handler here.
 *
 * Looks disconcerting - extending my own class. But this is a good method to
 * merge basic code and override them with custom methods.
 */
text_split = text_split.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @param {Object} context context where objects can store or handover global variables to other objects.
     *  @required
     **/
    calculate:function(context)
    {
        var txt = this.getInputPort("split_input_text").getValue();
        var left_length = this.getInputPort("split_input_left_length").getValue();
        var left = this.getOutputPort("split_output_left");
        var right = this.getOutputPort("split_output_right");
        if (txt.substr) {
            left.setValue(txt.substr(0, left_length));
            right.setValue(txt.substr(left_length));
        }
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function( context )
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function( context )
    {
    },

    /**
     * Get the simulator a hint which kind of hardware the shapes requires or supports
     * This helps the simulator to bring up some dialogs and messages if any new hardware is connected/get lost
     * and your are running a circuit which needs this kind of hardware...
     **/
    getRequiredHardware: function(){
      return {
        raspi: false,
        arduino: false
      }
    }

});


