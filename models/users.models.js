const { UserModel} = require('./users.schema')
const bcrypt = require('bcrypt')

////////////////////////////
module.exports.signUp = async (data)=>{
    const isOld =await UserModel.find({email : data.email})
    if(isOld.length !== 0) return ("User Already Register")
    const newUser = new UserModel ({
        name : data.name,
        email : data.email,
        password: data.password,
        forgetKey : data.forgetKey,
        img : data.img
    })
    newUser.save()
    return(newUser)
}

/////////////////////////
module.exports.login = async(data)=>{
   const user =  await UserModel.findOne({email : data.email})
   if(!user) return (`Invalid Email or Password............`)
   const passwordMatch = await bcrypt.compare( data.password, user.password )
   if(!passwordMatch){
        return ('Invalid Email or Password............')
   }

   return (user)
}

/////////////////////////////////
module.exports.findUser = async(_id)=>{
    const user =await UserModel.findById(_id)
    return user
}

///////////////////////////////////////////////////////////////
module.exports.changePassword = async(data)=>{
   const user =  await UserModel.findOne({email : data.email})
   if(!user) return (`Email doesn't exists ${data.email}`)
   const passwordMatch = await bcrypt.compare( data.password, user.password )
   console.log(user)
   if(!passwordMatch)  return ('Correct Email but Wrong password')
   console.log(`Correct info......`)
  try{ 
    const newPassword = await data.newPassword ;
    const EditedUser = await UserModel.findByIdAndUpdate(user._id , {password : newPassword} , {new : true})
    return (EditedUser)
}
catch(err){
    return(err)
}}


//////////////////////////////////////////////////////
module.exports.forgetPassword = async(data)=>{
    const user =  await UserModel.findOne({email : data.email})
   if(!user) return (`Email doesn't exists ${data.email}`)
   if(data.forgetKey === user.forgetKey){
        try{ 
    const newPassword = await data.newPassword ;
    const EditedUser = await UserModel.findByIdAndUpdate(user._id , {password : newPassword} , {new : true})
    return (EditedUser)
}
catch(err){
    return(err)
}
   } else{
       return('Invalid Forget Key !!!!!!!....')
   }
}


