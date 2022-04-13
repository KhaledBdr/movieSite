const jwt = require("json-web-token")

module.exports.isAuth = (req, res, next)=>{
    if(req.cookies.token){
        jwt.decode(process.env.jwtPrivateKey , req.cookies.token.value , (err , user)=>{
            if(!err){
                req.user = user
                next()
            }
        })
    }else{
        res.redirect('/users/Login')
    }
}
module.exports.isAdmin = (req, res, next)=>{
    if(req.user.isAdmin){
                next()
    }else{
        res.redirect('/movies')
    }
}

module.exports.isnotUser = (req, res, next)=>{
    if(! req.cookies.token){
                next()
    }else{
        res.redirect('/movies')
    }
}