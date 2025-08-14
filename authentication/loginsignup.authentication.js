const userdetail = require("../models/userdetails")
const bcrypt = require("bcrypt");
const {registerutils,LoginUtils}= require(".././utils/LoginRegister.utils")
const register = async (req, res) => {
  const {firstName,lastName,phonenumber,email,password}=req.body 
  const checkemail= await userdetail.findOne({email:email})
  if(checkemail){
    return res.status(400).json({message:"this email is already taken"})
  }
  if(!email.endsWith("@gmail.com")){
       return res.status(400).json({message:"this isnot email"})
  }
    if(phonenumber.length!=10 && !phonenumber.toString().startsWith(9)){
    return res.status(400).json({message:"invalid phone number"})
  }
  if(password.length<5){
    return res.status(400).json({message:"password must be greater than 5"})
  }

  const bcryptpassword= await registerutils(password)
  const newuser= new userdetail({
    firstName,
    lastName,
    phonenumber,
    email,
    password:bcryptpassword
  })
  await newuser.save()
  res.status(200).json({message:"user register sucessfully"})
}

const login= async (req,res)=>{
   const { email, password } = req.body;
  const findemail= await userdetail.findOne({email:email})
  if(!findemail){
    return res.status(400).json({message:"cannot find this email"})
  }
  const encp =await bcrypt.compare(password,findemail.password)
  if(!encp){
    return res.status(400).json({message:"incorrect password"})
  }
    let accessToken = await LoginUtils(password, findemail)
  res.status(200).cookie("token", accessToken).json({message:"sucessfully login",accessToken})
}
const logout= async (req,res) => {
  res.clearCookie("token")
  res.status(200).json({message:"logout"})
}


module.exports = {register,login,logout}