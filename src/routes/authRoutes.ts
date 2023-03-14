import { FastifyInstance } from "fastify";
import { LoginController } from "../controllers/loginController";
import { authMiddleware } from "../middlewares/authMiddleware";

const loginController = new LoginController();

const authRoutes = async (fastify: FastifyInstance, options: any, next: any) => {
  fastify.setErrorHandler(function (error, request, reply) {
    fastify.log.error(error.message);
    reply.status(500).send();
  });


};

export default authRoutes;