const {Schema, model} = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

// const userSchema = new Schema({
//   password: {
//     type: String,
//     required: [true, 'Set password for user'],
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//   },
//   token: String,
//   verify: {
//     type: Boolean,
//     default: false,
//   },
//   verificationToken: {
//     type: String,
//     required: [true, 'Verify token is required'],
//   },

// },  { versionKey: false, timestamps: true });
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      default: null,
    },
    birthday: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    skype: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    avatarURL: {
      type: String,
      required: true,
    },
     token: String
  },
  { versionKey: false, timestamps: false }
);

userSchema.post("save", handleMongooseError);

const userRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

const userUpdateSchema = Joi.object({
    name: Joi.string(),
    birthday: Joi.string(),
    phone: Joi.string(),
    skype: Joi.string(),
    email: Joi.string(),
    avatarURL: Joi.string(),
});
const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

const schemas = {
  userRegisterSchema,
  userUpdateSchema,
  userLoginSchema,
    
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}

