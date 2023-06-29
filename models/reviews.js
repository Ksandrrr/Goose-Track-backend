import { Schema, model } from "mongoose";
import  Joi from "joi"

import handleMongooseError from "../helpers/HandleMongooseError.js"

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

reviewsSchema.post("save", handleMongooseError);

const Reviews = model("reviews", reviewsSchema);

export  {
  reviewsAddSchema,
  Reviews,
};
