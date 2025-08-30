import { UserModel } from "../models/UserModel.js";
import { userValidator } from "../source/validation/schema/UserSchema.js";

const UserController = {
  createUser: async function createUser(req, res, next) {
    const result = await UserModel.save({ username: null });
    //there is still work
  },
};

export { UserController };
