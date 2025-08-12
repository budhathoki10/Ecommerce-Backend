const mongoose= require("mongoose")
const productdetails = require("./items.models")
const cartSystem= mongoose.Schema({
    userdetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userDetails",
        required:true
},
    Productitems:[
        {
        productdetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "productdetails",
        required:true
        },
        Productid:{
            type:String,
            required:true
        },
        productname:{
             type:String,
        },
    Quantity:{
        type:Number,
        required:true
    },
    Price:{
         type:Number,
    },
    }

    ],
    totoalprice:{
         type:Number,
    },
    status:{
        type:String,
        default:"pending"
    },
    location:{
         type:String,
       require:true
    },

    OrderDate:{
        type:Date,
        default:Date.now
    }
    

    });
const cart= mongoose.model("cartSystem",cartSystem)
module.exports= cart