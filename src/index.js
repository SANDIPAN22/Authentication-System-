const app = require("./app")


app.listen(PORT, (err,res)=>{
    if(err){
        console.log("Sorry due to some error unable to start the NOde server")
    }
    else{
        console.log("Node backend server is up and running")
    }
})