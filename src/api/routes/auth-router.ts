import {
  Router,
} from "express";
import {
  asyncHandler,
  validateMiddleware,
} from "src/api/middlewares";
import {
  AuthController,
} from "src/api/controllers";
import {
  CheckEmailDto,
  ResetPasswordDto,
} from "src/api/dto";

export const authRouter = Router();

authRouter
  .post("/signin",
    // #swagger.tags = ['Auth']
    // #swagger.description = '로그인'
    asyncHandler(AuthController.signin))
  .post("/signup",
    // #swagger.tags = ['Auth']
    // #swagger.description = '회원가입'
    /* 
      #swagger.parameters['body'] = {
        in: 'body',
        description: '회원가입 데이터',
        required: true,
     }
    */
    asyncHandler(AuthController.signup))
  .post("/signout",
    // #swagger.tags = ['Auth']
    // #swagger.description = '로그아웃'
    asyncHandler(AuthController.signout))
  .post("/check-email",
    validateMiddleware(CheckEmailDto),
    asyncHandler(AuthController.checkEmail))
  .post("/reset-password",
    validateMiddleware(ResetPasswordDto),
    asyncHandler(AuthController.resetPassword))
  .get("/google",
    // #swagger.tags = ['Auth']
    // #swagger.description = '구글 로그인'
    asyncHandler(AuthController.google))
  .get("/google/callback",
    // #swagger.tags = ['Auth']
    // #swagger.description = '구글 콜백'
    asyncHandler(AuthController.googleCallback));
