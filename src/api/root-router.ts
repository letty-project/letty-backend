import {
  Router,
} from "express";
import {
  baseRouter,
} from "./routes";
import {
  errorHandler,
} from "./middlewares";

export const rootRouter = Router();

rootRouter
  .use("/", baseRouter)
  .use(errorHandler);
