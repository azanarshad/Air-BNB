const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../Models/user.js");
const { Passport } = require("passport");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controller/user.js");



router.route("/signup")
.get( userController.renderSignup)
.post(
  
  wrapAsync(userController.signup)
);

router.route("/login")
.get( userController.renderLogin)
.post(
  
  saveRedirectUrl,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  wrapAsync(userController.login) 
)


router.get("/logout", userController.logout);

module.exports = router;
