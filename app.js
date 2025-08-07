const express = require('express')
const app = express()
const CustomerRouter= require("./router/Customers.route")
const AdminRouter= require("./router/Admin.route")
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
app.use('/api', CustomerRouter)
app.use('/api', AdminRouter)
app.use((req,res)=>{
  res.status(404).json({message:"invalid route"})
})
app.listen(5000, () => {
  console.log('server running sucessfully')
})
