const {connect, Schema, model, Types} = require("mongoose");
const {ibanValidator, tcKimlikNoValidator, NO_IMAGE} = require("./validations");

//region MongoDB Connection
connect(
    "mongodb://127.0.0.1:27017/hrdb",
    {
        "socketTimeoutMS": 0
    }
).then(() => console.log("Connected to the database"));
//endregion

//region Define Schema
const employeeSchema = new Schema({
    "_id": Schema.Types.ObjectId,
    "fullname": {
        type: String,
        required: true,
        minLength: 5
    },
    "identityNo": {
        type: String,
        required: true,
        validate: [tcKimlikNoValidator, "You must provide a valid identity no!"]
    },
    "photo": {
        type: String,
        required: false,
        default: NO_IMAGE
    },
    "salary": {
        type: Number,
        required: true,
        min: 2000,
        default: 2000
    },
    "birthYear": {
        type: Number,
        required: true,
        max: 2008
    },
    "iban": {
        type: String,
        required: true,
        validate: [ibanValidator, "You must provide a valid iban!"]
    },
    "department": {
        type: String,
        required: true,
        enum: ["IT", "Sales", "Finance", "HR"]
    },
    "fulltime": {
        type: Boolean,
        required: false,
        default: true
    },
});
//endregion

const Employee = model("employees", employeeSchema);

//region API Configuration
const PORT = 7100;
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const api = express();
const swaggerApiDoc = require("./resources/swagger-hr.json");

api.use(logger("dev"));
api.use(cors({origin: "*"}));
api.use(bodyParser.json({limit: "16mb"}))
api.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerApiDoc))

const updatableFields = ["fullname", "iban", "salary", "photo", "fulltime", "department"];
//endregion

//region REST [over HTTP] API

//region POST /hr/api/v1/employees
api.post("/hr/api/v1/employees", (req, res) => {
    const employeeBody = req.body;
    employeeBody._id = new Types.ObjectId();
    const employee = new Employee(employeeBody);
    employee.save().then(savedEmployee => {
        console.log("Employee is saved to the mongodb.");
        res.status(200).send({status: "OK"});
        const hrEvent = {eventType: "EMPLOYEE_HIRED_EVENT", eventData: employeeBody};
        const hrEventAsJson = JSON.stringify(hrEvent);
        sessions.forEach(session => session.emit("hr-events", hrEventAsJson));
    }).catch(err => {
        console.log("error has occurred while saving the employee.");
        console.error(err);
        res.status(400).send({status: "ERROR", reason: err});
    });
});
//endregion

//region GET /hr/api/v1/employees/:identity
api.get("/hr/api/v1/employees/:identity", (req, res) => {
    const identity = req.params.identity;
    Employee.findOne(
        {"identityNo": identity}
    ).then(emp => {
        if (emp)
            res.status(200).send(emp);
        else
            res.status(404).send({status: "ERROR", reason: "Not found."});
    }).catch(err => {
        res.status(404).send({status: "ERROR", reason: "Not found."});
    });
});
//endregion

//region GET /hr/api/v1/employees?page=0&size=10
api.get("/hr/api/v1/employees", (req, res) => {
    const page = req.query.page || 0;
    const size = req.query.size || 10;
    const skip = page * size;
    const limit = size;
    Employee.find(
        {},
        {},
        {skip, limit}
    ).then(employees => {
        res.status(200).send(employees);
    }).catch(err => {
        res.status(404).send({status: "ERROR", reason: "Not found."});
    });
});
//endregion

//region PUT /hr/api/v1/employees/:identity
api.put("/hr/api/v1/employees/:identity", (req, res) => {
    const identity = req.params.identity;
    const employeeBody = req.body;
    const updatableEmployeeBody = {};
    for (const updatableField of updatableFields) {
        if (employeeBody.hasOwnProperty(updatableField))
            updatableEmployeeBody[updatableField] = employeeBody[updatableField];
    }
    Employee.updateOne(
        {"identityNo": identity},
        {"$set": updatableEmployeeBody},
        {"upsert": false}
    ).then(result => {
        if (result.matchedCount > 0) {
            console.log("Employee is updated to the mongodb.");
            res.status(200).send({status: "OK"});
        } else {
            res.status(404).send({status: "ERROR", reason: "Not found."});
        }
    }).catch(err => {
        console.error(err);
        res.status(400).send({status: "ERROR", reason: err});
    });
});
//endregion

//region PATCH /hr/api/v1/employees/:identity
api.patch("/hr/api/v1/employees/:identity", (req, res) => {
    const identity = req.params.identity;
    const employeeBody = req.body;
    const updatableEmployeeBody = {};
    for (const updatableField of updatableFields) {
        if (employeeBody.hasOwnProperty(updatableField))
            updatableEmployeeBody[updatableField] = employeeBody[updatableField];
    }
    console.log(updatableEmployeeBody)
    Employee.updateOne(
        {"identityNo": identity},
        {"$set": updatableEmployeeBody},
        {"upsert": false}
    ).then(result => {
        console.log(result)
        if (result.matchedCount > 0) {
            console.log("Employee is updated to the mongodb.");
            res.status(200).send({status: "OK"});
        } else {
            res.status(404).send({status: "ERROR", reason: "Not found."});
        }
    }).catch(err => {
        console.error(err);
        res.status(400).send({status: "ERROR", reason: err});
    });
});
//endregion

//region DELETE /hr/api/v1/employees/:identity
api.delete("/hr/api/v1/employees/:identity", (req, res) => {
    const identity = req.params.identity;
    Employee.findOneAndDelete(
        {"identityNo": identity},{}
    ).then(emp => {
        if (emp) {
            res.status(200).send({status: "OK"});
            const hrEvent = {eventType: "EMPLOYEE_FIRED_EVENT", eventData: emp};
            const hrEventAsJson = JSON.stringify(hrEvent);
            sessions.forEach(session => session.emit("hr-events", hrEventAsJson));
        } else {
            res.status(404).send({status: "ERROR", reason: "Not found."});
        }
    }).catch(err => {
        res.status(404).send({status: "ERROR", reason: "Not found."});
    });
});
//endregion

//endregion

api.listen(PORT, () => {
    console.log(`HR Rest API is running at port (${PORT})...`);
})

const {Server} = require("socket.io");
const io = new Server(7200, {cors: {origin: "*"}});
const sessions = [];
io.on("connection", session => {
    console.log(`New session is created: ${session.id}.`)
    sessions.push(session);
    io.on("disconnect", () => {
        sessions.splice(0, sessions.length, sessions.filter(_session => _session.id !== session.id));
        console.log(`The session (${session.id}) is closed.`)
    });
})
