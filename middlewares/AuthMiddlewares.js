//+ in the name of cross
import JWT from "jsonwebtoken";
import { makeItPromisify } from "../utils/helpers.js";
import { tryCatchAbstraction } from "./TryCatchAbstraction.js";
//todo if there is any error just remove it
const verify = makeItPromisify(JWT.verify);

const AuthMiddlewares = Object.create(tryCatchAbstraction);
AuthMiddlewares.requiredAuth = async function requiredAuth(req, res, next) {
  const token = req.cookies.token;
  //todo I guess you can make tryCatch wrapper
  if (token) {
    //todo chick this function works or not
    return this.tryCatchAbstractBlock(verifyToken);

    async function verifyToken(params) {
      const tokenDecoded = await verify(token, JWT_SECRET, params);
      req.user.id = tokenDecoded.id;
      return next();
    }
    /**
   * (tokenError, tokenDecoded) => {
    if (tokenError) {
      // redirect
      return;
    }
    req.user.id = tokenDecoded.id;
    return next();
  }
    */
  }
  //todo redirect;
  return;
};

AuthMiddlewares.isUserLoggedIn = async function isUserLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    const tokenDecoded = await verify(token, JWT_SECRET);
    req.locals.userId = tokenDecoded.id;
    return next();
  } else {
    req.locals.userId = null;
    return next();
  }
};

export { AuthMiddlewares };
