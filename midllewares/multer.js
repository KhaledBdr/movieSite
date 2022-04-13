const multer = require('multer')

const fileStorageMulter = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null , './images')
    },
    filename:(req,file,cb)=>{
        cb(null , Date.now()+'--' +file.originalname)
    }
})
module.exports.upload = multer({storage : fileStorageMulter})
