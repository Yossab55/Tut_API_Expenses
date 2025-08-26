import { UserSchema } from "./schema/UserSchema.js";
import { MySQLManager } from "../source/database/MySQLManager.js";

const UserModel = Object.create(UserSchema);
UserModel.fields = ["user_id", "user_email", "user_name", "password"];

UserModel.save = async function save(value) {
  try {
    const validate = await this.validateAsync(value);
    MySQLManager.inti("Users", this.fields);
    const result = await MySQLManager.insert(value);
    console.log(result, "hello");
    return result;
  } catch (error) {
    console.log(error, "hello error");
  }
};
