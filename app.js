const express             = require("express"),
      app                 = express(),
      mongoose            = require("mongoose"),
      bodyParser          = require("body-parser"),
      methodOverride      = require('method-override'),
      cookieSession       = require("cookie-session"),
      passport            = require("passport"),
      GoogleStrategy = require('passport-google-oauth20').Strategy,
      keys                = require("./config/keys.js"),
      User                = require("./models/user"),
      Club                = require("./models/club"),
      authRoutes          = require("./routes/auth-routes"),
      profileRoutes       = require("./routes/profile-routes"),
      clubRoutes          = require("./routes/club-routes"),
      googleCalendarSetup = require("./config/google-calendar-setup");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Development Cloud9 Database
mongoose.connect(keys.MONGODB.DEVELOPMENT_DB_URI, { useNewUrlParser: true });

// Production MLab Database
// mongoose.connect(keys.MONGODB.PRODUCTION_DB_URI, { useNewUrlParser: true });

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id); 
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
    User.findById(id).then(function(user) {
        done(null, user);
    });
});

// override with POST having ?_method=PUT && ?_method=DELETE
app.use(methodOverride('_method'));
app.set("view engine", "ejs");

// Encryptes the cookie, USER ID, the cookie lasts one day in milliseconds
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: keys.SESSION.COOKIE_KEY
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// set up auth routes
app.use("/auth", authRoutes);

//set up profile routes
app.use("/profile", profileRoutes);

// set up club routes
app.use(clubRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("The server is running!"); 
});