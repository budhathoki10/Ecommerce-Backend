const productdetails= require("../../models/items.models")
const additems= async(req,res)=>{
    console.log("hello");
    const {productId,productName,Price}=req.body
    const checkitem= await productdetails.findOne({productName:productName})
    if(checkitem){
        return res.status(404).json({message:"${productName} is already present"})
    }
    const newitem= new productdetails({
        productId,
        productName,
        Price
    });
    
    await newitem.save()
    res.status(200).json({message:`${productName} is added in database`})
}
module.exports= additems