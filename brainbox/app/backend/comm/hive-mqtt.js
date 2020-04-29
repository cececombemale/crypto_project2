const mqtt = require('mqtt');

module.exports = {

  connect: function(socketio, topic){
    // to be changed to own local server/service
    const client = mqtt.connect('http://broker.hivemq.com');

    client.on('connect', () => {
      client.subscribe(topic);
    });

    client.on('message', (topic, message) => {
      socketio.sockets.emit("mqtt:message", JSON.parse(message.toString()) );
    });

    return client;
  }

}
