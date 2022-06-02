import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/UserController";

const userController = new UserController();

const routes = async (fastify: FastifyInstance, options: any, next: any) => {
  fastify.get("/", async (req, res) => {
    res.header("Content-Type", "application/json").code(200);
    res.send({
      message: "hello world",
    });
  });

  fastify.post("/login", userController.login);

  fastify.get("/users", userController.getAllUsers);
  fastify.post("/users", userController.createUser);
  fastify.get("/users/:id", userController.getUser);
  fastify.put("/users/:id", userController.updateUser);
  fastify.post("/users/buy_item", userController.buyItem);
};

export { routes };
