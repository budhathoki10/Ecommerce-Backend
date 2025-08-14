const cart= require("../../models/Cart.models")

const handleCart= async(req,res)=>{
    const {status}= req.body
    console.log("hello");
    const id= req.params.id
    console.log(id);
    const verifyid= await cart.findById(id)
    if(!verifyid){
        return res.status(400).json({message:"cannot find this order"})
    }
    const update= {
        status:status
    }
    const HandleRequest= await cart.findByIdAndUpdate(id,update,{new:true})
    if(!HandleRequest){
         return res.status(400).json({message:"error to update "})
    }
    await HandleRequest.save()
    res.status(200).json({message:`order from ${verifyid.userdetails.firstName} has been ${verifyid.status}` })
}
module.exports= handleCart