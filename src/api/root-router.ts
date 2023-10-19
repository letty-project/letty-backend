import {
  Router,
} from "express";
import {
  authRouter,
  baseRouter,
} from "./routes";
import {
  errorHandler,
} from "./middlewares";

export const rootRouter = Router();

rootRouter
  .use("/", baseRouter)
  .use("/auth", authRouter)
  .use(errorHandler);
