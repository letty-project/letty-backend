import {
  Router,
} from "express";
import {
  authRouter,
} from "./routes";
import {
  errorHandler,
} from "./middlewares";

export const rootRouter = Router();

rootRouter
  .use("/auth", authRouter)
  .use(errorHandler);
