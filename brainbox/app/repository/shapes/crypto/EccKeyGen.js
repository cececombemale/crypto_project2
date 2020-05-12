// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var crypto_EccKeyGen = CircuitFigure.extend({

   NAME: "crypto_EccKeyGen",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:183,height:108},attr), setter, getter);
     var port;
     // OutputKey
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 46.44808743169399, y: 100 }));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("OutputKey");
     port.setMaxFanOut(20);
     // OutputSecret
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 69.94535519125684, y: 100 }));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("OutputSecret");
     port.setMaxFanOut(20);
     // OutputDH
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 21.584699453551913, y: 100 }));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("OutputDH");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 183;
      this.originalHeight= 108;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L183,0 L183,108 L0,108");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 0L183 0L183 108L0 108Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'ECCKeyGen');
       shape.attr({"x":44.703125,"y":46.6875,"text-anchor":"start","text":"ECCKeyGen","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
crypto_EccKeyGen = crypto_EccKeyGen.extend({

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
        var pair = sjcl.ecc.elGamal.generateKeys(256);
        var pair2 = sjcl.ecc.elGamal.generateKeys(384);
        //var pubkem = pair.pub.kem();
        //var pubkey = pubkem.key;
        //var seckey = pair.sec.unkem(pubkem.tag);
        
        
        //var pub = pair.pub.get();
        //var sec = pair.sec.get();
        
        //var pub = pair.pub;
        //var sec = pair.sec;
        var output = this.getOutputPort("OutputKey");
        var output2 = this.getOutputPort("OutputSecret");
        var outputDh = this.getOutputPort("OutputDH");
        //var ci = sjcl.encrypt(pair2.pub,"hiiiiii")
        output.setValue(pair2);
        output2.setValue(pair2);
        var val = pair.sec.dh(pair.pub);
        outputDh.setValue(val); 
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