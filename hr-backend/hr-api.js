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
    "iban": {
        type: String,
        required: true,
        validate: [ibanValidator, "You must provide a valid iban!"]
    },
    "department": {
        type: String,
        required: true,
        enum: ["IT", "Sales", "Finance", "HR"]
    }
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
//endregion

//region REST [over HTTP] API
api.post("/hr/api/v1/employees", (req, res) => {
    const employeeBody = req.body;
    employeeBody._id = new Types.ObjectId();
    const employee = new Employee(employeeBody);
    employee.save().then(savedEmployee => {
        console.log("Employee is saved to the mongodb.");
        res.status(200).send({status: "OK"});
    }).catch(err => {
        console.log("error has occurred while saving the employee.");
        console.error(err);
        res.status(400).send({status: "ERROR", reason: err});
    });
});

//endregion

api.listen(PORT, () => {
    console.log(`HR Rest API is running at port (${PORT})...`);
})