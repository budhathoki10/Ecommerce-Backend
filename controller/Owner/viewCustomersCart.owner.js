const cart= require("../../models/Cart.models")
const viewCustomerOrder= async (req,res)=>{
    const data= await cart.find({status:"pending"}).populate("userdetails","firstName lastName email")
    if(data.length==0){
        return res.status(404).json({message:"no more orders"})
    }
    res.status(200).json({message:"datas",data:data})
}
module.exports= viewCustomerOrder