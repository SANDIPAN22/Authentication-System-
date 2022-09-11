const express = require("express")
const apis = require("./api")
const mongoose = require("mongoose")

const app = express()
PORT = process.env.PORT || 3000

app.use("/",apis)

app.get("/", (req, res)=>{
    res.status(200).send("ok")
})


mongoose.connect("mongodb+srv://@cluster0.psojri2.mongodb.net/auth_tool_db?retryWrites=true&w=majority").then((res)=>{
    console.log("Successfully connected the mongodb")
},
(err)=> console.log("Failed to connect the mongoDB")
)

module.exports = app