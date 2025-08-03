const mongoose = require("mongoose")
const userSchema= mongoose.Schema({
    firstName:{
        type:String,
        required:true

    },
        phonenumber:{
        type:Number
    },

        lastName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const userdetail= mongoose.model("userDetails",userSchema)
module.exports= userdetail