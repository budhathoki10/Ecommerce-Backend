const express = require('express')
const app = express()
const router = require('./router/route.router')
const mongoose= require("mongoose")
const cookie= require("cookie-parser")
const cookieParser = require('cookie-parser')
require('dotenv').config()
app.use(express.json())
app.use(cookieParser())
mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
  console.log("sucessfully connected to mongodb");
})
.catch(()=>{
  console.log("error to connect in mongodb");
})
app.use('/api', router)
app.use((req,res)=>{
  res.status(404).json({message:"invalid route"})
})
app.listen(5000, () => {
  console.log('server running sucessfully')
})
