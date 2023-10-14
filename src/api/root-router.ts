import {
  Router,
} from "express";
import {
  baseRouter,
} from "./routes";

export const rootRouter = Router();

rootRouter.use("/", baseRouter);
