require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressLayout = require(`express-ejs-layouts`);

// Routers
const MoviesRouter = require("./routers/movies.router");
const { UsersRouter } = require("./routers/user.router");
const { isAuth } = require("./midllewares/auth");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("./node_modules"));
app.use(express.static("./assets"));
app.use(express.static("./images"));

app.use(express.json());
app.use(expressLayout);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "images")));
app.use(cookieParser());
const URL = "mongodb://localhost:27017/movieProject";
mongoose.connect(URL, () => {
  console.log("connected to bd");
});

app.get("/", isAuth, (req, res) => {
  res.redirect("events");
});
app.use("/movies", MoviesRouter);
app.use("/users", UsersRouter);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
