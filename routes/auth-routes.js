const router = require("express").Router();
const passport = require("passport");
const passportSetup = require("../config/passport-setup");

// =============================================================================
// =========================== AUTHENTICATION ROUTES ===========================
// =============================================================================

// Login Route, renders the login page
router.get("/login", function(req, res) {
   res.render("login");
});

// Logout Route, logs the user out
router.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/");
});

// Auth with google route, passport authenticates the user and exports the user's profile
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/redirect', 
  passport.authenticate('google'),
  function(req, res) {
    // Successful authentication, redirect home (profile route)
    res.redirect("/profile");
  });
  
  module.exports = router;