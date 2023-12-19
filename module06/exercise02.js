const BINANCE_TICKER_API_URL = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT";

import fetch from "node-fetch";

setInterval(() => fetch(BINANCE_TICKER_API_URL)
                                           .then(res=>res.json())
                                           .then(console.log)
, 100)

