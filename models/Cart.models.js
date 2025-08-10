const mongoose= require("mongoose")
const productdetails = require("./items.models")
const cartSystem= mongoose.Schema({
    
    productId:{
        type:Number,
        required:true
    },
    userdetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userDetails",
        required:true
},
    productdetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "productdetails",
        required:true
}
    })
const cart= mongoose.model("cartSystem",cartSystem)
module.exports= cart