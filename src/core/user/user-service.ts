import crypto from "crypto";
import {
  createRandomPassword,
} from "src/core/util";
import {
  User,
} from "./user-entity";

const signUp = async (email: string, password: string, nickname: string, isWriter: boolean) => {
  const { salt, encryptPassword } = UserService.encryptPassword(password);
  const user = await User.create({
    email,
    nickname,
    password: encryptPassword.toString("base64"),
    salt: salt.toString("base64"),
    isWriter,
  });
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

const resetGeneratedPassword = async (email: string) => {
  const newPassword = createRandomPassword();
  const { salt, encryptPassword } = UserService.encryptPassword(newPassword);
  await User.update({ salt: salt.toString("base64"), password: encryptPassword.toString("base64") }, { where: { email } });
  return newPassword;
};

const encryptPassword = (password: string, salt?: Buffer) => {
  if (salt == null) {
    salt = crypto.randomBytes(64);
  }
  const encryptPassword = crypto.pbkdf2Sync(password, salt, 1000000, 64, "sha512");
  return { salt, encryptPassword };
};

const findOneByEmail = (email: string) => {
  return User.findOne({ where: { email }, raw: true });
};

const findOneByGoogleId = (googleId: string) => {
  return User.findOne({ where: { googleId }, attributes: { include: ["googleId"] } });
};

const createUserByGoogleId = (googleId: string, nickname: string, email: string) => {
  return User.create({ googleId, nickname, email, isWriter: false })
};

const findOneByEmailWithAuth = (email: string) => {
  return User.findOne({ where: { email }, attributes: { include: ["password", "salt"] } });
};

export const UserService = {
  signUp,
  findAll,
  checkEmail,
  resetGeneratedPassword,
  findOneByEmail,
  findOneByGoogleId,
  createUserByGoogleId,
  findOneByEmailWithAuth,
  encryptPassword,
};
