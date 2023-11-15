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
    /* 
      #swagger.tags = ['Auth']
      #swagger.summary = '로그인'
      #swagger.description = '이메일, 비밀번호 입력하여 로그인'
      #swagger.parameters['body'] = {
        in: 'body',
        name: 'body',
        description: '회원가입 데이터',
        required: true,
     }
    */
    asyncHandler(AuthController.signin))
  .post("/signup", 
    /* 
      #swagger.tags = ['Auth']
      #swagger.summary = '회원가입'
      #swagger.description = '이메일, 비밀번호, 닉네임, 작가여부 입력하여 회원가입'
      #swagger.parameters = [
        {
          name: 'email',
          in: 'formData',
          description: '이메일',
          required: true,
          type: 'string'
        },
        {
          name: 'password',
          in: 'formData',
          description: '비밀번호',
          required: true,
          type: 'string'
        },
        {
          name: 'nickname',
          in: 'formData',
          description: '닉네임',
          required: true,
          type: 'string'
        },
        {
          name: 'isWriter',
          in: 'formData',
          description: '작가여부',
          required: true,
          type: 'boolean'
        }
      ]
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
