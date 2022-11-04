const passport = require("passport");
const express = require("express");
const appConfig = require("../config/config");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("/home/tectoro/Downloads/google-authentication/views/pages/index.ejs");
});

router.get("/profile", isLoggedIn, function (req, res) {
  res.render("/home/tectoro/Downloads/google-authentication/views/pages/profile.ejs", {
    user: req.user,
  });
});

router.get("/error", isLoggedIn, function (req, res) {
  res.render("/home/tectoro/Downloads/google-authentication/views/pages/error.ejs");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile","email"] })
);

router.get("/auth/google/callback", function () {
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/error",
  });
});

router.get("/logout", function (req, res) {
  req.logOut();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) 
  return next();
  res.redirect("/");
}

module.exports = router;