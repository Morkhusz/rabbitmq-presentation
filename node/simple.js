var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {

    ch.assertQueue('checkout', {durable: false});

      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", 'checkout');

      ch.consume('', function(msg) {
        if(msg.content) {
          console.log(" [x] Info: checkout number %s", msg.content.toString());
        }
      }, {noAck: true});

  });
});