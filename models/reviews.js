const { Schema, model } = require("mongoose");
const Joi = require("joi");

const HttpError = require("../helpers/HttpError");

const reviewsSchema = new Schema(
  {
    rating: {
      type: String,
      required: [true, "Set title for task"],
    },
    comment: {
      type: String,
      required: [true, "Set timeStart for task"],
        },
    name: {
      type: String,
    },
    avatarURL: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

const reviewsAddSchema = Joi.object({
  rating: Joi.string().required().messages({
    "any.required": `"missing required rating field"`,
  }),
  comment: Joi.string().required().messages({
    "any.required": `"missing required comment field"`,
  }),

});

reviewsSchema.post("save", HttpError);

const Reviews = model("reviews", reviewsSchema);

module.exports = {
  reviewsAddSchema,
  Reviews,
};
