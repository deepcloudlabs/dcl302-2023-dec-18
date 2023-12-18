// After ES6: Syntactic Sugar -> works like in exercise03.js
class Employee {
    constructor(identity, fullname, salary, departments) {
        this.identity = identity;
        this.fullname = fullname;
        this.salary = salary;
        this.departments = departments;
        this.sayHello = this.sayHello.bind(this);
        this.increaseSalary = this.increaseSalary.bind(this);
    }

    sayHello() {
        console.log(`Hello, ${this.fullname}!`);
    }

    increaseSalary(rate) {
        this.salary = (1 + rate) * this.salary;
    }

}

let jack = new Employee("1", "jack bauer", 100_000, ["IT", "SALES"]);
console.log(jack)
jack.increaseSalary(0.5)
console.log(jack.salary)
let kate = new Employee("2", "kate austen", 200_000, ["FINANCE", "HR"]);
kate.sayHello() // sayHello(kate)
setTimeout(kate.sayHello, 3_000)