import {
  Router,
} from "express";
import {
  asyncHandler,
} from "src/api/middlewares";
import {
  AuthController,
} from "src/api/controllers";

export const authRouter = Router();

/*
 * 라우터로 요청이 들어오면 컨트롤러의 함수로 연결
 * (asyncHandler 왜 쓰는지 모르겠음)
 */
authRouter
  .post("/signin", asyncHandler(AuthController.signin))
  .post("/signup", asyncHandler(AuthController.signup))
  .post("/signout", asyncHandler(AuthController.signout));
