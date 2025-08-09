const cart= require("../../models/Cart.models.js");
const items= require("../../models/items.models.js")


const addToCart = async (req, res) => {
    const { typeid } = req.body;
    const userId = req.user?.id;

    try {
        // Check if the item already exists in the cart
        const checkitems= await items.findOne({typeid:typeid,userdetails: userId})
        if(!checkitems)
        // const existingCartItem = await cart.findOne({ typeid, userdetails: userId }).populate("userdetails", "firstName phonenumber" );
        if (checkitems) {
            return res.status(400).json({ message: "Item already exists in the cart" });
        }
        // Create a new cart item
        const newCartItem = new cart({
            typeid,
            userdetails: userId
        });

        await newCartItem.save();
        res.status(201).json({ message: "Item added to cart successfully", item: newCartItem });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const viewTocart= async (req,res) => {
    try {
        // const viewcart= await cart.find().populate("userdetails", "firstName phonenumber" );
        const viewcart= await cart.find()
        if(viewcart.length === 0){
        return res.status(400).json({message:"no any order"})
    }

    res.status(200).json({data:viewcart})

    } catch (error) {
          res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports= {addToCart,viewTocart}
