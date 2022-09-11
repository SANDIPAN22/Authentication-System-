

const app = require("../src/app")
const request = require("supertest")
const db = require("../db/db")

// login test 

test("login test", async ()=>{

    // checking for http status code
    const resp01 = await request(app).post("/login").send({
        email: "ram04@test.com",
        password: "abc1234567890"
    }).expect(200)

    // grabing the user response data
    const res_user = JSON.parse(resp01.text).user

    // using db fetch the data of the user and match the tokens 
    const resp02 = await db.findById(res_user._id)
    console.log("RESSSP0111", res_user.tokens[res_user.tokens.length-1].token)
    console.log("RESP0222", resp02.tokens[resp02.tokens.length-1].token)
    const t = resp02.tokens
    
    // check whether the token which has been generated due login is present in the db or not 
    expect(res_user.tokens[res_user.tokens.length-1].token).toBe(resp02.tokens[resp02.tokens.length-1].token)



})