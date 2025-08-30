//+ in the name of cross
import { JWT } from "../source/interface/JWT.js";
const AuthMiddlewares = {
  requiredAuth: async function requiredAuth(req, res, next) {
    const token = req.cookies.token;
    if (token) {
      const tokenDecoded = await JWT.verifyToken(token, JWT_SECRET);
      req.user.id = tokenDecoded.id;
      return next();
    } else; //todo throw error

    //todo throw error;
  },

  isUserLoggedIn: async function isUserLoggedIn(req, res, next) {
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
  },
};

export { AuthMiddlewares };
