const express = require('express')
const cors = require('cors')
const port = 3015
const connectDB = require("./config/database")
const app = express()
const route = require('./config/route')
app.use(express.json())
app.use(cors())

connectDB()
app.use('/',route)

app.listen(port,()=>{
    console.log("listening to port",port)
})


