import {connect, model, Schema, Types} from "mongoose";

const BINANCE_WS_URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";
import {WebSocket} from "ws";


connect(
    "mongodb://127.0.0.1:27017/algotrading",
    {
        "socketTimeoutMS": 0
    }
).then(() => console.log("Connected to the database"));

const TradeSchema = new Schema({
    _id: Schema.Types.ObjectId,
    symbol: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    bid: {
        type: Number,
        required: true
    },
    ask: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    sequence: {
        type: Number,
        required: true
    }
});
const Trade = model("trades", TradeSchema);
const ws = new WebSocket(BINANCE_WS_URL);
ws.on("message", frame => {
    const tradeReceived = JSON.parse(frame.toString());
    const tradeDto = {};
    tradeDto.symbol = tradeReceived.s;
    tradeDto.price = Number(tradeReceived.p);
    tradeDto.quantity = Number(tradeReceived.q);
    tradeDto.bid = tradeReceived.b;
    tradeDto.ask = tradeReceived.a;
    tradeDto.timestamp = tradeReceived.T;
    tradeDto.sequence = tradeReceived.t;
    tradeDto._id = new Types.ObjectId();
    let trade = new Trade(tradeDto);
    trade.save().then((err) => {
        if (err)
            console.error(err)
    });
})
