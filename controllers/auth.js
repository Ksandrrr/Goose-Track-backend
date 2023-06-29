const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const { User } = require("../models/auth");

const ctrlWrapper = require("../utils/ctrlWrapper")

const HttpError = require("../helpers/HttpError");

const { SECRET_KEY } = process.env;

async function register(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const avatarURL = gravatar.url(email, { size: 250 });

  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashedPassword,
  });

  res.status(201).json({ name: newUser.name, email: newUser.email});
}

const updateUserInfo = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate( req.user._id, { ...req.body }, { new: true });
  res.json({
    name: updatedUser.name,
    birthday: updatedUser.birthday,
    phone: updatedUser.phone,
    skype: updatedUser.skype,
    email: updatedUser.email,
    avatarURL: updatedUser.avatarURL,
  });
}
const login = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid"); 
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid"); 
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
     await User.findByIdAndUpdate(user._id, { token })
    
    res.json({
        token,
        user: {
            email: user.email,
            name: user.name,
            birthday: user.birthday,
            phone: user.phone,
            skype: user.skype,
            avatarURL: user.avatarURL,
        }
})
    
}

const getCurrent = async(req, res)=> {
   const {email, subscription} = req.user;

    res.json({
        email,
        subscription,
    })
}

const logout = async(req, res)=> {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.status(204).json({
        message: "Logout success"
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateUserInfo: ctrlWrapper(updateUserInfo),
}