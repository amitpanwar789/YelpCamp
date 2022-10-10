const Campgrounds = require("../models/CampModels");
const { cloudinary } = require("../cloudinary/index");
const mbxGeoCoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeoCoding({ accessToken: mapboxToken });

module.exports.showCampgrounds = async (req, res) => {
  const campground = await Campgrounds.find({});
  const camp = res.render("campgrounds/index", { campground });
};

module.exports.renderNewForm = (req, res) => {
  //console.log(req.user);
  res.render("campgrounds/new");
};

module.exports.newCampground = async (req, res) => {
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();

  const campground = new Campgrounds(req.body.campground);
  campground.geometry = geoData.body.features[0].geometry;
  campground.author = req.user._id;
  campground.image = req.files.map((f) => ({
    URL: f.path,
    filename: f.filename,
  }));
  await campground.save();
  console.log(campground.geometry);
  req.flash("success", "Successfully made a new campground!");
  res.redirect("/campgrounds");
};

module.exports.editCampground = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const campground = await Campgrounds.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  const imgs = req.files.map((f) => ({
    URL: f.path,
    filename: f.filename,
  }));
  campground.image.push(...imgs);
  await campground.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({
      $pull: { image: { filename: { $in: req.body.deleteImages } } },
    });
  }
  if (!campground) {
    req.flash("error", "Cannot find that campground!");
    return res.redirect("/campgrounds");
  }
  res.redirect(`/campgrounds/${id}`);
};

module.exports.deleteCampground = async (req, res) => {
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
