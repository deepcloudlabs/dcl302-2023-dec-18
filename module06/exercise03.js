import Websocket from 'ws';
import amqp from 'amqplib';

const binanceWssUrl = "wss://stream.binance.com:9443/ws/btcusdt@trade";
const ws = new Websocket(binanceWssUrl);

amqp.connect('amqp://guest:guest@127.0.0.1:5672')
    .then((connection) => {
      console.log("Connected to rabbitmq.")
      connection.createChannel().then((channel) => {
        console.log("Channel is created.")
        ws.on('message', (frame) => {
            let trade = JSON.parse(frame);
            trade.volume = Number(trade.p) * Number(trade.q);
            console.log(trade)
            channel.publish('tradex', '', Buffer.from(JSON.stringify(trade)));
        }).catch(console.error);
    })
    .catch(console.error);
});