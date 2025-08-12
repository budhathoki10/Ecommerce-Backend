const productdetails = require("../../models/items.models");
const uploadImageToCloudinary = require("../../utils/Cloudinary.utils")
const additems= async(req,res)=>{
    const {productId,productName,category,Price,image,imageDetails,description,stock}=req.body
    const checkitem= await productdetails.findOne({productName:productName})
    if(checkitem){
        return res.status(404).json({message:`${productName} is already present`})
    }
        const imagedata= await uploadImageToCloudinary(req.file.buffer)
        const newitem= new productdetails({
        productId,
        productName,
        category,
        Price,
        image:req.file.originalname  || "no need of image",
        imageDetails:imagedata || null,
        description,
        stock

    });
    
    await newitem.save()
    res.status(200).json({message:`${productName} is added in database`})
}

const updateitems = async(req,res)=>{
    const {productId,productName,category,Price,image,imageDetails,description,stock}=req.body
    const id= req.params.id
    const checkitems = await productdetails.findById(id);
    if(!checkitems){
        return res.status(404).json({message:"cannot find this id for update"})
    }
    let images= checkitems.originalname;
    let imgdtl= checkitems.imagedata

    if(req.file){
     images= req.file.originalname;
     imgdtl= await uploadImageToCloudinary(req.file.buffer)
    }
    const update_data= {
        productId,
        productName,
        category,
        Price,
        image:images || "no need of image",
        imageDetails:imgdtl || null,
        description,
        stock

    }
    const updateddata= await  productdetails.findByIdAndUpdate(
        checkitems._id, 
        update_data,
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

       res.status(200).json({message:"items deleted sucessfully",data:deletedata})

}
module.exports= {additems,updateitems,deleteItems}