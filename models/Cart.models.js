const mongoose= require("mongoose")
const cartSystem= mongoose.Schema({
    
    typeid:{
        type:Number,
        required:true
    },
userdetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdetails",
        required:true
}
    })
const cart= mongoose.model("cartSystem",cartSystem)
module.exports= cart