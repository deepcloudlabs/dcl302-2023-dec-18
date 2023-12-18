// JS Features
// 1. Asynchronous Functions
// 2. Callback Functions
// 3. Event-Driven:
//      TimeOut Event -> Callback Function: updateModel
//      OnLoad Event -> Callback Function: app
// 4. Object-Based Programming
// 5. Class-Based Programming (a.k.a Object-Oriented Programming)
// 6. Functional Programming -> Declarative Programming
//     i) Higher-Order Function: setInterval
//    ii) Pure Function: stateless/side effect free
//    Generative Function
function Application() {
    // Model
    this.counter = 0;
    this.spanCounter = null;
    this.updateModel = function() {
        console.log("updating model");
        this.counter++; // Update Model
        this.spanCounter.innerText = this.counter.toString();
    }
    this.updateModel = this.updateModel.bind(this)
    this.init = function(){
        console.log("initializing application");
        console.log(this.updateModel);
        this.spanCounter = document.getElementById("counter");
        setInterval(this.updateModel, 1_000)
    }
    this.updateModel = this.updateModel.bind(this)
    this.init = this.init.bind(this)
}
// window: build-in object
let app = new Application();
window.onload = app.init