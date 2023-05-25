import { FastifyPluginCallback } from "fastify";
import { db_pool } from "../helpers/DBHelper";
const fp = require("fastify-plugin");

const pluginCallback: FastifyPluginCallback = (fastify, options, done) => {
  fastify.decorate("mysql", db_pool);

  done();
};

module.exports = fp(pluginCallback, {
  name: "mysqlPlugin",
});
