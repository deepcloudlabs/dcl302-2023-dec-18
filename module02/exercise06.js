// functional programming
function numericOrderAsc(x,y){
    if (x<y) return -1;
    if (x===y) return 0;
    return +1;
}
function numericOrderDesc(x,y){
    if (x<y) return +1;
    if (x===y) return 0;
    return -1;
}
numbers = [4, 8, 15, 16, 23, 42]
console.log(numbers)
// arrow function/lambda expression
numbers.sort( (x,y) => y-x) // Higher-Order Function (HoF)
console.log(numbers)
