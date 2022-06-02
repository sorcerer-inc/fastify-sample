import { FastifyRequest, FastifyReply } from "fastify";

import {
  getAllUsersSrv,
  createUserSrv,
  getUserSrv,
  updateUserSrv,
  loginSrv,
  buyItemSrv,
  useItemSrv,
} from "../services/UserService";

import {
  DBError,
  NotFoundError,
  AuthError,
  NotEnoughError,
  LimitExceededError,
} from "../interfaces/my-error";

// const log = require("log4js").getLogger("index");

export class UserController {
  async getAllUsers(req: FastifyRequest, res: FastifyReply) {
    try {
      const result = await getAllUsersSrv();

      res.status(200);
      res.send(result);
    } catch (e) {}
  }

  async createUser(req: FastifyRequest, res: FastifyReply) {
    const body = req.body as any;

    if (!body.name || !body.password || !body.money || !body.hp) {
      res.status(400);
      res.send({ message: "Invalid parameters or body." });
      return;
    }

    try {
      const result = await createUserSrv(body);
      res.status(200);
      res.send({ id: result });
    } catch (e) {}
  }

  async getUser(req: FastifyRequest, res: FastifyReply) {
    const params = req.params as any;

    if (!params.id || parseInt(params.id) == undefined) {
      res.status(400);
      res.send({ message: "Invalid parameters or body." });
      return;
    }

    try {
      const result = await getUserSrv(parseInt(params.id));

      res.status(200);
      res.send(result);
    } catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404);
        res.send();
      } else {
      }
    }
  }

  async updateUser(req: FastifyRequest, res: FastifyReply) {
    const params = req.params as any;
    const body = req.body as any;

    if (!params.id || !body.name || !body.password || !body.money || !body.hp) {
      res.status(400);
      res.send({ message: "Invalid parameters or body." });
      return;
    }

    try {
      const id = parseInt(params.id);
      const name = body.name;
      const password = body.password;
      const money = parseInt(body.money);
      const hp = parseInt(body.hp);

      const result = await updateUserSrv({ id, name, password, money, hp });
      if (result) {
        res.status(200);
        res.send();
      }
    } catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404);
        res.send();
      } else {
      }
    }
  }

  async login(req: FastifyRequest, res: FastifyReply) {
    const params = req.params as any;
    const body = req.body as any;

    if (!body.id || !body.password) {
      res.status(400);
      res.send({ message: "Invalid parameters or body." });
      return;
    }

    try {
      const id = parseInt(body.id);
      const password = body.password;
      const result = await loginSrv({ id, password });
      console.log("login result: " + result);
      if (result) {
        res.code(200);
        res.send();
      }
    } catch (e) {
      if (e instanceof AuthError) {
        res.status(401);
        res.send();
      } else {
      }
    }
  }

  async buyItem(req: FastifyRequest, res: FastifyReply) {
    const params = req.params as any;
    const body = req.body as any;

    if (!body.id || !body.item_id || !body.num) {
      res.status(400);
      res.send({ message: "Invalid parameters or body." });
      return;
    }

    try {
      const id = parseInt(body.id);
      const item_id = parseInt(body.item_id);
      const num = parseInt(body.num);
      const result = await buyItemSrv({ id, item_id, num });
      console.log(result);
      res.status(200);
      res.send();
    } catch (e) {
      if (e instanceof NotEnoughError) {
        res.status(403);
        res.send();
      } else if (e instanceof NotFoundError) {
        res.status(404);
        res.send();
      } else if (e instanceof LimitExceededError) {
        res.status(405);
        res.send();
      } else {
      }
    }
  }

  async useItem(req: FastifyRequest, res: FastifyReply) {
    const params = req.params as any;
    const body = req.body as any;

    if (!body.id || !body.item_id || !body.num) {
      res.status(400);
      res.send({ message: "Invalid parameters or body." });
      return;
    }

    try {
      const id = parseInt(body.id);
      const item_id = parseInt(body.item_id);
      const num = parseInt(body.num);
      const result = await useItemSrv({ id, item_id, num });
      res.status(200);
      res.send();
    } catch (e) {
      if (e instanceof NotEnoughError) {
        res.status(403);
        res.send();
      } else if (e instanceof NotFoundError) {
        res.status(404);
        res.send();
      } else {
      }
    }
  }

  /**
   * next(err)を投げるとapp.tsでエラーハンドリングできます。
   * https://expressjs.com/ja/guide/error-handling.html
   */
  // errorResponse(req: Request, res: Response, next: NextFunction) {
  //   next(new Error("エラー発生"));
  // }
}
