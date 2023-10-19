import {
  Router,
} from "express";
import {
  asyncHandler,
} from "src/api/middlewares";
import {
  AuthController,
} from "src/api/controllers";

export const authRouter = Router();

authRouter
  .post("/signin", asyncHandler(AuthController.signin))
  .post("/signup", asyncHandler(AuthController.signup))
  .post("/signout", asyncHandler(AuthController.signout));
