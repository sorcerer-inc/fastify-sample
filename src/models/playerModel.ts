import { OkPacket } from "mysql2";
import { db_pool } from "../helpers/DBHelper";

const isPlayerExist = async (cognito_id: string) => {
  const [rows] = await db_pool.query("SELECT * FROM `player` WHERE `cognito_id` = ?", cognito_id);
  //console.log("playerModel::isPlayerExist ", rows);
  if ((rows as any)[0]) return true;
  else return false;
};

const registerGoogle = async (name: string, cognito_id: string, support_id: string) => {
  const [rows] = await db_pool.query("INSERT INTO `player` (`name`, `cognito_id`, `support_id`) VALUES (?,?,?)", [
    name,
    cognito_id,
    support_id,
  ]);
  //console.log("playerModel::registerGoogle ", rows);
  return (rows as OkPacket).insertId;
};

export { isPlayerExist, registerGoogle };
