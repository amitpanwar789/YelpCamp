const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./nameHelper");
const campground = require("../models/CampModels");

mongoose
  .connect("mongodb://localhost:27017/-yelp-Camp")
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async function () {
  await campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const randomCity = Math.floor(Math.random() * 1000);
    const priceGenerator = Math.floor(Math.random()*5000) + 1000;
    const camp = new campground({
      title: `${random(descriptors)} ${random(places)}`,
      location: `${(cities[randomCity].city, cities[randomCity].state)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque assumenda esse deserunt voluptatibus ipsam expedita quos velit. Suscipit, omnis.",
      image: "https://source.unsplash.com/collection/483251",
      price:priceGenerator,
    });
    await camp.save();
  }
};
seedDB().then(() => mongoose.connection.close());
