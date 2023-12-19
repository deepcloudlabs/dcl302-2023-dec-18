// cancellation: there is no direct cancellation solution coming from Promise
// event-driven?

// fun(), gun(), sun(): how to join several async functions
function fun() {
    return new Promise((accept, reject) => {
        setTimeout(()=>accept(108), 3_000)
    })
}
function gun() {
    return new Promise((accept, reject) => {
        setTimeout(()=>accept(549), 1_000)
    })
}
function sun() {
    return new Promise((accept, reject) => {
        setTimeout(()=>accept(42), 5_000)
    })
}
// Promise.all()
// Promise.any()
Promise.all([fun(),gun(),sun()]).then(result =>console.log(result))
console.log("Application is running...")