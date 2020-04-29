let prompt = require('prompt')
let serialport = require('serialport')
let SerialPort = serialport
let parsers = serialport.parsers
let arduinoOnSerial = null

/**
 * @method
 * Execute all handlers and behaviors attached to the registry for the given event type.
 *
 *
 * @param {String} event the event to trigger
 * @param {Object} [args] optional parameters for the triggered event callback
 *
 * @since 5.0.0
 */
module.exports = {

  // Init the device registry with all available RF24 devices which has send
  // a "keep alive" to the mast device which is connected via USB to the PC or raspi
  //
  init: function (socketio, onSuccess) {

    let serialPortCandidates = []
    SerialPort.list(function (err, ports) {
      // select the ports by the manufacture name
      //
      ports.forEach(function (port) {
        if (port.manufacturer && port.manufacturer.startsWith("Arduino")) {
          serialPortCandidates.push(port)
        }
      })

      // ask the user which one to use if more than one is possible
      //
      if (serialPortCandidates.length > 0) {
        console.log("------------------------------------------------")
        console.log("  Found some Arduinos to connect to brainbox.")
        console.log("  Please select the one to use or enter '0' if ")
        console.log("  you didn't want use any.")
        console.log("------------------------------------------------")
        console.log("    0 -> do not connect any")
        serialPortCandidates.forEach(function (port, i) {
          console.log("    " + (i + 1) + " -> " + port.comName)
        })

        prompt.get(['serialPort'], function (err, result) {
          if (err) {
            console.log("start server without serial connection")
          }
          else {
            let index = parseInt(result.serialPort)
            if (index === 0) {
              onSuccess()
            }
            else {
              index -= 1
              if (index >= 0 && index < serialPortCandidates.length) {
                arduinoOnSerial = new SerialPort(serialPortCandidates[index].comName, {
                  baudRate: 9600,
                  parser: new parsers.Readline('\r\n')
                })

                socketio.on('connection', socket => {
                  socket.on('arduino:set',  msg => {
                    arduinoOnSerial.write(msg.cmd)
                   // let pin = pins[msg.pin];
                   // pin.set(1 - msg.value);
                  });
                });

                arduinoOnSerial.on('open', function () {
                  console.log("Serial Port '" + serialPortCandidates[index].comName + "' to Arduino opend successfully")
                  arduinoOnSerial.on('data', function (data) {
                    socketio.sockets.emit("arduino:value", {data} );
                  })
                })
                onSuccess()
              }
              else {
                console.log("invalid selection. Starting server without any serial connection")
                onSuccess()
              }
            }
          }
        })
      }
      // start the server without an Arduino connection
      //
      else {
        onSuccess()
      }
    })
  },

  write: function(cmd){
    arduinoOnSerial.write(cmd)
  }
}
