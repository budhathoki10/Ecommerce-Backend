const productdetails= require("../../models/items.models")
const additems= async(req,res)=>{
    const {productId,productName,Price}=req.body
    const checkitem= await productdetails.findOne({productName:productName})
    if(checkitem){
        return res.status(404).json({message:`${productName} is already present`})
    }
    const newitem= new productdetails({
        productId,
        productName,
        Price
    });
    await newitem.save()
    res.status(200).json({message:`${productName} is added in database`})
}
const viewitems= async(req,res)=>{
    const finddata = await productdetails.find();
    if(finddata.length===0){
        return res.status(404).json({message:"databsae is empty"})
    }
    res.status(200).json({items:finddata})
}
const updateitems = async(req,res)=>{
    const id= req.params.id
    const finddata = await productdetails.findById(id);
    if(!finddata){
        return res.status(404).json({message:"cannot find this id for update"})
    }
    const updateddata= await  productdetails.findByIdAndUpdate(id, 
        req.body, 
        {new:true})

       res.status(200).json({message:updateddata})

}
const deleteItems = async(req,res)=>{
    const id= req.params.id
    const finddata = await productdetails.findById(id);
    if(!finddata){
        return res.status(404).json({message:"cannot find this id  for delete"})
    }
    const deletedata= await  productdetails.findByIdAndDelete(id, 
        req.body, 
        {new:true})

       res.status(200).json({message:deletedata})

}
module.exports= {additems,viewitems,updateitems,deleteItems}