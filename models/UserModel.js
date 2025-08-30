import { MySQLManager } from "../source/database/MySQLManager.js";

const UserModel = Object.create(MySQLManager);
UserModel.fields = ["user_id", "user_email", "user_name", "password"];

UserModel.save = async function save(value) {
  this.inti("Users", this.fields);
  const result = await this.insert(value);
  return result;
};

export { UserModel };
