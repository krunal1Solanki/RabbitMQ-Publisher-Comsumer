const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) throw err;
  connection.createChannel((err, channel) => {
    if (err) throw err;

    let qName = "queue"
    channel.assertQueue(qName, {durable : false});
    channel.sendToQueue(qName, Buffer.from("Hello there this is me"))

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 1000);
  });
});


const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) throw err;

  // Consumer 1
  connection.createChannel((err, channel) => {
    if (err) throw err;

    let qName = "queue";
    channel.consume(qName, (msg)=> {
      
        console.log(msg.content.toString());
    })
    });
  });














//   const amqp = require('amqplib/callback_api');

// amqp.connect('amqp://localhost', (err, connection) => {
//   if (err) throw err;
//   connection.createChannel((err, channel) => {
//     if (err) throw err;

//     let qName = "queue"
//     channel.assertQueue(qName, {durable : false});
//     channel.sendToQueue(qName, Buffer.from("Hello there this is me"))

//     setTimeout(() => {
//       connection.close();
//       process.exit(0);
//     }, 1000);
//   });
// });


// const amqp = require('amqplib/callback_api');

// amqp.connect('amqp://localhost', (err, connection) => {
//   if (err) throw err;

//   // Consumer 1
//   connection.createChannel((err, channel) => {
//     if (err) throw err;

//     let qName = "queue";
//     channel.consume(qName, (msg)=> {
      
//         console.log(msg.content.toString());
//     })
//     });
//   });
