class Account {
    #balance; // private attribute
    #iban; // private attribute

    constructor(iban, balance = 1_000) { // constructor
        this.#iban = iban;
        this.#balance = balance;
    }

    deposit = amount => { // public method
        if (amount <= 0.0) throw "You must provide a positive amount to deposit";
        this.#balance += amount;
    }
    withdraw = amount => {
        if (amount <= 0.0) throw "You must provide a positive amount to withdraw";
        if (amount > this.#balance) throw `You can withdraw at most ${this.#balance}`;
        this.#balance -= amount;
        this.#fun()
    }
    get_iban = () => this.#iban;
    get_balance = () => this.#balance;

    #fun = () => console.log("Have fun!"); // private method
}

let acc1 = new Account("tr1", 10_000);
acc1.deposit(2_500)
acc1.withdraw(7_500)
//acc1.balance -= 1_000_000;
console.log(acc1.get_balance())
console.log(acc1.get_iban())
console.log(acc1)
