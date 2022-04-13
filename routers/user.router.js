const userController = require('../controllers/users.controller')
const { isAuth, isnotUser } = require('../midllewares/auth')
const express = require('express')
const router = express.Router()

router.get('/Registeration' ,isnotUser,userController.getRegisteration)
router.post('/Registeration' , userController.Registeration)
router.get('/Login' ,isnotUser, userController.getLogin)
router.post('/Login' , userController.Loging)
router.get('/me',isAuth ,userController.getMe)
router.post('/password',isAuth , userController.changePassword)
// router.post('/resetPassword', isAuth , userController.forgetPassword)
router.get('/logout' , (req , res)=>{
    res.clearCookie('token').redirect('/users/login')
})
module.exports.UsersRouter = router