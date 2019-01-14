const router = require("express").Router();
const passport = require("passport");
const passportSetup = require("../config/passport-setup");

// This middleWare function detects whether or not a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/google");
}

// Default page to show after logged in
router.get("/", isLoggedIn, function(req, res) {
  res.render("profile", {user: req.user});
});

module.exports = router;