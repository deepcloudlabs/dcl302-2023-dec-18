// asynchronous programming
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
function gun(n) {
    return new Promise((accept,reject)=>{
        if(n<1){
            setTimeout(()=>reject(`n(${n}) must be larger than one!`), 1_000);
        }else{
            let sequence = [n];
            while (n > 1) {
                if (n % 2 === 0) {
                    n = Math.floor(n / 2);
                } else {
                    n = 3 * n + 1;
                }
                sequence.push(n)
            }
            setTimeout(()=>accept(sequence), 3_000)
        }
    });

}
let result = fun(7);
console.log(result)
gun(0).then(result => console.log(result))
        .catch( reason => console.error(reason))
for(let i=1;i<1_000_000_000;++i)
   console.log(`Application is running at ${i}`);