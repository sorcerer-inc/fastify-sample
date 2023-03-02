import { OkPacket } from "mysql2";
import { db_pool } from "../helpers/DBHelper";
import { Login } from "../interfaces/login";
import { NotFoundError } from "../interfaces/my-error";

const isLoginUserExist = async (username: string) => {
  const [rows] = await db_pool.query("SELECT * FROM `login` WHERE `username` = ?", username);
	console.log("loginModel::isLoginUserExist ", rows);
  if ((rows as any)[0]) return true;
  else return false;
};

const getLoginUser = async (username: string): Promise<Login> => {
  //fetch data from db
  const [rows] = await db_pool.query("SELECT * FROM `login` WHERE `username` = ?", username);

  if ((rows as any)[0]) return (rows as any)[0];
  else throw new NotFoundError();
};

const saveLoginUser = async (username: string, passwordHash: string): Promise<number> => {
  const [rows] = await db_pool.query("INSERT INTO `login` (`username`, `passwordHash`) VALUES (?,?)", [
    username,
    passwordHash,
  ]);
	console.log("loginModel::saveLoginUser ", rows);
  return (rows as OkPacket).insertId;
};

export { isLoginUserExist, getLoginUser, saveLoginUser };
