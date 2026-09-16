const mongoose = require("mongoose")

function conntectToDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("connected to mongodb database")
    })
    .catch((err)=>{
        console.log('Error in connecting to mongodb',err)
    })
}

module.exports = conntectToDB