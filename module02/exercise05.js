function fun(x, y, z) {
    x = x | 4;
    y = y | 8;
    z = z | 16;
    return x * y + z;
}

function sun(x, y, z) {
    if (arguments.length != 3)
        throw "You must provide exactly three arguments";
    return x * y + z;
}

let gun = function (x = 4, y = 8, z = 16) {
    return x * y + z;
}

console.log(fun(4, 8, 16))
console.log(gun(4, 8, 16))

console.log(fun()) // NaN
console.log(fun(4)) // NaN
console.log(fun(4, 8)) // NaN
console.log(fun(4, 8, 16)) // 48
console.log(fun(4, 8, 16, 100)) // 48

console.log(sun())