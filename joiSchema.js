const Joi = require("joi");

module.exports.camgroundsSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required().max(20),
    price: Joi.number().min(0).required(),
    image: Joi.string().required(),
    description: Joi.string().required().min(10),
    location: Joi.string().required(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi
    .object({
      rating: Joi.number().required().min(0).max(5),
      body: Joi.string().required(),
    })
    .required(),
});
