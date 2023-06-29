import  express from 'express'

import controllersReviews from "../../controllers/reviews.js"

import authenticate from "../../middlewares/authenticate.js"

import validateBody from "../../utils/validateBody.js"

import isValideId from "../../middlewares/isValideId.js"

import {reviewsAddSchema} from "../../models/reviews.js";

const router = express.Router();

  
router.get("/", controllersReviews.listReviews);

router.get("/own", authenticate, controllersReviews.myReviews);
 
router.post("/own", authenticate, validateBody(reviewsAddSchema), controllersReviews.addReviews);

router.patch("/own/:id", authenticate, controllersReviews.updateReviewsById);

router.delete("/own/:id", authenticate, isValideId, controllersReviews.removeReviews);

export default router; 