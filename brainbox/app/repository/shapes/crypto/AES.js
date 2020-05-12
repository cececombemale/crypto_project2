// Generated Code for the Draw2D touch HTML5 lib.
// File will be generated if you save the *.shape file.
//
// created with http://www.draw2d.org
//
//
var crypto_AES = CircuitFigure.extend({

   NAME: "crypto_AES",
   VERSION: "local-version",

   init:function(attr, setter, getter)
   {
     var _this = this;

     this._super( $.extend({stroke:0, bgColor:null, width:425,height:107},attr), setter, getter);
     var port;
     // Message
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 79.73130841121495 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Message");
     port.setMaxFanOut(20);
     // Key
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 0, y: 29.979556074766354 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Key");
     port.setMaxFanOut(20);
     // encrypt_out
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 30.05514705882353, y: 51.86915887850467 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("encrypt_out");
     port.setMaxFanOut(20);
     // display_out
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 30.05514705882353, y: 75.02920560747664 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("display_out");
     port.setMaxFanOut(20);
     // decrypt_in
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 69.88235294117646, y: 47.19626168224299 }));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("decrypt_in");
     port.setMaxFanOut(20);
     // decrypt_out
     port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator({x: 100, y: 47.19626168224299 }));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("decrypt_out");
     port.setMaxFanOut(20);
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 425;
      this.originalHeight= 107;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();
       var shape = null;
       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L425,0 L425,107 L0,107");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 6L128 6L128 107L0 107Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'AES Encrypt');
       shape.attr({"x":23.0546875,"y":55.6875,"text-anchor":"start","text":"AES Encrypt","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Rectangle
       shape = this.canvas.paper.path('M297 0L425 0L425 101L297 101Z');
       shape.attr({"stroke":"rgba(48,48,48,1)","stroke-width":1,"fill":"rgba(255,255,255,1)","dasharray":null,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'AES Decrypt');
       shape.attr({"x":318.0546875,"y":50.6875,"text-anchor":"start","text":"AES Decrypt","font-family":"\"Arial\"","font-size":14,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Message');
       shape.attr({"x":10,"y":85.890625,"text-anchor":"start","text":"Message","font-family":"\"Arial\"","font-size":11,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'Key (Hybrid)');
       shape.attr({"x":9,"y":32.078125,"text-anchor":"start","text":"Key (Hybrid)","font-family":"\"Arial\"","font-size":11,"stroke":"#000000","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
crypto_AES = crypto_AES.extend({

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
        var input_one = this.getInputPort("Message").getValue();
        var option_key = this.getInputPort("Key").getValue();
        var output_one = this.getOutputPort("encrypt_out");
        var display = this.getOutputPort("display_out");
        
        //console.log(input_one)
        
        if (input_one.substr){
            //sjcl.beware["CBC mode is dangerous because it doesn't protect message integrity."]();
            
            //var prp = new sjcl.cipher.aes();
            //var cipher_text = sjcl.mode.cbc.encrypt(prp, plaintext);
            
            if (option_key === true) {
                var cipher_text = sjcl.encrypt("password",input_one);
            }
            else {
                var key_make = sjcl.codec.hex.fromBits(option_key);
                var cipher_text = sjcl.encrypt(key_make,input_one);
            }
            
            
            output_one.setValue(cipher_text);
            var input_two = this.getInputPort("decrypt_in").getValue();
            
            //var output_cipher= this.getOutputPort("display_out");
            //output_cipher.setValue(jso.substring(index+6, jso.length-4));
            if ((input_two !== true) && (input_two !== false)){
                if (option_key === true) {
                    var decrypted_message = sjcl.decrypt("password", cipher_text);
                }
                else {
                    var decrypted_message = sjcl.decrypt(key_make, cipher_text);
                }
                var output_two = this.getOutputPort("decrypt_out");
                output_two.setValue(decrypted_message);
                var jso = JSON.stringify(cipher_text);
                var index = jso.indexOf("ct");
                display.setValue(jso.substring(index+6, jso.length-4));
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