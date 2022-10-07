const Campgrounds = require("../models/CampModels");

module.exports.showCampgrounds = async (req, res) => {
  const campground = await Campgrounds.find({});
  const camp = res.render("campgrounds/index", { campground });
};

module.exports.renderNewForm = (req, res) => {
  //console.log(req.user);
  res.render("campgrounds/new");
};

module.exports.newCampground = async (req, res) => {
  const campground = new Campgrounds(req.body.campground);
  campground.author = req.user._id;
  await campground.save();
  req.flash("success", "Successfully made a new campground!");
  res.redirect("/campgrounds");
};

module.exports.editCampground = async (req, res) => {
  const { id } = req.params;

  const campground = await Campgrounds.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  if (!campground) {
    req.flash("error", "Cannot find that campground!");
    return res.redirect("/campgrounds");
  }
  res.redirect(`/campgrounds/${id}`);
};

module.exports.deleteCampgrounds = async (req, res) => {
  const { id } = req.params;
  const campground = await Campgrounds.findByIdAndDelete(id);
  if (!campground) {
    req.flash("error", "Cannot find that campground!");
    return res.redirect("/campgrounds");
  }
  res.redirect("/campgrounds");
};

module.exports.showCampgroundDetails = async (req, res) => {
  const { id } = req.params;
  const campground = await Campgrounds.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!campground) {
    req.flash("error", "Cannot find that campground!");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campgrounds.findById(id);
  res.render("campgrounds/edit", { campground });
};
