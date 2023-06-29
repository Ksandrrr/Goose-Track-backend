const express = require("express");

const controllersReviews = require("../../controllers/reviews");

const authenticate = require("../../middlewares/authenticate")

const validateBody = require("../../utils/validateBody")

const isValideId = require("../../middlewares/isValideId")

const schemas = require("../../models/reviews");

const router = express.Router();

  
router.get("/", controllersReviews.listReviews);

router.get("/own", authenticate, controllersReviews.myReviews);
 
router.post("/own", authenticate, validateBody(schemas.reviewsAddSchema), controllersReviews.addReviews);

router.patch("/own/:id", authenticate, controllersReviews.updateReviewsById);

router.delete("/own/:id", authenticate, isValideId, controllersReviews.removeReviews);

module.exports = router; 