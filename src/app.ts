require('dotenv').config();
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

fastify.register(routes);

const start = async () => {
  if(process.env.NODE_ENV == null){
    await fastify.register(require('@fastify/express'));
    fastify.use(require('cors')());
  }

  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
export { fastify };
