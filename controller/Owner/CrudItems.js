const productdetails = require("../../models/items.models");
const additems= async(req,res)=>{
    const {productId,productName,category,Price}=req.body
    const checkitem= await productdetails.findOne({productName:productName})
    if(checkitem){
        return res.status(404).json({message:`${productName} is already present`})
    }
    const newitem= new productdetails({
        productId,
        productName,
        category,
        Price
    });
    
    await newitem.save()
    res.status(200).json({message:`${productName} is added in database`})
}
const finddata = async (req, res) => {
    try {
        const {category,sort } = req.query;

   
        let query = {};
        if (category) {
            query.category = category;
        }

        const finddata = await productdetails.find(query).sort({Price:sort==="desc"?-1:1})

        if (finddata.length === 0) {
            return res.status(404).json({ message: "No items found" });
        }

        return res.status(200).json({ items: finddata });
    } catch (error) {
        console.error("Error while fetching data:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
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
module.exports= {additems,finddata,updateitems,deleteItems}