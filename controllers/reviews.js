import  HttpError from"../helpers/HttpError.js"
import ctrlWrapper from "../utils/ctrlWrapper.js"
import {Reviews} from "../models/reviews.js"


const listReviews = async (req, res) => {
  const result = await Reviews.find({});
  if (result.length === 0) {
    throw HttpError(404, `Not found`);
  } else {
    res.status(200).json(result);
  }
};

const myReviews = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Reviews.find({ owner });
  if (result.length === 0) {
    throw HttpError(404, `Not found`);
  } else {
    res.status(200).json(result);
  }
};


const removeReviews = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

    const reviews = await Reviews.findById(id);
    if (!reviews) {
      return res.status(404).json({ message: `Review not found` });
    }
    if (!reviews.owner.equals(owner)) {
      throw HttpError(404, `This Review does not belong to you`);
    }
    await Reviews.findByIdAndDelete(id);
   res.json({ message: "Review deleted" });
  

}; 

const addReviews = async (req, res) => {
  const { _id: owner, name, avatarURL } = req.user;

  const result = await Reviews.create({ ...req.body ,name: name, avatarURL: avatarURL, owner  });
  res.status(201).json(result);
  
};


const updateReviewsById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Reviews.findById(id);
  if (!result) {
    throw HttpError(404, `Review Not found`);
  }
   if (!result.owner.equals(owner)) {
      throw HttpError(404, `This Review does not belong to you`);
  }
  await Reviews.findByIdAndUpdate(id, req.body, { new: true })
  res.json(result);  
};

export default {
    listReviews: ctrlWrapper(listReviews),
    myReviews: ctrlWrapper(myReviews),
  removeReviews: ctrlWrapper(removeReviews),
  addReviews: ctrlWrapper(addReviews),
  updateReviewsById: ctrlWrapper(updateReviewsById),
};
