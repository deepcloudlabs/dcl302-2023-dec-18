let numbers = [4, 8, 15, 16, 23, 42];
for (let i = 0; i < numbers.length; ++i) {
    let number = numbers[i];
    console.log(number)
}
for (let i in numbers) {
    let number = numbers[i];
    console.log(number)
}
for (let number of numbers) {
    console.log(number)
}