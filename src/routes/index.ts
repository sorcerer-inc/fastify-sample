import { FastifyInstance } from "fastify";

import { UserController } from "../controllers/UserController";
import { ItemsController } from "../controllers/itemsController";
import { LoginController } from "../controllers/loginController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AuthError } from "../interfaces/my-error";

const userController = new UserController();
const itemsController = new ItemsController();
const loginController = new LoginController();

const routes = async (fastify: FastifyInstance, options: any, next: any) => {
  fastify.setErrorHandler(function (error, request, reply) {
    if(error instanceof AuthError) {
      reply.status(401).send({message: "Unauthorized"});
    }

    fastify.log.error(error.message);
    reply.status(500).send();
  });

  fastify.get("/", async (req, res) => {
    res.header("Content-Type", "application/json").code(200);
    res.send({
      message: "hello world",
    });
  });

  //fastify.post("/login", loginController.login);
  fastify.route({
    method: "POST",
    url: "/login",
    schema: {
      body: {
        type: "object",
        properties: {
          username: { type: "string"},
          password: { type: "string"}
        },
        required: ["username", "password"]
      },
      response: {
        200: {
          type: "object",
          properties: {
            sessionId: { type: "string"}
          }
        }
      }
    },
    handler: loginController.login
  })

  fastify.post("/register", loginController.register);
  fastify.post("/logout", { preHandler: [authMiddleware] }, loginController.logout);


  // fastify.get("/users", userController.getAllUsers);
  // fastify.post("/users", userController.createUser);
  // fastify.get("/users/:id", userController.getUser);
  // fastify.put("/users/:id", userController.updateUser);
  // fastify.post("/users/buy_item", userController.buyItem);

  // fastify.get("/items", itemsController.getList);
  // fastify.post("/items", itemsController.post);
  // fastify.get("/items/:id", itemsController.get);
  // fastify.put("/items/:id", itemsController.put);
  // fastify.delete("/items/:id", itemsController.delete);
};

export { routes };
