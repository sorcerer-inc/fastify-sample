import { FastifyRequest, FastifyReply } from "fastify";
import { login, logout, register } from "../services/loginService";

import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import axios from "axios";
import { registerGoogle } from "../services/playerService";

export class LoginController {
  async login(req: FastifyRequest, res: FastifyReply) {
    try {
      res.status(200);
      res.send("success");
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

    if (!body.name) {
      res.status(400);
      res.send({ message: "Invalid body." });
      return;
    }

    try {
      const cognito_id = (req as any).data.sub;
      console.log(cognito_id);
      const result = await registerGoogle(body.name, cognito_id, cognito_id);
      console.log(result);

      res.status(200);
      res.send("success");
    } catch (e) {
      console.log(e);
    }
  }
}
