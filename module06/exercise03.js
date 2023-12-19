const BINANCE_WS_URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";
import {WebSocket} from "ws";
const trade1 = {e: 'trade', E: 1702989154493, s: 'BTCUSDT', t: 3328121364, p: '42946.66000000', q: '0.00015000', b: 23820477537, a: 23820478209, T: 1702989154466, m: true, M: true};
const trade2 = {e: 'trade', E: 1702989154493, s: 'BTCUSDT', t: 3328121365, p: '42946.60000000', q: '0.00062000', b: 23820454001, a: 23820478209, T: 1702989154466, m: true, M: true}

const ws = new WebSocket(BINANCE_WS_URL);
ws.on("message", frame => {
    const trade = JSON.parse(frame.toString());
    console.log(trade);
})
