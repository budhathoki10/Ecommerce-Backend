const express = require('express')
const AdminRouter = express.Router()
const {register,login,logout} = require('../authentication/loginsignup.authentication')
const {auth,isOwner}= require("../middleware/auth.middleware")
const {additems,updateitems,deleteItems}= require("../controller/Owner/CrudItems")
const {viewuser,deleteUser}= require("../controller/Owner/userManagement.owner")
const {addToCart,viewTocart}= require("../controller/Customer/Order")
const uploadImage= require("../services/Multer.services")
const viewCustomerOrder= require("../controller/Owner/viewCustomersCart.owner")
const DashBoard= require("../controller/Customer/dashboard.customer")
const handleCart= require("../controller/Owner/Handleorder.Owner")
// admin
AdminRouter.post('/admin/register', register)
AdminRouter.post('/admin/login', login)
AdminRouter.post('/admin/logout', logout)
// crud items
AdminRouter.post('/task/createitems',auth, isOwner,uploadImage.single("myfile"), additems)
AdminRouter.get('/task/dashboard',auth, DashBoard)
AdminRouter.put('/task/updateitems/:id',auth, isOwner,uploadImage.single("myfile"), updateitems)
AdminRouter.delete('/task/deleteitems/:id',auth, isOwner, deleteItems)
// handle orders
AdminRouter.get('/task/viewcustomercart',auth,isOwner,viewCustomerOrder)
AdminRouter.put('/task/Handleorder/:id',auth,isOwner,handleCart)
// crud user
AdminRouter.get('/task/viewusers',auth, isOwner, viewuser)
AdminRouter.post('/task/deleteusers/:id',auth, isOwner, deleteUser)
module.exports = AdminRouter