const BINANCE_TICKER_API_URL = "https://api.binance.com/api/v3/ticker/price";

import fetch from "node-fetch";

fetch(BINANCE_TICKER_API_URL).then(res=>res.json())
                             .then(tickers => {
                                 tickers.sort((t1,t2)=> t2.price  - t1.price)
                                 for(let ticker of tickers){
                                     console.log(ticker);
                                 }
                             })
