let numbers = [4, 8, 15, 16, 23, 42];
console.log(numbers.length) // 6
numbers[100] = 100
console.log(numbers.length) // 101
numbers[-1] = "minus one"
console.log(numbers.length) // 101
console.log(numbers[-1])
console.log(numbers["-1"])
numbers.x = 0
numbers.y = 0
numbers.radius = 100
console.log(numbers.length) // 101
console.log(numbers['x']) // 0
console.log(numbers[3]) // 16
for (let key in numbers) { // object
    let value = numbers[key];
    console.log(`${key} --> ${value}`)
}
for (let number of numbers) { // array
    console.log(`foreach: ${number}`)
}