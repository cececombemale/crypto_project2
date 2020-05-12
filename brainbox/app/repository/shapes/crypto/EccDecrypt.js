// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var crypto_EccDecrypt = CircuitFigure.extend({

   NAME: "crypto_EccDecrypt",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:163,height:90},attr), setter, getter);
     var port;
     // InputCiphertext
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 101.22699386503068, y: 45.51215277777778 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("InputCiphertext");
     port.setMaxFanOut(20);
     // InputSecret
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 49.38650306748466, y: -1.1111111111111112 }));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("InputSecret");
     port.setMaxFanOut(20);
     // Plaintext
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 49.38650306748466, y: 100 }));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("Plaintext");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 163;
      this.originalHeight= 90;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L163,0 L163,90 L0,90");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 0L163 0L163 90L0 90Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'ECC Decrypt');
       shape.attr({"x":33.8203125,"y":40.6875,"text-anchor":"start","text":"ECC Decrypt","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
crypto_EccDecrypt = crypto_EccDecrypt.extend({

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
        var secretkey = this.getInputPort("InputSecret").getValue();
        var cipher = this.getInputPort("InputCiphertext").getValue();
        if(secretkey!==true && secretkey!==false) {
            var plaintext = this.getOutputPort("Plaintext");
            if (cipher !==true && cipher !==false && cipher !==null){
                var val = sjcl.decrypt(secretkey.sec, cipher);
                plaintext.setValue(val);
            }
            
        }
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