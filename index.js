const express = require('express')
const dbConnect = require('./confige/db')
const app = express()
const dotenv = require("dotenv").config()
const PORT = process.env.PORT  || 4000
const authRouter = require("./routes/authRoutes")
const bodyparser = require("body-parser")
const cors = require("cors")
const { notFound, errorHandler } = require('./middlewars/errorHandler')
app.use(express.json())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(cors())




app.use('/api/userRegister',authRouter)

app.use(notFound)
app.use(errorHandler)

dbConnect()
app.listen(PORT,()=>{
    console.log(`server is runnning on ${PORT}`)
})