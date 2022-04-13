const {check} = require('express-validator')

module.exports ={
nameCheck : 
    check('name').isString().notEmpty().withMessage('Enter the movie name').isLength({min:1 })
,evaluationCheck : 
    check('evaluation').isString().notEmpty().withMessage('Enter the movie evaluation')
,authorCheck : 
    check('author').isString().notEmpty().withMessage('Enter the movie author').isLength({min:5 , max:48 })
,yearCheck : 
    check('year').isNumeric().notEmpty().withMessage('Enter the year')
,categoryCheck : 
    check('category').isString().notEmpty().withMessage('Enter The Category').isLength({ min: 5})
}