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
  .get("/:id", asyncHandler(PostController.getPost))
  .post("/", asyncHandler(PostController.createPost))
