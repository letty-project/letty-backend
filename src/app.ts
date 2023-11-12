import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
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
  UserService,
} from "src/core";

export const app = express();
const sessionKey: string = process.env.SESSION_KEY!;

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});
passport.deserializeUser(async (user: Express.User, done) => {
  done(null, user);
});

const localStrategyOption: IStrategyOptions = {
  usernameField: "email",
  passwordField: "password",
  session: true,
  passReqToCallback: false,
};

// passport local 인증
passport.use("local", new LocalStrategy(localStrategyOption, async (email, password, done) => {
  // email로 회원 찾기
  const user = await UserService.findOneByEmailWithAuth(email);
  // 회원 없으면 error
  if (user == null) {
    return done(new Error("email or password incorrect"), false);
  }
  // 입력한 비밀번호 암호화해서
  const salt = Buffer.from(user.salt!, "base64");
  const { encryptPassword } = UserService.encryptPassword(password, salt);
  const currentPassword = Buffer.from(user.password!, "base64");
  if (encryptPassword.equals(currentPassword)) {
    return done(null, user.id);
  }
  // 비번 안 맞으면 error
  return done(new Error("email or password incorrect"), false);
}));

const googleStrageyOption: IOAuth2StrategyOption = {
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID as string,
  callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
};
passport.use("google", new OAuth2Strategy(googleStrageyOption, async (accessToken, refreshToken, profile, done) => {
  let user = await UserService.findOneByGoogleId(profile.id);
  if (user == null) {
    user = await UserService.createUserByGoogleId(profile.id, profile.displayName, profile.emails?.at(-1)?.value!);
  }
  return done(null, user);
}));

const swaggerFile = require("./api/swagger/swagger-output.json");

app
  .use(helmet())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(session({
    secret: sessionKey,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    rolling: true,
    resave: true,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use("/api", rootRouter)
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
