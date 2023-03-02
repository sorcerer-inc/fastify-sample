import { FastifyRequest, FastifyReply } from "fastify";
import { login, logout, register } from "../services/loginService";

export class LoginController {
  async login(req: FastifyRequest, res: FastifyReply) {
    const body = req.body as any;

    if (!body.username || !body.password) {
      res.status(400);
      res.send({ message: "Invalid body." });
      return;
    }

    try {
      const result = await login(body.username, body.password);
      res.status(200);
      res.send({ sessionId: result });
    } catch (e) {}
  }

	async logout(req: FastifyRequest, res: FastifyReply) {
    const body = req.body as any;

    if (!body.uid || !body.sessionId) {
      res.status(400);
      res.send({ message: "Invalid body." });
      return;
    }

    try {
      const result = await logout(body.sessionId);
      res.status(200);
      res.send({ result });
    } catch (e) {}
  }

  async register(req: FastifyRequest, res: FastifyReply) {
    const body = req.body as any;

    if (!body.username || !body.password) {
      res.status(400);
      res.send({ message: "Invalid body." });
      return;
    }
    try {
			console.log(body.username + ": " + body.password);
      const result = await register(body.username, body.password);
			console.log("result ", result);
      res.status(200);
      res.send({ result });
    } catch (e) {}
  }
}
