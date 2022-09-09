const express = require("express")
const router = express.Router()
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const db = require("../db/db")
const auth = require("./auth")
const cookieparser = require("cookie-parser")

router.use(bodyparser.json())
router.use(cookieparser())

router.post("/signup", async (req,res)=>{

    const newUserStructure = {
        name : req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    const user = new db(newUserStructure)
    try{
    const report = await user.save()
    const token = await report.generate_and_insert_token()
    res.cookie("tok", token)
    res.status(201).send({"user":report})

    }
    catch(err){
        res.status(400).send(err)
    }

})


router.post("/login", async (req,res)=>{

    try{
    const user = await db.validate_user_by_password(req.body.email, req.body.password)
    
    const token = await user.generate_and_insert_token()
    res.cookie("tok", token)
    res.status(200).send({"user":user})
    }
    catch(err){
        res.status(400).send(err)
    }
})


router.get("/profile", auth ,async(req,res)=>{
    

        const user = req.user
        res.status(200).send(user)


})

router.get("/logout", auth , async(req, res)=>{
    console.log(req.user)
    req.user.tokens = req.user.tokens.filter((t)=>{
        return t.token !== req.token
    })


    await req.user.save()
    res.send("this device has been logged out ")
})

router.get("/logout_all", auth , async(req, res)=>{
    console.log(req.user)
    req.user.tokens = []


    await req.user.save()
    res.send("All the devices have been logged out ")
})

module.exports = router