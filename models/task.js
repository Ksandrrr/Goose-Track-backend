import { Schema, model } from "mongoose";
import  Joi from "joi"

import handleMongooseError from "../helpers/handleMongooseError.js"

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for task"],
    },
    timeStart: {
      type: String,
      required: [true, "Set timeStart for task"],
    },
    timeEnd: {
      type: String,
      required: [true, "Set timeEnd for task"],
    },
    priority: {
      type: String,
      required: [true, "Set priority for task"],
    },
    month: {
      type: String,
      required: [true, "Set month for task"],
    },
    year: {
      type: String,
      required: [true, "Set month for task"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

const taskAddSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `"missing required name field"`,
  }),
  timeStart: Joi.string().required().messages({
    "any.required": `"missing required timeStart field"`,
  }),
  timeEnd: Joi.string().required().messages({
    "any.required": `"missing required timeEnd field"`,
  }),
  priority: Joi.string().required().messages({
    "any.required": `"missing required priority field"`,
  }),
   month: Joi.string().required().messages({
    "any.required": `"missing required month field"`,
  }),
   year: Joi.string().required().messages({
    "any.required": `"missing required year field"`,
  }),
});

taskSchema.post("save", handleMongooseError);

const Task = model("task", taskSchema);

export {taskAddSchema, Task}
