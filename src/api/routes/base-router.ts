import {
  Router,
} from "express";
import {
  asyncHandler,
} from "src/api/middlewares";
import {
  BaseController,
} from "src/api/controllers";

export const baseRouter = Router();

baseRouter.get("/", asyncHandler(BaseController.hit));
