import { UserModel } from "../models/UserModel.js";
import { userUpdateValidator } from "../source/validation/schema/UserSchema.js";
import { JWT } from "../source/interface/JWT.js";

const UserController = {
  deleteUser: async function deleteUser(req, res, next) {
    const token = req.cookies.token;
    const decodedToken = await JWT.decodeToken(token);
    const id = decodedToken.id;
    const result = await UserModel.deleteUser(id);
    res.send(200).send(result);
  },
  updateUser: async function updateUser(req, res, next) {
    const data = req.body;
    const { error } = userUpdateValidator(data);
    if (error) throw error;
    const decodedToken = await JWT.decodeToken(token);
    const id = decodedToken.id;
    data.id = id;
    const result = await this.updateUser(data);
    res.send(200).send(result);
  },
};

export { UserController };
