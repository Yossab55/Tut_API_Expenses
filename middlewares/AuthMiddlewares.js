import JWT from "jsonwebtoken";
import { makeItPromisify } from "../utils/helpers.js";
// if there is any error just remove it
const verify = makeItPromisify(JWT.verify);

const requiredAuth = async function (req, res, next) {
  const token = req.cookies.token;
  //I guess you can make try catch wrapper
  if (token) {
    const tokenDecoded = await verify(token, JWT_SECRET);
    req.user.id = tokenDecoded.id;
    return next();
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
  //redirect;
  return;
};
