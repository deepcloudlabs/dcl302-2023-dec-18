// curl -X POST "http://localhost:7100" -d "{\"lotteryMax\": 80, \"lotterySize\": 6, \"column\": 100}"
const http = require("http");
const port = 7100;

const {getLotteryNumbers, drawLotteryNumbers} = require("./lottery");
const {Employee,MIN_WAGE} = require("./employee");

function handleRequest(req, res) {
    req.on("data", requestBody => {
        let body = JSON.parse(requestBody.toString());
        if (body.hasOwnProperty('lotteryMax')
            && body.hasOwnProperty('lotterySize')
            && body.hasOwnProperty('column')
        ) {
            const lotteryMax = body.lotteryMax;
            const lotterySize = body.lotterySize;
            const column = body.column;
            const numbers = getLotteryNumbers(lotteryMax, lotterySize, column);
            numbers.push(drawLotteryNumbers(lotteryMax, lotterySize));
            numbers.push(new Employee("1", "jack bauer", 100_000, ["IT", "SALES"]));
            numbers.push({value: MIN_WAGE});
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