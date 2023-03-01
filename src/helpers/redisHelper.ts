import { createClient } from "redis";

// note: Node.js で Redis を使う場合、コネクションプールは必要ない
// https://zenn.dev/rik/articles/8dfe8e8139beec765933
const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT!),
  },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  await redisClient.connect();
  console.log("redis connect success");
})();

export default redisClient;
