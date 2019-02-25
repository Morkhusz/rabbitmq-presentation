var amqp = require('amqplib/callback_api');
var server_status = 'could not be signed up. Server status code 500';

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {

    ch.assertExchange('logs', 'direct', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      ch.bindQueue(q.queue, 'logs', 'critical');

      ch.consume(q.queue, function(msg) {
        console.log(" [x] %s: <%s> %s", msg.fields.routingKey, msg.content.toString(), server_status);
      }, {noAck: true});
    });
  });
});