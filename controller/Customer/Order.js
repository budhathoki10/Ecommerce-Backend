const cart= require("../../models/Cart.models.js");
const items= require("../../models/items.models.js");
const userdetail = require("../../models/userdetails.js");


const addToCart = async (req, res) => {
    
    try {
        const { productId,userdetails} = req.body;
        const userId = req.user?.id;
        // check if tem prensent in database
        const checkitems= await items.findOne({productId:productId})
        if (!checkitems) {
            return res.status(400).json({ message: "cannot find this item in datbase" });
        }
        console.log("hello");
        // check cart 
            const checkcart= await cart.findOne({productId:productId})
        if (checkcart) {
            return res.status(400).json({ message: "already present in cart" });
        }
        
        const newCartItem = new cart({
            productId,
            userdetails:userId
        });

        await newCartItem.save();
        res.status(201).json({ message: "Item added to cart successfully", item: newCartItem });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ message: "Internal Server Error dsd" });
    }
}
const viewTocart= async (req,res) => {
    try {
        const viewcart = await cart.find().populate("userdetails", "firstName lastName phonenumber email ")
        .populate("productdetails", "productName");
        if(viewcart.length === 0){
        return res.status(400).json({message:"no any order"})
    }

    res.status(200).json({data:viewcart})

    } catch (error) {
          res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports= {addToCart,viewTocart}
