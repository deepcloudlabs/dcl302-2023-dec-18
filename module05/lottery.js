function getRandomNumber(max) {
    return Math.floor(Math.random() * max + 1);
}

// lottery
function drawLotteryNumbers(max, size) {
    const numbers = [];
    while (numbers.length < size) {
        const candidate = getRandomNumber(max);
        if (numbers.includes(candidate)) continue;
        numbers.push(candidate);
    }
    numbers.sort((x,y)=>x-y);
    return numbers;
}

function getLotteryNumbers(lotteryMax=60, lotterySize=6,column=1) {
    const numbers = [];
    for (let i = 0; i < column; ++i)
        numbers.push(drawLotteryNumbers(lotteryMax, lotterySize));
    return numbers
}

exports.getLotteryNumbers = getLotteryNumbers;
exports.drawLotteryNumbers = drawLotteryNumbers;