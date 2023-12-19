const http = require("http");
const port = 7100;

// lottery
function drawLotteryNumbers(max, size) {
    const numbers = [];
    while (numbers.length < size) {
        const candidate = Math.floor(Math.random() * max + 1);
        if (numbers.includes(candidate)) continue;
        numbers.push(candidate);
    }
    numbers.sort((x,y)=>x-y);
    return numbers;
}

function handleRequest(req, res) {
    req.on("data", requestBody => {
        let body = JSON.parse(requestBody.toString());
        if (body.hasOwnProperty('lotteryMax') && body.hasOwnProperty('lotterySize')) {
            const lotteryMax = body.lotteryMax;
            const lotterySize = body.lotterySize;
            const numbers = drawLotteryNumbers(lotteryMax,lotterySize);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify(numbers));
            res.end();
        } else {
            res.writeHead(400, {"Content-Type": "application/json"});
            res.write(JSON.stringify({status: "invalid data"}));
            res.end();
        }
    })
}

http.createServer(handleRequest).listen(port);

console.log(`server is running at ${port}...`);