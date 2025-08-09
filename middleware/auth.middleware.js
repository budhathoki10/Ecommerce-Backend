const jwt = require("jsonwebtoken");
require("dotenv").config();
const uderdetails= require("../models/userdetails")

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token 

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Token not found" });
    }

    const verify = jwt.verify(token, process.env.SECRET_KEY);
    const userdata= await  uderdetails.findById(verify?.id)
    if (!userdata) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = userdata;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Error in header" });
  }
};
const isOwner= (req,res,next)=>{
    if(req.user?.email!="budhathokikushal170@gmail.com"){
    return res.status(401).json({ message: "admin access only" });
  }
  next()
}

module.exports =  {auth,isOwner};
