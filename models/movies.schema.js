const mongoose = require('mongoose')
// const asyncMiddleware = require('../midllewares/asyncmidlleware')
const MovieScheme = mongoose.Schema({
    name : {
        type : String,
    },
    evaluation :  // التقييم
                {
                    type: String,
                    default : '0/10'
                },
    author : String,
    year : Number,
    category : String,
    img : {
        default : 'default.jpg',
        type : String
    }
})


module.exports.MovieModel = mongoose.model('movies' , MovieScheme)