// generative functions
function fun(n) {
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
function *gun(n) {
    console.log(`gun: yielding ${n}...`);
    yield n;
    while (n > 1) {
        if (n % 2 === 0) {
            n = Math.floor(n / 2);
        } else {
            n = 3 * n + 1;
        }
        console.log(`gun: yielding ${n}...`);
        yield n;
    }

}
for (let number of gun(49)){
    console.log(`for loop: ${number}`)
}