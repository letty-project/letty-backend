import {
  Router,
} from "express";
import {
  authRouter,
  postRouter,
} from "./routes";
import {
  errorHandler,
} from "./middlewares";

export const rootRouter = Router();

rootRouter
  .use("/auth", authRouter)
  .use("/posts", postRouter)
  .use(errorHandler);
