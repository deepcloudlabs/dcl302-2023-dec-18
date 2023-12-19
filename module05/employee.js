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

const MIN_WAGE = 11_000.0;

exports.Employee = Employee;
exports.MIN_WAGE = MIN_WAGE;