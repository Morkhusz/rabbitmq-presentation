var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_topic.js <application>.<channel>.<action>");
  process.exit(1);
}

amqp.connect('amqp://localhost', (err, connection) => {
  connection.createChannel((err, channel) => {
    channel.assertExchange('topic_logs', 'topic', {durable: false});

    channel.assertQueue('', {exclusive: true}, (err, q) => {
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      args.forEach((key) => {
        channel.bindQueue(q.queue, 'topic_logs', key);
      });

      channel.consume(q.queue, (msg) => {
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, {noAck: true});
    });
  });
});