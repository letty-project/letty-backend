import crypto from "crypto";
import {
  User,
} from "./user-entity";
import {
  createRandomPassword,
} from "src/core/util";

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

const findAll = async () => {
  const users = await User.findAll();
  return users;
};

const checkEmail = async (email: string) => {
  const exists = await User.count({ where: { email } });
  return exists > 0;
};

const resetPassword = async (email: string) => {
  const newPassword = createRandomPassword();
  await User.update({ password: newPassword }, { where: { email } });
  return newPassword;
};

const findOneByEmail = (email: string) => {
  return User.findOne({ where: { email }, raw: true });
};

export const UserService = {
  signUp,
  findAll,
  checkEmail,
  resetPassword,
  findOneByEmail,
};
