import  express from 'express'

import authController from"../../controllers/auth.js"

import authenticate from "../../middlewares/authenticate.js"

import validateBody from "../../utils/validateBody.js"

import {schemas} from "../../models/auth.js";

const router = express.Router();

  
router.post("/register", validateBody(schemas.userRegisterSchema), authController.register);

router.patch("/me", authenticate, validateBody(schemas.userUpdateSchema), authController.updateUserInfo);

router.post("/login", validateBody(schemas.userLoginSchema), authController.login);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

export default router;