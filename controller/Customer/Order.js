const cart= require("../../models/Cart.models.js");
const items= require("../../models/items.models.js");
const userdetail = require("../../models/userdetails.js");
let totalPrice;


const addToCart = async (req, res) => {
    
    try {
        const {userdetails,Quantity,status,productName} = req.body;
        const userId = req.user?.id;
        // check if tem prensent in database
       const id= req?.params?.id
       const checkItems= await items.findById(id)
        if (!checkItems) {
            return res.status(400).json({ message: "cannot find this item in datbase" });
        }
   
        // check cart 
        if(Quantity<=0){
            return res.status(400).json({message:"please use 1 or more Quantitiy"})
        }
        let totalPrice= Number(checkItems.Price)*Number(Quantity)
        let name= checkItems.productName
        const newCartItem = new cart({
            productName:name,
            Quantity,
            totalPrice,
            status,
            userdetails:userId
        });
                                    
        await newCartItem.save();
        res.status(201).json({ message: `Item added to cart successfully: ${checkItems.productName} is added in database`});
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ message: "Internal Server Error dsd" });
    }
}
const viewTocart= async (req,res) => {
    try {
       
        const viewcart = await cart.find().populate("userdetails", "firstName lastName phonenumber email ")
        if(viewcart.length === 0){
        return res.status(400).json({message:"no any order"})
    }

    res.status(200).json({data:viewcart})

    } catch (error) {
          res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports= {addToCart,viewTocart}
