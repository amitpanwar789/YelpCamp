const { number, string } = require("joi");
const Review = require("./reviews");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const campGround = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  author :{
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

campGround.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({ id: { $in: doc.reviews } });
  }
});

module.exports = mongoose.model("CampGround", campGround);
