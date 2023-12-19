// ES6/7/8/9/... new features
let jack = {
    identity: "1",
    fullname: "jack bauer",
    salary: 100_000,
    iban: "tr1",
    departments: ["IT", "SALES"],
    jobStyle : "FULL_TIME"
}

//let salary = jack.salary;
//let iban = jack.iban;
let {iban,salary,...rest} = jack;
console.log(iban)
console.log(salary)
console.log(rest)

let jackAsJson = JSON.stringify(jack)
console.log(jackAsJson)
console.log(typeof(jackAsJson))
let clonedJack = JSON.parse(jackAsJson) // deep cloning
console.log(clonedJack)
console.log(typeof(clonedJack))
clonedJack.departments.push("FINANCE")
console.table(jack)
console.table(clonedJack)
let newJack = {}
newJack.identity = jack.identity;
newJack.fullname = jack.fullname;
newJack.iban = jack.iban;
newJack.salary = jack.salary;
newJack.departments = [...jack.departments];
newJack.jobStyle = jack.jobStyle;
newJack.departments.push("FINANCE")
console.table(jack)
console.table(newJack)
