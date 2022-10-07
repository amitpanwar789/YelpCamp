const passport = require("passport");
const ExpressError = require("./utils/ExpressError");
const Campgrounds = require("./models/CampModels");
const Review = require("./models/reviews");
const { camgroundsSchema, reviewSchema } = require("./joiSchema");


module.exports.isLogin = (req, res, next) => {
  
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be sign in first");
    return res.redirect("/login");
  }
  next();
};


module.exports.isAuthor = async (req, res , next)=>{
  const { id } = req.params;
    let campground = await Campgrounds.findById(id);
    if(!campground.author.equals(req.user._id)){
      req.flash('error' , "You don't have the permission to do that");
      return res.redirect(`/campgrounds/${id}`);   
    }
    next();
}

module.exports.isReviewAuthor = async (req, res , next)=>{
  const { reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
      req.flash('error' , "You don't have the permission to do that");
      return res.redirect(`/campgrounds/${id}`);   
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
  const { error } = camgroundsSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    throw new ExpressError(message, 400);
  } else next();
};

module.exports.validateReviews = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    throw new ExpressError(message, 400);
  } else next();
};

