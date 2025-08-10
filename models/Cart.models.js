const mongoose= require("mongoose")
const productdetails = require("./items.models")
const cartSystem= mongoose.Schema({
    
    // productId:{
    //     type:Number,
    //     required:true
    // },
    productName:{
        type:String,
    },
    Quantity:{
        type:Number,
        required:true
    },
    totalPrice:{
         type:Number,
    },
    status:{
        type:String,
        default:"pending"
    },

    userdetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userDetails",
        required:true
}
//     productdetails:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "productdetails",
//         required:true
// }
    })
const cart= mongoose.model("cartSystem",cartSystem)
module.exports= cart