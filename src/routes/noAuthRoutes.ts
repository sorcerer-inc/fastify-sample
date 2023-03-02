import { FastifyInstance } from "fastify";
import { LoginController } from "../controllers/loginController";

const loginController = new LoginController();

const noAuthRoutes = async (fastify: FastifyInstance, options: any, next: any) => {
  fastify.setErrorHandler(function (error, request, reply) {
    fastify.log.error(error.message);
    reply.status(500).send();
  });


};

export default noAuthRoutes;
