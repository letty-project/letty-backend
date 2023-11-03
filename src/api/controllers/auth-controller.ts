import passport from "passport";
import {
  Request,
  Response,
} from "express";
import {
  User,
  UserService,
} from "src/core";

const signin = async (req: Request, res: Response) => {
  passport.authenticate("local", (err: Error, user: any, info: any) => {
    console.log(user);
    res.status(200).json({ data: { success: true } })
  })(req, res);
};

const signout = async (req: Request, res: Response) => {
  // req.logout();
  // req.sess
};

const signup = async (req: Request, res: Response) => {
  const body = req.body;
  const user = await UserService.signUp(body.email, body.password, body.nickname, body.isWriter);
  if (user != null) {
    return res.status(200).json({ data: { success: true } });
  }
  return res.status(500).json({ error: { success: false } });
};

const google = passport.authenticate("google", { scope: ["profile", "email"] });

const googleCallback = (req: Request, res: Response) => {
  passport.authenticate("google", { failureRedirect: "/login" }, (err: Error, user: User) => {
    res.redirect("/")
  })(req, res);
};

export const AuthController = {
  signin,
  signup,
  signout,
  google,
  googleCallback,
};
