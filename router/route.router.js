const express = require('express')
const router = express.Router()
const {register,login} = require('../authentication/loginsignup.authentication')
const {auth,isOwner}= require("../middleware/auth.middleware")
const {additems,viewitems,updateitems,deleteItems}= require("../controller/Owner/create")
// user
router.post('/register', register)
router.post('/login', login)

router.post('/createitems',auth, isOwner, additems)
router.get('/viewitems',auth, viewitems)
router.put('/updateitems/:id',auth, isOwner, updateitems)
router.delete('/deleteitems/:id',auth, isOwner, deleteItems)
module.exports = router