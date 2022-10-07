const express = require("express");
const router = express.Router({ mergeParams: true });
const Campgrounds = require("../models/CampModels");
const Review = require("../models/reviews");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");
const { camgroundsSchema, reviewSchema } = require("../joiSchema");
const { isLogin, validateReviews, isReviewAuthor } = require("../middleware");
const review = require("../controllers/reviews");


router.post("/", isLogin, catchAsync(review.newReview));

router.delete(
  "/:reviewId",
  isLogin,
  isReviewAuthor,
  catchAsync(review.deleteReview)
);

module.exports = router;
