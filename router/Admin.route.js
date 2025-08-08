const express = require('express')
const AdminRouter = express.Router()
const {register,login,logout} = require('../authentication/loginsignup.authentication')
const {auth,isOwner}= require("../middleware/auth.middleware")
const {additems,finddata,updateitems,deleteItems}= require("../controller/Owner/CrudItems")
const {viewuser,deleteUser}= require("../controller/Owner/userManagement.owner")
const uploadImage= require("../services/Multer.services")
// user
AdminRouter.post('/admin/register', register)
AdminRouter.post('/admin/login', login)
AdminRouter.post('/admin/logout', logout)
// crud items
AdminRouter.post('/task/createitems',auth, isOwner,uploadImage.single("myfile"), additems)
AdminRouter.get('/task/dashboard',auth, finddata)
AdminRouter.put('/task/updateitems/:id',auth, isOwner, updateitems)
AdminRouter.delete('/task/deleteitems/:id',auth, isOwner, deleteItems)

// crud user
AdminRouter.get('/task/viewusers',auth, isOwner, viewuser)
AdminRouter.post('/task/deleteusers/:id',auth, isOwner, deleteUser)
module.exports = AdminRouter