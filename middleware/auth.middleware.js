const jwt = require("jsonwebtoken");
require("dotenv").config();


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
   
    req.user = verify;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Error in header" });
  }
};
const isOwner= (req,res)=>{
    if(req.user?.email!="budhathokikushal170@gmail.com"){
    return res.status(401).json({ message: "admin access only" });
  }
}

module.exports =  {auth,isOwner};
