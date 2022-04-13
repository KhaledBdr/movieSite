const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name :{
        type : String,

    } ,
    email :{
        unique : true ,
        type : String,
        
    } ,
    password : String,
    forgetKey :String ,
    isAdmin : {type: Boolean , default: false}
})

module.exports.UserModel = mongoose.model('users', userSchema)
