const io= require("socket.io-client");
const client = io.connect("http://localhost:7200");
client.on("connect",()=>{
    console.log("connected to the websocket server");
    client.on("hr-events", event => {
        console.log(event.toString());
    })
})