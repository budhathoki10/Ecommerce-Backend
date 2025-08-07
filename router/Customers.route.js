const express = require('express')
const CustomerRouter = express.Router()
const {register,login,logout} = require('../authentication/loginsignup.authentication')
const {auth,isOwner}= require("../middleware/auth.middleware")
const {additems,finddata,updateitems,deleteItems}= require("../controller/Owner/CrudItems")
// user
CustomerRouter.post('/user/register', register)
CustomerRouter.post('/user/login', login)
CustomerRouter.post('/user/logout', logout)


CustomerRouter.get('/task/dashboard',auth, finddata)
module.exports = CustomerRouter