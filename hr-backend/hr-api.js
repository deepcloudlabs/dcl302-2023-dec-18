const {connect, Schema, model} = require("mongoose");
const {ibanValidator, tcKimlikNoValidator} = require("./validations");

//region MongoDB Connection
connect(
    "mongodb://127.0.0.1:27017/hrdb",
    {
        "socketTimeoutMS": 0
    }
).then(() => console.log("Connected to the database"));
//endregion

//region Define Schema
const departmentSchema = new Schema({
    "name": {
        type: String,
        required: false,
        enum: ["IT", "Sales", "Finance", "HR"]
    }
});

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
        required: false
        // maxLength: 128000
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
    "department": departmentSchema
});
//endregion

const Employee = model("employees", employeeSchema);

//region API Configuration
const PORT=7100;
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const api = express();
const swaggerApiDoc =require("./resources/swagger-hr.json");

api.use(logger("dev"));
api.use(cors({origin: "*"}));
api.use(bodyParser.json({limit: "16m"}))
api.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerApiDoc))
//endregion

api.listen(PORT,()=>{
    console.log(`HR Rest API is running at port (${PORT})...`);
})