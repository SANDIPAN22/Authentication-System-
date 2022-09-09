const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const profileSchema = new mongoose.Schema ({

    name: {
        type: String, 
        required: true,
        uppercase: true,
        validate(value){
            if (value.length <= 2){
                throw new Error ("Name is too short")
            }
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error ("This is not email format")
            }
        }

    },

    password: {
        type: String,
        required: true,
        minlength: 7

    },

    tokens:[{
        token: {
            type: String,
            required: true
            
        }
    }]

})

profileSchema.methods.generate_and_insert_token = async function(){

    const user = this

    token = jwt.sign({'_id': user._id}, "Itisprettycomplicatedstring")

    // here you can set login limits as per your wish
    
    if (user.tokens.length >= 2){
       
        user.tokens.splice(0,1)
       
    }
    
    user.tokens = user.tokens.concat({token})

    await user.save()

    return token

}

profileSchema.statics.validate_user_by_password = async function(email, password){
    
    const result = await db.findOne({email})
    console.log("Result==>", result)


    if (result){
        const val = await bcrypt.compare(password, result.password)

        if (val){
            return result
        }
        else{
            console.log("Login failed due to email-pass pair mismatch..")
            throw ("Did you know, it was an Wrong login attempt !!")
        }
    }
    else{
        console.log("Login failed due to email-pass pair mismatch..")
        throw ("Did you know, it was an Wrong login attempt !!")
    }
 

}

profileSchema.pre("save", async function (next){
    const user = this
    if (user.isModified("password")){
        user["password"] = await bcrypt.hash(user["password"], 10)
    }
    

    next()
})

const db = mongoose.model("auth_tool_collection", profileSchema)
module.exports = db