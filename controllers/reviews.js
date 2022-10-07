const Campgrounds = require("../models/CampModels");
const Review = require("../models/reviews");

module.exports.newReview = async (req, res) => {
  //await Review.insertMany([req.body.review]);
  //console.log(req.body.review, req.params);
  const { id } = req.params;
  console.log(id);
  req.body.review.author = req.user._id;
  const review = new Review(req.body.review);
  const campground = await Campgrounds.findById(id);
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash("success", "Created new review!");
  res.redirect(`/campgrounds/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Campgrounds.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted review");
  res.redirect(`/campgrounds/${id}`);
};
