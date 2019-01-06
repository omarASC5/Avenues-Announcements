const router = require("express").Router();
const passport = require("passport");
const passportSetup = require("../config/passport-setup");

// =============================================================================
// =========================== AUTHENTICATION ROUTES ===========================
// =============================================================================

router.get("/login", function(req, res) {
   res.render("login");
});

router.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/");
});

// Auth with google route
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/redirect', 
  passport.authenticate('google'),
  function(req, res) {
    // Successful authentication, redirect home.
    // res.send("Hi, " + req.user.username);
    res.redirect("/profile");
  });
  
  module.exports = router;