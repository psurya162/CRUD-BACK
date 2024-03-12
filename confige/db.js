const mongoose = require("mongoose")
const dbConnect = ()=>{
    try{
        const conn = mongoose.connect(process.env.MONGO_URL)
        console.log("DataBase Connected Successfully")
    }catch(err){
        console.log("DB not Connected")
    }
} 

module.exports = dbConnect;