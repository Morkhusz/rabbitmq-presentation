
var amqp = require('amqplib/callback_api');
var server_status = 'could not be signed up. Server status code 500';

amqp.connect('amqp://localhost', (err, connection) => {
  connection.createChannel((err, channel) => {

    channel.assertExchange('logs', 'direct', {durable: false});

    channel.assertQueue('logs_critical', {exclusive: false}, (err, q) => {
      console.log(' [*] Waiting for critical logs. To exit press CTRL+C');

      channel.bindQueue(q.queue, 'logs', 'critical');

      channel.consume(q.queue, (msg) => {
        console.log(" [x] %s: <%s> %s", msg.fields.routingKey, msg.content.toString(), server_status);
      }, {noAck: true});
    });
  });
});
