const router = require("express").Router();
const passport = require("passport");
const passportSetup = require("../config/passport-setup");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/google");
}

router.get("/", isLoggedIn, function(req, res) {
  res.render("profile", {user: req.user});
});

module.exports = router;