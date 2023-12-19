// Inheritance
class Account {
    constructor(iban,balance) {
        this.iban= iban;
        this.balance= balance;
    }

    deposit = (amount) => {
        this.balance += amount;
    }
    withdraw = (amount) => {
        console.log("Account's withdraw")
        if(amount > this.balance) throw "Your balance does not cover your expenses.";
        this.balance -= amount;
    }
}

class CheckingAccount extends Account {
    constructor(iban,balance,overdraftAmount) {
        super(iban,balance);
        this.overdraftAmount = overdraftAmount;
    }

    withdraw = (amount) => {
        console.log("CheckingAccount's withdraw")
        if(amount > (this.balance+this.overdraftAmount)) throw "Your balance does not cover your expenses.";
        this.balance -= amount;
    }
}