const joi = require('joi')
const jwt = require('json-web-token')
const bcrypt = require('bcrypt')
const userModel = require('../models/users.models')

module.exports.getRegisteration = async(req , res )=>{
    res.render('Registeration' , {
        title : "Sign up",
        active : 'register',
        errors : false,
        isUser :  false,
        isAdmin : false,
        data : false
    })
}
module.exports.Registeration = async(req , res, next)=>{
    const {error} = userValidationInfo(req.body)
    if(error) return res.status(400).render('Registeration',{
        data : req.body,
        errors : error.details,
        title: "Sign up",
        active : "register",
        isUser :  false,
        isAdmin : false,
    })
        const hashedPassword =await bcrypt.hash(req.body.password , 10) 
    const data = {
        name : req.body.name,
        password : hashedPassword,
        email : req.body.email,
        forgetKey : req.body.forgetKey,
    }

       const newUser =await userModel.signUp(data) 
       res.redirect('/users/Login')
    
}

module.exports.getLogin = async(req , res , next)=>{
    res.render('log-in' ,{
        title : "Sign in",
        active : 'login',
        errors : false,
        isUser :  false,
        isAdmin :false ,
        user : false,
        loginInfo : false
    })
}

module.exports.Loging = async (req , res , next )=>{

    const data = {
        email : req.body.email,
        password : req.body.password,
    }
    const Result = await userModel.login(data)
    if(Result !== "Invalid Email or Password............"){
            const token = jwt.encode(process.env.jwtPrivateKey , Result)
            res.cookie("token", token , {
                maxAge : 2999999999999999999999999999,
                httpOnly : true
            })
            
            res.redirect('/movies')
}else{
    return res.render('log-in' ,{
        title : "Sign in",
        active : 'login',
        errors : Result,
        isUser :  false,
        isAdmin : false , 
        user : req.body,
        loginInfo : data
    })
}
}

module.exports.getMe =async (req , res , next)=>{
    const user = await userModel.findUser(req.user._id)
    res.send(user)
}

module.exports.changePassword = async (req , res , next)=>{
    const {error} = confirmPassword(req.body)
    if(error) return res.send(error.details[0].message).status(400)

  if(req.body.password !== req.body.newPassword){
        if(req.body.newPassword === req.body.confirmPassword){
            const hashedPassword = bcrypt.hash(req.body.newPassword , 10)
        const data = {
            email : req.body.email,
            password : req.body.oldPassword,
            newPassword : hashedPassword
        }
        const Result = await userModel.changePassword(data)
        res.send(Result)
        }else{
            return res.send("Passwords don't match")
        }
    }else{
        return res.status(202).send("You Entered the same Password")
    }
}

function userValidationInfo (data){
    const usersSchemaValidation = joi.object({
        name : joi.string().required().min(8).max(30),
        email : joi.string().email().required().min(12).max(30),
        password : joi.string().required().min(8).max(32),
        confimPassword : joi.string().required().min(8).max(32),
        forgetKey : joi.string().required().min(10)
    })
    return usersSchemaValidation.validate(data)
}

function confirmPassword (data){
    const passwordSchemaValidation = joi.object({
        email : joi.string().email().required().min(12).max(30),
        oldPassword : joi.string().required().min(8).max(32),
        newPassword : joi.string().required().min(8).max(32),
        confirmPassword : joi.string().required().min(8).max(32),
    })

    return passwordSchemaValidation.validate(data)
}

function forgetPasswordValidation (data){
    const passwordValidation = joi.object({
        email : joi.string().email().required().min(12).max(30),
        forgetKey : joi.string().required().min(10),
        newPassword : joi.string().required().min(8).max(32),
        confirmPassword : joi.string().required().min(8).max(32),
    })

    return passwordValidation.validate(data)
}