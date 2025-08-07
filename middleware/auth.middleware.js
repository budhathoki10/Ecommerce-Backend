const jwt = require("jsonwebtoken");
require("dotenv").config();
const uderdetails= require("../authentication/loginsignup.authentication")

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token 

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Token not found" });
    }

    const verify = jwt.verify(token, process.env.SECRET_KEY);

    if (!verify) {
      return res.status(401).json({ message: "Invalid token" });
    }
   const userdata= await  uderdetails.findByID(verify?.id)
   console.log(userdata);
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
