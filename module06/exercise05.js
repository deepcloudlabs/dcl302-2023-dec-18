import amqp from 'amqplib';

amqp.connect('amqp://guest:guest@127.0.0.1:5672')
    .then((connection) => {
        console.log("Connected to rabbitmq.");
        connection.createChannel().then(channel => {
            channel.consume('tradque', msg => {
                if (msg.content) {
                    console.log(msg.content.toString());
                }
            }, {noAck: true, exclusive: false});
        }).catch(console.error);
    }).catch(console.error);