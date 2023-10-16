import express from "express";
import helmet from "helmet";
import {
  rootRouter,
} from "./api/root-router";

export const app = express();

app
  .use(helmet())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(rootRouter);
