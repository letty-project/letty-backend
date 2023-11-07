import crypto from "crypto";
import {
  User,
} from "./user-entity";

/*
 * salt = 해시함수 돌리기 전에 원문에 덧붙일 임의의 문자열
 * crypto 함수를 써서 암호화한 비밀번호를 base64로 또 암호화해서(?) User 객체 생성 (build를 생성으로 이해함)
 * 만든 user save()해서 DB 저장 후 해당 객체 return
 */
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
}

export const UserService = {
  signUp,
  findAll,
};
