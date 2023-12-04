const express = require("express");
const router = express.Router();

const catchAsync = require("../utilities/catchAsync");
const postLimiter = require("../utilities/postLimiter");

const User = require("../models/userModel");
const Note = require("../models/noteModel");

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Must be signed in!");
        return res.redirect("/login");
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



router.get("/", catchAsync(async (req, res) => {    //add :id to fix
    const note = await Note.find();
    res.render("userPage", { note });

}));

// router.get("/", catchAsync(async (req, res) => {    //add :id to fix
//     const { id } = req.params;
//     const post = await Note.find({ author: id });
//     const user = await User.findById(id);
//     res.render("userPage", { post, user, id });

// }));


router.post("/", //isLoggedIn, postLimiter, catchAsync
    (async (req, res, next) => {
        const note = new Note(req.body);
        // note.author = req.user;
        await note.save();

        res.redirect("back");
    }));


router.put("/:id", isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = (req.params);
    const note = await Note.findByIdAndUpdate(id, req.body);
    await note.save();
    res.redirect("back");

}));


router.delete("/:id", isLoggedIn, catchAsync(async (req, res) => {
    const { id } = (req.params);
    await Note.findByIdAndDelete(id);
    res.redirect("back");

}));



module.exports = router;
