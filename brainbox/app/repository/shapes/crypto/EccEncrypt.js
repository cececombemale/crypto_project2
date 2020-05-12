// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var crypto_EccEncrypt = CircuitFigure.extend({

   NAME: "crypto_EccEncrypt",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:438,height:102},attr), setter, getter);
     var port;
     // Plaintext
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 16.666666666666664, y: -0.942095588235294 }));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("Plaintext");
     port.setMaxFanOut(20);
     // Ciphertext
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 40.86757990867579, y: 42.19515931372549 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Ciphertext");
     port.setMaxFanOut(20);
     // InputKey
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 24.429223744292237, y: -0.942095588235294 }));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("InputKey");
     port.setMaxFanOut(20);
     // Input_Cipher
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 58.67579908675799, y: 42.19515931372549 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Input_Cipher");
     port.setMaxFanOut(20);
     // Private_Key
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 79.90867579908675, y: -0.942095588235294 }));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("Private_Key");
     port.setMaxFanOut(20);
     // Output_Plain
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100, y: 50 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Output_Plain");
     port.setMaxFanOut(20);
     // Ciphertext2
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 40.86757990867579, y: 68.6657475490196 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Ciphertext2");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 438;
      this.originalHeight= 102;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L438,0 L438,102 L0,102");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 0L180 0L180 102L0 102Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'ECC Encrypt');
       shape.attr({"x":43.765625,"y":50.7265625,"text-anchor":"start","text":"ECC Encrypt","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M258 0L438 0L438 102L258 102Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'ECC Decrypt');
       shape.attr({"x":305,"y":49.6875,"text-anchor":"start","text":"ECC Decrypt","font-family":"\"Arial\"","font-size":16,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
crypto_EccEncrypt = crypto_EccEncrypt.extend({

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
        
         var pair = this.getInputPort("InputKey").getValue();
        var dummy = this.getInputPort("Private_Key").getValue();
        var plaintext = this.getInputPort("Plaintext").getValue();
        if (pair!==true && pair!==false) {
            var c = sjcl.encrypt(pair.pub, plaintext);
            
            var p = sjcl.decrypt(pair.sec, c);
            console.log("cipher ",c);
            console.log("plain ",p);
            var cipher = this.getOutputPort("Ciphertext");
            var cipher2 = this.getOutputPort("Ciphertext2");
            
            
            
            cipher.setValue(p);
            
            
            var decrypt_in = this.getInputPort("Input_Cipher").getValue();
            //console.log("Here" , decrypt_in);
            if (decrypt_in!==true && decrypt_in!==false && decrypt_in!== null) {
                //var plain = sjcl.decrypt(pair.sec, decrypt_in);
                var out = this.getOutputPort("Output_Plain");
                var jso = JSON.stringify(c);
                var index = jso.indexOf("ct");
                out.setValue(p);
                cipher2.setValue(jso.substring(index+6, jso.length-4));
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