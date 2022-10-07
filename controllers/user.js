const User = require("../models/User");

module.exports.renderRegisterForm = (req, res) => {
  res.render("users/register");
};

module.exports.registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password);
    req.login(registerUser, (err) => {
      if (err) return next(err);
      else {
        req.flash("success", "Welcome to Yelp Camp");
        return res.redirect("/campgrounds");
      }
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/register");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back");
  const redirectPage = req.session.cookie.check
    ? "/campgrounds/new"
    : "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectPage);
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      throw new ExpressError(message, 400);
    }
    req.flash("success", "Good Bye");
    res.redirect("/campgrounds");
  });
};
