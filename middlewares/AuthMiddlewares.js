import JWT from "jsonwebtoken";

const requiredAuth = async function (req, res, next) {
  const token = req.cookies.token;
  //Todo you can promisfy JWT.verify
  //Todo don't forget to setup JWT_SECRET
  if (token) {
    await JWT.verify(token, JWT_SECRET, (tokenError, tokenDecoded) => {
      if (tokenError) {
        // redirect
        return;
      }
      req.user.id = tokenDecoded.id;
      return next();
    });
  }
  //redirect;
  return;
};
