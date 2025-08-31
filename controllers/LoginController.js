//+ in the name of Cross
import { JWT } from "../source/interface/JWT.js";
import { Bcrypt } from "../source/interface/bcrypt.js";
import { UserModel } from "../models/UserModel.js";

const LoginController = {
  login: async function login(req, res, next) {
    const data = req.body;
    const filters = ["user_email", "=", `'${data.user_email}'`];
    const user = await UserModel.getUserWith(filters);
    if (!user) throw new Error("user not found sign up");
    const check = await Bcrypt.compareBoth(data.password, user.password);
    if (!check) throw new Error("your password is wrong");
    const payload = { id: user.user_id };
    const token = await JWT.createToken(payload);
    JWT.createCookie(res, token);
    res.status(200).send(user);
  },
};

export { LoginController };
