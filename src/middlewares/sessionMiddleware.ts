import redisClient from "../helpers/redisHelper";
import { AuthError } from "../interfaces/my-error";

export async function sessionMiddleware(req: any, res: any, next: any) {
  const body = req.body as any;

  if (body.sessionId && body.uid) {
    const sessionData = await redisClient.get(body.sessionId);

    if (sessionData) {
      const data = JSON.parse(sessionData);
      if (data.uid === body.uid) {
        next();
        return;
      }
    }
  }

  next(new AuthError());
}
