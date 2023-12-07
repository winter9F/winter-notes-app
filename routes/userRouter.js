const express = require("express");
const router = express.Router();

const catchAsync = require("../utilities/catchAsync");
const postLimiter = require("../utilities/postLimiter");

const User = require("../models/userModel");
const Note = require("../models/noteModel");

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Must be signed in!");
        return res.redirect("/");
    };
    next();
};

const isAuthor = async (req, res, next) => {

    const { id } = req.params;
    const note = await Note.findById(id);
    const { author } = note

    if (!author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect("/");
    };
    next();
};



router.get("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const note = await Note.find({ author: id });
    const user = await User.findById(id);
    res.render("userPage", { note, user, id });

}));


router.post("/", isLoggedIn, postLimiter, catchAsync(async (req, res, next) => {
    const userID = req.user._id;
    const note = new Note(req.body);
    note.author = req.user;
    await note.save();

    res.redirect(`/user/${userID}`)
}));


router.put("/:id", isLoggedIn, postLimiter, catchAsync(async (req, res) => {
    const userID = req.user._id;
    const { id } = (req.params);
    const note = await Note.findByIdAndUpdate(id, req.body);
    await note.save();
    res.redirect(`/user/${userID}`)

}));


router.delete("/:id", isLoggedIn, postLimiter, catchAsync(async (req, res) => {
    const userID = req.user._id;
    const { id } = (req.params);
    await Note.findByIdAndDelete(id);
    res.redirect(`/user/${userID}`)

}));



module.exports = router;
