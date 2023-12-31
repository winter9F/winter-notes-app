const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

const ExpressError = require("./utilities/ExpressError");
const limiter = require("./utilities/limiter");

const loginRouter = require("./routes/loginRouter")
const registerRouter = require("./routes/registerRouter")
const userRouter = require("./routes/userRouter")

const User = require("./models/userModel");

mongoose.connect('mongodb://127.0.0.1:27017/project2').
    catch(error => handleError(error));


const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


const sessionConfig = {
    name: "sessionprojectid",
    secret: 'eaeiwojadkdkdkdkeeee11121783591k432k34j!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true, -save for deployment
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());
app.use(mongoSanitize());
app.use(helmet({ contentSecurityPolicy: false }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


app.use(limiter)

app.use("/login", loginRouter);
app.use("/register", registerRouter)
app.use("/user", userRouter)



app.get("/", (req, res) => {
    res.render("home");
});

app.get("/trial", (req, res) => {
    res.render("trialPage")
})

app.get("/logout", (req, res) => {
    try {
        req.logOut(err => {
            if (err) return next(err);
            req.flash("success", "Logged out!");
            res.redirect('/');
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect('register');
    }
});

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404))
});


app.use((err, req, res, next) => {

    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something Went Wrong!"
    req.flash("error", err.message)
    console.log(err.message, err.stack)
    res.status(statusCode).redirect("back");
});


app.listen(3000, () => {
    console.log("Port 3000 Active!")
});