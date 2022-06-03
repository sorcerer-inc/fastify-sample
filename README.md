# fastify-sample

# install

```bash
npm i fastify
npm i -D @types/node
npm i -D typescript tsc-watch
npm i -D jest ts-jest @types/jest
npm i -D cross-env
```

```bash
npm i mysql2
```

## logger の使い方

req と res ある場合

```ts
async login(req: FastifyRequest, res: FastifyReply) {
    req.log.info("info msg");
    res.log.debug("debug msg");
}
```

一般的場合

```ts
import { fastify } from "../app";

fastify.log.info("info msg");
fastify.log.debug("debug msg");
```
