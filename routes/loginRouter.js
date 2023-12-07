const express = require("express");
const router = express.Router();
const passport = require("passport");


router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), (req, res) => {
    const userID = req.user._id;
    req.flash("success", "Successfully signed in!");
    res.redirect(`/user/${userID}`)

});


module.exports = router;
