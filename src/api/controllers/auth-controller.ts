import passport from "passport";
import {
  Request,
  Response,
} from "express";
import {
  EmailService,
  User,
  UserService,
} from "src/core";
import {
  CheckEmailDto,
  ResetPasswordDto,
} from "src/api/dto";

const signin = async (req: Request, res: Response) => {
  passport.authenticate("local", (err: Error, user: any, info: any) => {
    if (err) {
      return res.status(500).json({ error: { success: false, message: err } }); // Error: email or password incorrect
    }
    if (!user) {
      return res.status(500).json({ error: { success: false, message: info.message } }); // 'Missing credentials'
    }
    return req.login(user, (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return res.status(500).json({ success: false });
      }
      // 로그인 성공
      return res.status(200).json({ success: true });
    });
  })(req, res);
};

const signout = async (req: Request, res: Response) => {
  req.session.save((err) => {
    //res.redirect('/');
  });
};

const signup = async (req: Request, res: Response) => {
  const body = req.body;
  const user = await UserService.signUp(body.email, body.password, body.nickname, body.isWriter);
  if (user != null) {
    return res.status(200).json({ success: true });
  }
  return res.status(500).json({ success: false });
};

const google = passport.authenticate("google", { scope: ["profile", "email"] });

const googleCallback = (req: Request, res: Response) => {
  passport.authenticate("google", { failureRedirect: "/login" }, (err: Error, user: User) => {
    res.redirect("/");
  })(req, res);
};

const checkEmail = async (req: Request, res: Response) => {
  const body: CheckEmailDto = req.body;
  const exists = await UserService.checkEmail(body.email);
  return res.status(200).json({
    success: true,
    data: {
      exists,
    },
  });
};

const resetPassword = async (req: Request, res: Response) => {
  const body: ResetPasswordDto = req.body;
  const user = await UserService.findOneByEmail(body.email);
  if (user == null) {
    return res.status(404).json({
      success: false,
      code: "Not found",
      message: "User does not exist or is a Google account",
    });
  }
  const password = await UserService.resetPassword(user);
  await EmailService.sendResetPasswordEmail(user.email, user.nickname, password);
  return res.status(200).json({
    success: true,
  });
};

export const AuthController = {
  signin,
  signup,
  signout,
  google,
  googleCallback,
  checkEmail,
  resetPassword,
};
