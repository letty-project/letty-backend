import {
  Router,
} from "express";
import {
  asyncHandler,
} from "src/api/middlewares";
import {
  PostController,
} from "src/api/controllers";

export const postRouter = Router();

postRouter
  .get("/", asyncHandler(PostController.getPosts))
  .post("/", asyncHandler(PostController.createPost))
