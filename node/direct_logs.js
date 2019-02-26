
var amqp = require('amqplib/callback_api');
var log_level = ['info', 'debug', 'warning', 'error']

amqp.connect('amqp://localhost', (err, connection) => {
  connection.createChannel((err, channel) => {

    channel.assertExchange('logs', 'direct', {durable: false});

    channel.assertQueue('logs', {exclusive: false}, (err, q) => {
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      log_level.forEach((level) => {
        channel.bindQueue(q.queue, 'logs', level);
      });

      channel.consume(q.queue, (msg) => {
        console.log(" [x] %s: <%s>", msg.fields.routingKey, msg.content.toString());
      }, {noAck: true});
    });
  });
});
