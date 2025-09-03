//+ in the name of cross
import { JWT } from "../source/interface/JWT.js";
import { AppError } from "../source/error/AppError.js";

async function requiredAuth(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    const tokenDecoded = await JWT.verifyToken(token, JWT_SECRET);
    req.user.id = tokenDecoded.id;
    return next();
  }
  AppError.setUp("user is nlt authenticated");
  throw AppError;
}
export { requiredAuth };
async function isUserLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    try {
      const tokenDecoded = await verify(token, JWT_SECRET);
      req.locals.userId = tokenDecoded.id;
      return next();
    } catch (error) {
      req.locals.userId = null;
      return next();
    }
  } else {
    req.locals.userId = null;
    return next();
  }
}
const AuthMiddlewares = {
  requiredAuth,

  isUserLoggedIn,
};
export { isUserLoggedIn };

export { AuthMiddlewares };
