import passport from "passport";
import {
  NextFunction,
  Request,
  Response,
} from "express";
import {
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

const googleCallback = passport.authenticate("google", { failureRedirect: "/login" }, (req: Request, res: Response) => {
  console.log(req, res);
  res.redirect("/")
});

export const AuthController = {
  signin,
  signup,
  signout,
  google,
  googleCallback,
};
