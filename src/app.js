const express = require("express")
const apis = require("./api")
const mongoose = require("mongoose")

const app = express()
PORT = process.env.PORT || 3000

app.use("/",apis)

app.get("/", (req, res)=>{
    res.status(200).send("ok")
})


mongoose.connect("mongodb+srv://###########################/auth_tool_db?retryWrites=true&w=majority").then((res)=>{
    console.log("Successfully connected the mongodb")
},
(err)=> console.log("Failed to connect the mongoDB")
)


app.listen(PORT, (err,res)=>{
    if(err){
        console.log("Sorry due to some error unable to start the NOde server")
    }
    else{
        console.log("Node backend server is up and running")
    }
})