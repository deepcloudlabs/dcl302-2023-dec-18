import {connect, Schema} from "mongoose";

const BINANCE_WS_URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";
import {WebSocket} from "ws";

const ws = new WebSocket(BINANCE_WS_URL);
ws.on("message", frame => {
    const trade = JSON.parse(frame.toString());
    console.log(trade);
})

connect(
    "mongodb://127.0.0.1:27017/algotrading",
    {
        "socketTimeoutMS": 0
    }
).then( () => console.log("Connected to the database"));

const Trade = new Schema({
    _id: Schema.Types.ObjectId,
    symbol: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    bid:{
        type: Number,
        required: true
    },
    ask:{
        type: Number,
        required: true
    },
    timestamp:{
        type: Number,
        required: true
    },
    sequence:{
        type: Number,
        required: true
    }
});
