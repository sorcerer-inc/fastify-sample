import { fastify } from "../app";

export function check (req: any, res: any, next: any) {
    if(req.url === "/items"){
        fastify.log.info("match");
    }
    next();
}
