const MoviesController = require('../controllers/moves.controller')
const { isAuth, isAdmin } = require('../midllewares/auth')
const {upload} = require('../midllewares/multer')
const { imgCheck, nameCheck, authorCheck, categoryCheck, yearCheck, evaluationCheck } = require('../validation/movie.validation')
const Router = require('express').Router()


Router.get('/category',isAuth , MoviesController.getMoviesCategory)    // done
Router.get('/name', isAuth , MoviesController.getByName)                // done
Router.get('/' , isAuth, MoviesController.getAllMovies)                 // done
Router.get('/delete' , isAuth , MoviesController.deleteMovie)            // done
Router.get('/add' ,isAuth ,isAdmin , MoviesController.getAdd)                    // done
Router.post('/add',isAuth ,isAdmin,upload.single('img'), nameCheck, authorCheck, categoryCheck, yearCheck , evaluationCheck , MoviesController.postNewMovie)            // done
Router.post('/update',isAuth ,isAdmin ,MoviesController.UpdateMovie)

module.exports = Router