var express = require("express"),
  app = express(),
  methodOverride = require("method-override"),
bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash")
passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  connectDB = require('./config/db'),
  User = require("./models/user");

  connectDB();
var commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");


const PORT = process.env.PORT || 3000;


 
  
// seedDB();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(
  require("express-session")({
    secret: "I am the greatest",
    resave: false,
    saveUninitialized: false
  })
);
app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(indexRoutes);



app.listen(PORT, () => console.log(`Listening on ${PORT}`));



