const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) throw err;
  connection.createChannel((err, channel) => {
    if (err) throw err;

    let exchangeName = 'directExchange';
    let msgHigh = 'High priority message';
    let msgMedium = 'Medium priority message';
    let msgLow = 'Low priority message';

    channel.assertExchange(exchangeName, 'direct', { durable: false });

    channel.publish(exchangeName, 'high', Buffer.from(msgHigh));
    console.log('Published: ', msgHigh);

    channel.publish(exchangeName, 'medium', Buffer.from(msgMedium));
    console.log('Published: ', msgMedium);

    channel.publish(exchangeName, 'low', Buffer.from(msgLow));
    console.log('Published: ', msgLow);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 1000);
  });
});
