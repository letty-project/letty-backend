import crypto from "crypto";
import {
  User,
} from "./user-entity";

const signUp = async (email: string, password: string, nickname: string, isWriter: boolean) => {
  const salt = crypto.randomBytes(64);
  const encryptPassword = crypto.pbkdf2Sync(password, salt, 1000000, 64, "sha512");
  const user = User.build({
    email,
    nickname,
    password: encryptPassword.toString("base64"),
    salt: salt.toString("base64"),
    isWriter,
  });
  await user.save();
  return user;
};

export const UserService = {
  signUp,
};
