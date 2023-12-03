const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");

const User = require("../models/userModel");


router.get("/", (req, res) => {
    res.render("register")
});

router.post("/", catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome!');
            res.redirect('/');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/explore');
    }
}));


module.exports = router;
