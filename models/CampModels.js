const { number, string } = require("joi");
const Review = require("./reviews");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };
const ImageSchema = new Schema({
  URL: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.URL.replace("/upload", "/upload/w_200,h_300");
});

const campGround = new Schema(
  {
    title: String,
    image: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
);

campGround.virtual("properties.popUpMarkup").get(function () {
  return `
  <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
  <p>${this.description.substring(0, 20)}...</p>`;
});

campGround.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({ id: { $in: doc.reviews } });
  }
});

module.exports = mongoose.model("CampGround", campGround);
