import { MySQLManager } from "../source/database/MySQLManager.js";

const UserModel = Object.create(MySQLManager);
UserModel.fields = ["user_id", "user_email", "user_name", "password"];

UserModel.save = async function save() {
  try {
    this.inti("Users", this.fields);
    const result = await this.insert(value);
    console.log(result, "hello");
    return result;
  } catch (error) {
    console.log(error, "hello error");
  }
};
