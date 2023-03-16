import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import axios from "axios";
import { AuthError } from "../interfaces/my-error";
import redisClient from "../helpers/redisHelper";
import { isPlayerExist } from "../services/playerService";

const appId = "4caqlme9lrenfjb8pivoumeeec";
const userpoolUrl = "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_Tya82Nd1g";

async function fetchJwks() {
  const jwksUrl = "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_Tya82Nd1g/.well-known/jwks.json";
  const response = await axios.get(jwksUrl);
  await redisClient.set("jwks", JSON.stringify(response.data));
}

export async function jwtMiddleware(req: any, res: any, next: any) {
  if (process.env.NODE_ENV === "dev") {
    req.data = {
      sub: req.body.sub,
    };
    next();
    return;
  }

  const bearertoken = req.headers.authorization;
  const token = bearertoken?.split(" ")[1];
  const kid = jwt.decode(token!, { complete: true })?.header.kid;

  let jwksInCache = await redisClient.get("jwks");
  if (!jwksInCache) {
    //redisに存在しないと、jwksをダウンロード
    await fetchJwks();
    jwksInCache = await redisClient.get("jwks");
  }
  let jwk = JSON.parse(jwksInCache!).keys.find((v: any) => v.kid === kid);
  if (!jwk) {
    //一回目kid一致しないと、jwksをダウンロード
    await fetchJwks();
    jwksInCache = await redisClient.get("jwks");
  }
  jwk = JSON.parse(jwksInCache!).keys.find((v: any) => v.kid === kid);
  if (!jwk) {
    //二回目kid一致しないと、authエラー投げる
    next(new AuthError());
    return;
  }

  const pem = jwkToPem(jwk);

  let isJwtOk = false;
  jwt.verify(token!, pem, { algorithms: ["RS256"] }, function (err, decodedToken) {
    if (err) {
      console.log("jwt.verify error:", err);
      next(new AuthError());
      return;
    }

    decodedToken = decodedToken as jwt.JwtPayload;

    req.data = {
      sub: decodedToken.sub,
    };

    //jwt validate
    if (
      decodedToken.exp! > Math.floor(Date.now() / 1000) &&
      decodedToken.aud === appId &&
      decodedToken.iss === userpoolUrl
    ) {
      isJwtOk = true;
    }
  });

  //db check
  if (isJwtOk) {
    if ((await isPlayerExist(req.data.sub)) || req.routerPath === "/register") {
      next();
      return;
    }
  }

  next(new AuthError());
}
