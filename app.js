const path = require("path");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const User=require('./models/user')

const errorController = require('./controllers/error');

const MONGODB_URI = process.env.DB_CONN;

const app = express();
const store= new MongoDBStore({
 uri:MONGODB_URI,
 collection:"sessions" 
})

const csrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views");

const userRoutes=require('./routes/user')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//uses virtual directory path to public
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(session({
  secret:process.env.secret,
  resave:false,
  saveUninitialized: false,
  store:store 
}))
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(userRoutes)


app.use(errorController.geterror);


mongoose
  .connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then((result) => {
    console.log("Database connected");
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
