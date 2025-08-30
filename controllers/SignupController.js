//+ in the name of Cross
import { JWT } from "../source/interface/JWT.js";
import { UserModel } from "../models/UserModel.js";
import { userValidator } from "../source/validation/schema/UserSchema.js";

const SignupController = {
  signUp: async function signUp(req, res, next) {
    const data = req.body;
    const { error } = userValidator(data);
    console.log(error, "hello");
    if (error) return next(error);
    const user = await UserModel.save(data);
    const payload = { id: user.user_id };
    const token = await JWT.createToken(payload);
    JWT.createCookie(res, token);
    res.status(200).send(user);
  },
};

export { SignupController };
