const db = require("../db/db")
const jwt = require("jsonwebtoken")

const auth = async (req, res, next)=>{
    try{
    tok = req.cookies.tok
    console.log(tok)
    decoded = jwt.verify(tok, "Itisprettycomplicatedstring")
    console.log(decoded)

    // fetch based on the decoded token data
    const report = await db.findOne({_id:decoded._id, "tokens.token": tok})
        console.log(report)
    if (!report){
        res.status(401).send("Sorry, please go and re-login. I can't recall you..") 
    }

    else{
        req.user = report
        req.token = tok
        next()
    }
    }
    catch(err){
        
        res.status(401).send("Sorry, please go and re-lo00ogin. I can't recall you..") 
    }
}

module.exports = auth