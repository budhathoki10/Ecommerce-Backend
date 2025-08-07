const express = require('express')
const router = express.Router()
const {register,login,logout} = require('../authentication/loginsignup.authentication')
const {auth,isOwner}= require("../middleware/auth.middleware")
const {additems,finddata,updateitems,deleteItems}= require("../controller/Owner/create")
// user
router.post('/user/register', register)
router.post('/user/login', login)
router.post('/user/logout', logout)

router.post('/task/createitems',auth, isOwner, additems)
router.get('/task/dashboard',auth, finddata)
router.put('/task/updateitems/:id',auth, isOwner, updateitems)
router.delete('/task/deleteitems/:id',auth, isOwner, deleteItems)
module.exports = router