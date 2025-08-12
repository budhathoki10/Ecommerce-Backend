const productdetails = require("../../models/items.models");

const DashBoard = async (req, res) => {
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
module.exports= DashBoard