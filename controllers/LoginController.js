//+ in the name of Cross
import { JWT } from "../source/interface/JWT.js";
import { Bcrypt } from "../source/interface/bcrypt.js";
import { UserModel } from "../models/UserModel.js";
import { AppError } from "../source/error/AppError.js";

const LoginController = {
  login: async function login(req, res, next) {
    const data = req.body;
    const filters = ["user_email", "=", `'${data.user_email}'`];
    const user = await UserModel.getUserWith(filters);
    if (!user) {
      AppError.setUp("User not found please sign up");
      throw AppError;
    }
    const check = await Bcrypt.compareBoth(data.password, user.password);
    if (!check) {
      AppError.setUp("Wrong password please try again");
      throw AppError;
    }
    const payload = { id: user.user_id };
    const token = await JWT.createToken(payload);
    JWT.createCookie(res, token);
    res.status(200).send(user);
  },
};

export { LoginController };
