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
        required: false
    },
    ask: {
        type: Number,
        required: false
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
const fieldMapper = {
    s: "symbol",
//    b: "bid",
//    a: "ask",
    p: "price",
    q: "quantity",
    t: "sequence",
    T: "timestamp"
};
const Trade = model("trades", TradeSchema);
const ws = new WebSocket(BINANCE_WS_URL);
ws.on("message", frame => {
    const tradeReceived = JSON.parse(frame.toString());
    const tradeDto = {};
    for (const field in fieldMapper) {
        tradeDto[fieldMapper[field]] = tradeReceived[field];
    }
    tradeDto._id = new Types.ObjectId();
    let trade = new Trade(tradeDto);
    trade.save().then((err) => {
        if (err)
            console.error(err)
    });
})
