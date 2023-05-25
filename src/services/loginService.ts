import bcrypt from "bcrypt";
import * as loginModel from "../models/loginModel";
import { AlreadyExistsError, AuthError } from "../interfaces/my-error";
import { redisExpiredSeconds, saultRuounds } from "../helpers/constant";
import redisClient from "../helpers/redisHelper";
import { generateSessionId } from "../helpers/session";

const isLoginUserExist = async (username: string): Promise<boolean> => {
  return loginModel.isLoginUserExist(username);
};

const checkLoginUser = async (username: string, password: string): Promise<boolean> => {
  const user = await loginModel.getLoginUser(username);
  return await bcrypt.compare(password, user.passwordHash);
};

const saveLoginUser = async (username: string, password: string): Promise<number> => {
  // is user exist?
  if (await isLoginUserExist(username)) {
    throw new AlreadyExistsError();
  }
  const passwordHash = await bcrypt.hash(password, saultRuounds);
  return loginModel.saveLoginUser(username, passwordHash);
};

const login = async (username: string, password: string) => {
  const user = await loginModel.getLoginUser(username);
  const result = await bcrypt.compare(password, user.passwordHash);

  if (result) {
    // redisにsessionを保存
    const sessionId = generateSessionId();

    const sessionData = JSON.stringify({
      uid: user.id,
      username,
    });

    await redisClient.setEx(sessionId, redisExpiredSeconds, sessionData);
    return sessionId;
  } else {
    throw new AuthError();
  }
};

const logout = async (sessionId: string): Promise<boolean> => {
  return !!(await redisClient.del(sessionId)); //if key not exist, del return 0. else return 1
};

const register = async (username: string, password: string): Promise<number> => {
  return await saveLoginUser(username, password);
};

export { login, logout, register };
