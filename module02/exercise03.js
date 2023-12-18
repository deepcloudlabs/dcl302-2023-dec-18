// Before ES6
let Employee = function (identity, fullname, salary, departments) {
    // let self = this;
    this.identity = identity;
    this.fullname = fullname;
    this.salary = salary;
    this.departments = departments;

    this.sayHello = function(){
        // return "Hello, " + this.fullname +"!";
        console.log(`Hello, ${this.fullname}!`);
    }

    this.increaseSalary = function(rate){
        this.salary = (1+rate) * this.salary;
    }

    this.sayHello = this.sayHello.bind(this);
    this.increaseSalary = this.increaseSalary.bind(this);

}

let jack = new Employee("1","jack bauer",100_000,["IT", "SALES"]);
console.log(jack)
jack.increaseSalary(0.5)
console.log(jack.salary)
let kate = new Employee("2","kate austen",200_000,["FINANCE", "HR"]);
kate.sayHello() // sayHello(kate)
setTimeout(kate.sayHello, 3_000)