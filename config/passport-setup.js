const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("./keys.js"); 
const User = require("../models/user");
const findOrCreate = require('mongoose-findorcreate');

const GOOGLE_CLIENT_ID = keys.GOOGLE.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = keys.GOOGLE.CLIENT_SECRET;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://webdevbootcamp-omarcobas.c9users.io/auth/google/redirect"
  },
  function(accessToken, refreshToken, profile, next) {
    User.findOrCreate(
      { 
        googleId: profile.id,
        username: profile.displayName,
        profileImage: profile.photos[0].value
      }, function (err, user) {
      return next(err, user);
    });
  }
));
