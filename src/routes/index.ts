import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/userController";
import { ItemsController } from "../controllers/itemsController";
import { LoginController } from "../controllers/loginController";
import { sessionMiddleware } from "../middlewares/sessionMiddleware";
import { AuthError } from "../interfaces/my-error";
import redisClient from "../helpers/redisHelper";
import { jwtMiddleware } from "../middlewares/jwtMiddleware";

const userController = new UserController();
const itemsController = new ItemsController();
const loginController = new LoginController();

const routes = async (fastify: FastifyInstance, options: any, next: any) => {
  fastify.setErrorHandler(function (error, request, reply) {
    if (error instanceof AuthError) {
      reply.status(401).send({ message: "Unauthorized" });
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

  fastify.get("/plugin-test", async (req, res) => {
    try {
      const [rows] = await (fastify as any).mysql.query("SELECT * FROM `login`");
      res.send({
        message: rows,
      });
    } catch (error) {
      console.log(error);
    }
  });

  fastify.post("/login", { preHandler: [jwtMiddleware] }, loginController.login);
  // fastify.route({
  //   method: "POST",
  //   url: "/login",
  //   schema: {
  //     body: {
  //       type: "object",
  //       properties: {
  //         username: { type: "string"},
  //         password: { type: "string"}
  //       },
  //       required: ["username", "password"]
  //     },
  //     response: {
  //       200: {
  //         type: "object",
  //         properties: {
  //           sessionId: { type: "string"}
  //         }
  //       }
  //     }
  //   },
  //   handler: loginController.login
  // })
  fastify.get("/redis", async (req, res) => {
    res.header("Content-Type", "application/json").code(200);
    await redisClient.setEx("key", 10, "value2");
    const value = await redisClient.get("key");
    res.send({
      message: value,
    });
  });

  fastify.post("/register", { preHandler: [jwtMiddleware] }, loginController.register);
  fastify.post("/logout", { preHandler: [sessionMiddleware] }, loginController.logout);

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
