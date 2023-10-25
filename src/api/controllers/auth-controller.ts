import passport from "passport";
import {
  NextFunction,
  Request,
  Response,
} from "express";
import {
  UserService,
} from "src/core";

const signin = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: Error, user: any, info: any) => {
    console.log(user);
    res.status(200).json({ data: { success: true } })
  })(req, res);
};

const signout = async (req: Request, res: Response, next: NextFunction) => {
  // req.logout();
  // req.sess
};

/*
 * 회원가입 함수 호출되면 service단의 signUp 함수로 받은 데이터 넘겨줌
 * service단에서 DB 들어간 user 정보 리턴 받으면 200
 */
const signup = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const user = await UserService.signUp(body.email, body.password, body.nickname, body.isWriter);
  if (user != null) {
    return res.status(200).json({ data: { success: true } });
  }
  return res.status(500).json({ error: { success: false } });
};

export const AuthController = {
  signin,
  signup,
  signout,
};
