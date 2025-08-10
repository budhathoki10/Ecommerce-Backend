const express = require('express')
const CustomerRouter = express.Router()
const {register,login,logout} = require('../authentication/loginsignup.authentication')
const {auth,isOwner}= require("../middleware/auth.middleware")
const {additems,finddata,updateitems,deleteItems}= require("../controller/Owner/CrudItems")
const {addToCart,viewTocart}= require("../controller/Customer/Order")
// user
CustomerRouter.post('/user/register', register)
CustomerRouter.post('/user/login', login)
CustomerRouter.post('/user/logout', logout)
CustomerRouter.post('/user/logout', logout)
CustomerRouter.post('/task/addtocart/:id',auth, addToCart)
CustomerRouter.get('/task/dashboard',auth, finddata)
module.exports = CustomerRouter