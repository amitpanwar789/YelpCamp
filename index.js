const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campgrounds = require("./models/CampModels");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.listen("3000", () => {
  console.log("hel");
});
mongoose
  .connect("mongodb://localhost:27017/-yelp-Camp")
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.get("/", (req, res) => {
  res.send("It's Working");
});

app.get("/campgrounds", async (req, res) => {
  const campground = await Campgrounds.find({});
  const camp = res.render("campgrounds/index", { campground });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.post("/campgrounds/new", async (req, res) => {
  await Campgrounds.insertMany([req.body.campground]);
  //const newCampground = await Campgrounds.insertMany([{req.params.body}])
});

app.put("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campgrounds.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${id}`);
});

app.delete("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campgrounds.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campgrounds.findById(id);
  res.render("campgrounds/show", { campground });
});

app.get("/campgrounds/:id/edit", async (req, res) => {
  const { id } = req.params;
  const campground = await Campgrounds.findById(id);
  res.render("campgrounds/edit", { campground });
});
