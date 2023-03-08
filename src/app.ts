require("dotenv").config();
import Fastify, { FastifyInstance } from "fastify";
import { routes } from "./routes";

const fastify: FastifyInstance = Fastify({
  logger: {
    level: "debug",
    file: "log.log",
    // prettyPrint: {
    //   translateTime: "SYS:standard",
    //   ignore: "pid,hostname",
    //   levelFirst: true,
    // }, //need npm i pino-pretty
  },
});

fastify.register(require("./plugins/mysqlPlugin"));

fastify.register(require("@fastify/cors"));

fastify.register(routes);

const start = async () => {
  try {
    fastify.listen({ port: 3000 }, (err, address) => {
      if (err) {
        console.log(err);
      } else {
        console.log("fastify listening on " + address);
      }
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
export { fastify };
