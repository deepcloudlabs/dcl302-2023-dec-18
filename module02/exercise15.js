// functional programming
//  i. HoF: filter/map/reduce/some/every/flatMap/... : Generative Function
// ii. Pure Functions: Lambda Expressions
numbers = [4, 8, 15, 16, 23, 42]
let total = 0; // imperative approach
for (let number of numbers) {
    if (number % 2 === 0) {
        let cube = number ** 3;
        total += cube;
    }
}
console.log(`total is ${total}`); // 78760
// pipeline -> function composition: HoF
let if_even = x => x % 2 === 0;
let to_cube = u => u * u * u;
let to_sum = (u, v) => u + v;
console.log(
    numbers.filter(if_even)
        .map(to_cube)
        .reduce(to_sum, 0)
) // 78760
let employees = [
    {identity: "1", fullname: "jack", salary: 100_000, fulltime: true, departments: ["IT", "SALES"]},
    {identity: "2", fullname: "kate", salary: 150_000, fulltime: false, departments: ["IT", "FINANCE"]},
    {identity: "3", fullname: "james", salary: 200_000, fulltime: true, departments: ["HR"]},
    {identity: "4", fullname: "jin", salary: 75_000, fulltime: false, departments: ["SALES"]},
    {identity: "5", fullname: "ben", salary: 125_000, fulltime: true, departments: ["IT"]}
]
let anyPartTime = false;
for (let employee of employees) {
    if (!employee.fulltime) {
        anyPartTime = true;
        break;
    }
}
console.log(anyPartTime); // imperative programming
console.log(employees.some(emp => !emp.fulltime)); // functional programming
console.log(employees.every(emp => emp.salary > 50_000)); // functional programming
console.log(
    employees.filter(emp => emp.departments.includes("IT"))
             .map(emp => emp.salary)
             .reduce(to_sum, 0.0)
)
console.log(
    employees.map(emp=> emp.departments)
);
let distinct = (s,dept) => s.add(dept)
let to_departments = emp=> emp.departments;
console.log(
  employees.flatMap(to_departments)
           .reduce(distinct, new Set())
);
