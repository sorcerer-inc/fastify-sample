import { AlreadyExistsError } from "../interfaces/my-error";
import * as playerModel from "../models/playerModel";

const isPlayerExist = async (cognito_id: string): Promise<boolean> => {
  return playerModel.isPlayerExist(cognito_id);
};

const registerGoogle = async (name: string, cognito_id: string, support_id: string): Promise<number> => {
  // is user exist?
  if (await isPlayerExist(cognito_id)) {
    throw new AlreadyExistsError();
  }

  return playerModel.registerGoogle(name, cognito_id, support_id);
};

export { isPlayerExist, registerGoogle };
