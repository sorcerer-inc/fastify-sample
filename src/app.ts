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

// fastify.register(require("@fastify/swagger"), {
//   routePrefix: "/doc",
//   openapi: {
//     info: {
//       title: "Test swagger - openapi",
//       description: "testing the fastify swagger api",
//       version: "0.1.0",
//     },
//     servers: [
//       {
//         url: "http://localhost",
//       },
//     ],
//     components: {
//       securitySchemes: {
//         apiKey: {
//           type: "apiKey",
//           name: "apiKey",
//           in: "header",
//         },
//       },
//     },
//   },
//   hideUntagged: true,
//   exposeRoute: true,
// });

// set error handler

fastify.register(routes);
console.log(process.env.NODE_ENV);

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
export { fastify };
