function* filtrele(veriler, fun) {
    for (let veri of veriler) {
        if (fun(veri)) {
            console.log(`filtrele: yielding ${veri}`);
            yield veri;
        }
    }
}

function* donustur(veriler, gun) {
    for (let veri of veriler) {
        console.log(`donustur: yielding ${veri}`);
        yield gun(veri);
    }
}

const numbers = [4, 8, 15, 16, 23, 42];
const cift_olanlari = u => u%2 === 0;
const kubune = v => v ** 3;
for(let number of donustur(filtrele(numbers,cift_olanlari),kubune)){
    console.log(`foreach: ${number}`)
}
let iter = filtrele(numbers,cift_olanlari) // lazy evaluation
console.log(iter.next().value)
console.log(iter.next().value)
console.log(iter.next().value)
console.log(iter.next().value)