var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    ch.assertExchange('signup', 'fanout', {durable: false});

    ch.assertQueue('signup', {exclusive: false}, function(err, q) {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, 'signup', '');

      ch.consume(q.queue, function(msg) {
        if(msg.content) {
        console.log(" [x] Info: User < %s > signed up", msg.content.toString());
    }
      }, {noAck: true});
    });
  });
});