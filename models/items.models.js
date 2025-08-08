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
    category:{
             type:String,
             required:true
    },
        Price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        default:"no image",

    },
    imageDetails:{
        type: {
        url: String,
        public_id: String,
      },
      default: null,
    }
})
const productdetails= mongoose.model("productdetails",itemsSchema)
module.exports= productdetails