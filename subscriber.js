const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) throw err;

  // Consumer 1
  connection.createChannel((err, channel) => {
    if (err) throw err
    
    let exchangeName = 'directExchange';

    channel.assertExchange(exchangeName, 'direct', { durable: false });

    channel.assertQueue('', { exclusive: true }, (err, q) => {
      if (err) throw err;

      console.log('Consumer 1 is waiting for messages...');

      channel.bindQueue(q.queue, exchangeName, 'high');

      channel.consume(q.queue, (msg) => {
        console.log('Consumer 1 received:', msg.content.toString());
        channel.ack(msg);
      });
    });
  });

  // Consumer 2
  connection.createChannel((err, channel) => {
    if (err) throw err;

    let exchangeName = 'directExchange';

    channel.assertExchange(exchangeName, 'direct', { durable: false });

    channel.assertQueue('', { exclusive: true }, (err, q) => {
      if (err) throw err;

      console.log('Consumer 2 is waiting for messages...');

      channel.bindQueue(q.queue, exchangeName, 'medium');

      channel.consume(q.queue, (msg) => {
        console.log('Consumer 2 received:', msg.content.toString());
        channel.ack(msg);
      });
    });
  });

  // Consumer 3
  connection.createChannel((err, channel) => {
    if (err) throw err;

    let exchangeName = 'directExchange';

    channel.assertExchange(exchangeName, 'direct', { durable: false });

    channel.assertQueue('', { exclusive: true }, (err, q) => {
      if (err) throw err;

      console.log('Consumer 3 is waiting for messages...');

      channel.bindQueue(q.queue, exchangeName, 'low');

      channel.consume(q.queue, (msg) => {
        console.log('Consumer 3 received:', msg.content.toString());
        channel.ack(msg);
      });
    });
  });
});
