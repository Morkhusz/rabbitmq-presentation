var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
  connection.createChannel((err, channel) => {
    channel.assertExchange('signup', 'fanout', {durable: false});

    channel.assertQueue('signup_log', {exclusive: false}, (err, q) => {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      channel.bindQueue(q.queue, 'signup', '');

      channel.consume(q.queue, (msg) => {
        if(msg.content) {
          console.log(" [x] Info: User <%s> signed up", msg.content.toString());
        }
      }, {noAck: true});
    });
  });
});