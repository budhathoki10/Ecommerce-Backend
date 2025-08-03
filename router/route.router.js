const express = require('express')
const router = express.Router()
const {register,login} = require('../authentication/loginsignup.authentication')
const {auth,isOwner}= require("../middleware/auth.middleware")
const additems= require("../controller/Owner/create")
// user
router.post('/register', register)
router.post('/login', login)

router.post('/create',  additems)
module.exports = router