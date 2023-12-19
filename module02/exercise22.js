async function sun(n) {
    if (n<1)
        throw "n must be larger than 0";
    let sequence = [n];
    while (n > 1) {
        if (n % 2 === 0) {
            n = Math.floor(n / 2);
        } else {
            n = 3 * n + 1;
        }
        sequence.push(n)
    }
    return sequence;
}

sun(7).then(result => console.log(result))
    .catch( reason => console.error(reason))
async function run(){
    let result = await sun(7);
    console.log(`[run] We have received the result: ${result}`)
    return result;
}

run().then(console.log).catch(console.error)