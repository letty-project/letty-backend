import express from "express";
import {
  rootRouter,
} from "./api/root-router";

export const app = express();

app
  .use(rootRouter);
