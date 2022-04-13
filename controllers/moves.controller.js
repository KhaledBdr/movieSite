const MoviesModel = require("../models/moves.model");
const joi = require("joi");
const config = require("config");
const jwt = require("json-web-token");
const ImageCON = require("image-conversion");
const { validationResult } = require("express-validator");

module.exports.getAllMovies = async (req, res, next) => {
  const Movies = await MoviesModel.getSavedMovies();

  if (Movies.length === 0) return res.send(`There is No Movie yet`);
  res.status(200).render("index", {
    errors: false,
    movies: Movies,
    title: "Movies",
    isAdmin: req.user.isAdmin,
    active: "home",
    search: false,
    cat: false,
    isUser: req.user ? true : false,
  });
};

module.exports.getMoviesCategory = async (req, res, next) => {
  const Movies = await MoviesModel.getMoviesByCategory(req.query.category);
  if (Movies.length === 0) return res.send(`There is No Movie yet`);
  res.status(200).render("index", {
    movies: Movies,
    title: "Movies",
    errors: false,
    active: "home",
    isAdmin: req.user.isAdmin,
    isUser: req.user ? true : false,
    search: false,
    cat: req.query.category,
  });
};

module.exports.getByName = async (req, res, next) => {
  const result = await MoviesModel.searchByName(req.query.name);
  res.status(200).render("index", {
    movies: result,
    title: req.query.name,
    errors: false,
    active: "home",
    isAdmin: req.user.isAdmin,
    isUser: req.user ? true : false,
    search: req.query,
    cat: false,
  });
};

module.exports.deleteMovie = async (req, res, next) => {
  const deletedItem = await MoviesModel.deleteMovie(req.query._id);
  res.status(200).render("index", {
    title: "movies - Admin Panel",
    errors: false,
    active: "home",
    movies: await MoviesModel.getSavedMovies(),
    isAdmin: req.user.isAdmin,
    isUser: req.user ? true : false,
    cat: false,
    search: false,
  });
};

module.exports.UpdateMovie = async (req, res, next) => {
  const data = {
    name: req.body.name,
    evaluation: req.body.evaluation,
    author: req.body.author,
    year: req.body.year,
    category: req.body.category,
  };
  const { error } = validationResult(data);
  if (error) {
    const Movies = await MoviesModel.getSavedMovies();
    if (Movies.length === 0)
      return res.render("index", {
        title: "Movie ",
        movies: "There are no movies rn",
        errors: error,
        isAdmin: req.user.isAdmin,
        isUser: req.user ? true : false,
        cat: false,
        search: false,
      });
    return res.render("index", {
      title: "Movie ",
      movies: Movies,
      errors: error,
      isAdmin: req.user.isAdmin,
      isUser: req.user ? true : false,
      active: "home",
      cat: false,
      search: false,
    });
  }
  const UpdatedItem = await MoviesModel.updateMovie(req.body._id, data);
  res.render("index", {
    title: "movies - Admin Panel",
    isAdmin: req.user.isAdmin,
    isUser: req.user ? true : false,
    errors: false,
    active: "home",
    movies: await MoviesModel.getSavedMovies(),
    isAdmin: req.user.isAdmin,
    isUser: req.user ? true : false,
    cat: false,
    search: false,
  });
};

module.exports.getAdd = (req, res, next) => {
  res.render("add-movie", {
    title: "Add Movie",
    errors: false,
    isAdmin: req.user.isAdmin,
    isUser: req.user ? true : false,
    active: "add",
    cat: false,
    search: false,
    data: [],
  });
};

//////////////////////////////////////
module.exports.postNewMovie = async (req, res, next) => {
  let img;
  if (req.file == undefined) {
    img = "default.jpg";
  } else {
    img = req.file.filename;
  }
  const data = {
    name: req.body.name,
    evaluation: req.body.evaluation,
    author: req.body.author,
    year: req.body.year,
    category: req.body.category,
    img: img,
  };
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.render("add-movie", {
      title: "Add Movie",
      errors: errors.array(),
      isAdmin: req.user.isAdmin,
      isUser: req.user ? true : false,
      active: "add",
      cat: false,
      search: false,
      data: data,
    });

  const result = await MoviesModel.saveNewMovie(data);
  res.redirect("/movies");
};
