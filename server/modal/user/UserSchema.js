const mongoose = require('mongoose')

const userschema= mongoose.Schema({
    userName:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    phone:{
        type:String,
        required:[true,'number is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    date:{
        type:Date,
        default:Date.now
    },
})


const usermodel=mongoose.model('users',userschema)
module.exports = usermodel