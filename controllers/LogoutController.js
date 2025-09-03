import { deleteCookie } from "../source/interface/Cookies.js";
import { GOOD_RESPONSE } from "../utils/constants/ResponseCode.js";
const LogoutController = {
  logout: function logout(req, res) {
    deleteCookie(res);
    res.status(GOOD_RESPONSE).send("user logged out");
  },
};

export { LogoutController };
