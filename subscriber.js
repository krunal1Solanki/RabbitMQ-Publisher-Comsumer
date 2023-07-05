const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) throw err;
  connection.createChannel((err, channel) => {
    if (err) throw err;

    let exchangeName = 'directExchange';

    channel.assertExchange(exchangeName, 'direct', { durable: false });

    channel.assertQueue('', { exclusive: true }, (err, q) => {
      if (err) throw err;

      console.log('Waiting for messages...');

      channel.bindQueue(q.queue, exchangeName, 'high');
      channel.bindQueue(q.queue, exchangeName, 'medium');
      channel.bindQueue(q.queue, exchangeName, 'lowl');

      channel.consume(q.queue, (msg) => {
        console.log('Received:', msg.content.toString());
        channel.ack(msg);
      });
    });
  });
});


// amqp.connect(`amqp://localhost`, (err, connection) => {
//     if(err) throw err;
//     connection.createChannel((err, channel)=> {
//         if(err) throw err

//         let qname = "First Queue"
//         let msg = "This is me sending my first message"
//         channel.assertQueue(qname, {
//             durable: false
//         })
//         channel.consume(qname, (msg) => {
//             console.log(msg.content.toString())
//             channel.ack(msg)
//         })
//     })
// })