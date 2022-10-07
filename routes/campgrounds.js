const express = require("express");
const router = express.Router();
const Campgrounds = require("../models/CampModels");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");
const { camgroundsSchema } = require("../joiSchema");
const { isLogin, isAuthor, validateCampground } = require("../middleware");
const { populate } = require("../models/reviews");
const campground = require("../controllers/campgrounds");

router.get("/", catchAsync(campground.showCampgrounds));

router
  .route("/new")
  .get(isLogin, campground.renderNewForm)
  .post(isLogin, validateCampground, catchAsync(campground.newCampground));

router
  .route("/:id")
  .put(isLogin, isAuthor, catchAsync(campground.editCampground))
  .delete(isLogin, isAuthor, catchAsync(campground.deleteCampground))
  .get(catchAsync(campground.showCampgroundDetails));

router.get(
  "/:id/edit",
  isLogin,
  isAuthor,
  catchAsync(campground.renderEditForm)
);

module.exports = router;
