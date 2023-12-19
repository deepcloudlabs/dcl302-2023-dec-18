let jack = {
    identity: "1",
    fullname: "jack bauer",
    salary: 100_000,
    iban: "tr1",
    departments: ["IT", "SALES"],
    jobStyle : "FULL_TIME"
}

let clonedJack = {...jack} // shallow cloning
clonedJack.departments = [...jack.departments]
clonedJack.departments.push("FINANCE")
console.table(jack)
console.table(clonedJack)