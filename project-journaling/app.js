require("dotenv").config();
require("./config/mongodb");
require("./helpers/hbs")

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const moment = require("moment");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dev_mode = false; // a changer pour faire les vérifs


const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();



//Session config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection, // you can store session infos in mongodb :)
      ttl: 24 * 60 * 60, // 1 day
    }),
    saveUninitialized: true,
    resave: true,
  })
);

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// CUSTOM MIDDLEWARES
if (dev_mode === true) {
  console.log('devmode enabled');
  app.use(require("./middlewares/devmode")); // triggers dev mode during dev phase
  app.use(require("./middlewares/debugSessionInfos")); // displays session debug
}
app.use(require("./middlewares/exposeLoginStatus"));
// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"));
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = 'Daysie';



const index = require('./routes/index');
app.use('/', index);
const auth = require('./routes/auth');
app.use('/auth', auth);
const dashboard = require('./routes/dashboard');
app.use('/dashboard', dashboard);


// TO DISPLAY ALL QUESTIONS AND ALL ANSWERS
const collections = require('./routes/collections');
app.use('/dashboard/collections', collections)

// ADMIN DASHBOARD (to manage questions and users with admin rights)
const admin = require('./routes/admin');
app.use('/admin', admin)

// TO EDIT USERS'S PROFILES
const profile = require('./routes/profile')
app.use('/profile', profile);

//TO CALENDAR
const calend = require('./routes/Cal');
const { Console } = require("console");
app.use('/calendar', calend);




module.exports = app;
