var amqp = require('amqplib/callback_api');
var log_level = ['info', 'warning', 'error']

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {

    ch.assertExchange('logs', 'direct', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      log_level.forEach(function(level) {
        ch.bindQueue(q.queue, 'logs', level);
      });

      ch.consume(q.queue, function(msg) {
        console.log(" [x] %s: <%s>", msg.fields.routingKey, msg.content.toString());
      }, {noAck: true});
    });
  });
});