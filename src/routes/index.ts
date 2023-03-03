import { FastifyInstance, FastifySchema } from "fastify";
import { Static, Type } from "@sinclair/typebox";

import { UserController } from "../controllers/UserController";
import { ItemsController } from "../controllers/itemsController";
import redisClient from "../helpers/redisHelper";

const userController = new UserController();
const itemsController = new ItemsController();

const routes = async (fastify: FastifyInstance, options: any, next: any) => {
  fastify.setErrorHandler(function (error, request, reply) {
    fastify.log.error(error.message);
    reply.status(500).send();
  });

  fastify.get("/", async (req, res) => {
    res.header("Content-Type", "application/json").code(200);
    res.send({
      message: "hello world",
    });
  });

  fastify.get("/redis", async (req, res) => {
    res.header("Content-Type", "application/json").code(200);
    await redisClient.setEx("key", 10, "value2");
    const value = await redisClient.get("key");
    res.send({
      message: value,
    });
  });

  // const loginSchema: FastifySchema = {
  //   description: "Get posts",
  // };

  fastify.post("/login", userController.login);

  fastify.get("/users", userController.getAllUsers);
  fastify.post("/users", userController.createUser);
  fastify.get("/users/:id", userController.getUser);
  fastify.put("/users/:id", userController.updateUser);
  fastify.post("/users/buy_item", userController.buyItem);

  fastify.get("/items", itemsController.getList);
  fastify.post("/items", itemsController.post);
  fastify.get("/items/:id", itemsController.get);
  fastify.put("/items/:id", itemsController.put);
  fastify.delete("/items/:id", itemsController.delete);
};

export { routes };
