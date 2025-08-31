//+ in the name of Cross
import { JWT } from "../source/interface/JWT.js";
import { UserModel } from "../models/UserModel.js";
import { userValidator } from "../source/validation/schema/UserSchema.js";

const SignupController = {
  signup: async function signup(req, res, next) {
    const data = req.body;
    const { error } = userValidator(data);
    if (error) throw error;
    const user = await UserModel.save(data);
    const payload = { id: user.user_id };
    const token = await JWT.createToken(payload);
    JWT.createCookie(res, token);
    res.status(200).send(user);
  },
};

export { SignupController };
