import crypto from "crypto";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import {
  IStrategyOptions,
  Strategy as LocalStrategy,
} from "passport-local";
import {
  IOAuth2StrategyOption,
  OAuth2Strategy,
} from "passport-google-oauth";
import {
  rootRouter,
} from "./api/root-router";
import {
  User,
} from "src/core";

export const app = express();
const sessionKey: string = process.env.SESSION_KEY!;

passport.serializeUser((user: any, done) => {
  done(null, user);
});
passport.deserializeUser((user: any, done) => {
  done(null, user);
});
const localStrategyOption: IStrategyOptions = {
  usernameField: "email",
  passwordField: "password",
  session: true,
  passReqToCallback: false,
};
passport.use("local", new LocalStrategy(localStrategyOption, async (email, password, done) => {
  const user = await User.findOne({ where: { email } });
  if (user == null) {
    return done(new Error("email or password incorrect"), false);
  }
  const salt = Buffer.from(user.salt, "base64");
  const encryptPassword = crypto.pbkdf2Sync(password, salt, 1000000, 64, "sha512");
  const currentPassword = Buffer.from(user.password, "base64");
  if (encryptPassword.equals(currentPassword)) {
    return done(null, user);
  }
  return done(new Error("email or password incorrect"), false);
}));

const googleStrageyOption: IOAuth2StrategyOption = {
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID as string,
  callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
};
passport.use("google", new OAuth2Strategy(googleStrageyOption, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ where: { googleId: profile.id } });
  if (user == null) {
    user = await User.create({ googleId: profile.id, nickname: profile.displayName, email: profile.emails?.at(-1)?.value!, isWriter: false })
  }
  return done(null, user);
}));

app
  .use(helmet())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(session({ secret: sessionKey }))
  .use(passport.initialize())
  .use(passport.session())
  .use("/api", rootRouter);
