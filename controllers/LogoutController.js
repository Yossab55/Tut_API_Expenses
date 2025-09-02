import { deleteCookie } from "../source/interface/Cookies";
const LogoutController = {
  logout: function logout(req, res) {
    deleteCookie(res);
    res.status(200).send("user logged out");
  },
};

export { LogoutController };
