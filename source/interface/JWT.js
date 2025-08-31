import jwt from "jsonwebtoken";
import { env, makeItPromisify } from "../../utils/helpers.js";

const JWT = Object.create(jwt);
const sign = makeItPromisify(jwt.sign);
const verify = makeItPromisify(jwt.verify);
const decode = makeItPromisify(jwt.decode);
const options = {
  expiresIn: env("EXPIRES_IN"),
};

const cookieOptions = {
  httpOnly: true,
  maxAge: env("EXPIRES_IN"),
};

JWT.createToken = async function createToken(payload) {
  return await sign(payload, env("JWT_SECRET"), options);
};
JWT.verifyToken = async function verifyToken(token, secret, params) {
  return await verify(token, secret, params);
};
JWT.decodeToken = async function decodeToken(token) {
  return await decode(token);
};
JWT.createCookie = function createCookie(res, content) {
  res.cookie("token", content, cookieOptions);
};
export { JWT };
