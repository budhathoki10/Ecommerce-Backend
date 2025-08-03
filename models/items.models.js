const mongoose = require("mongoose")
const itemsSchema= mongoose.Schema({
    productId:{
        type:String,
        required:true
    },

    productName:{
        type:String,
        required:true

    },
        Price:{
        type:Number
    },
})
const productdetails= mongoose.model("productdetails",itemsSchema)
module.exports= productdetails