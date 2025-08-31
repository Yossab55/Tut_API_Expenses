import { MySQLManager } from "../source/database/MySQLManager.js";
import { stringBinarySearch } from "../utils/helpers.js";
import { Bcrypt } from "../source/interface/bcrypt.js";

const UserModel = Object.create(MySQLManager);

UserModel.userFields = ["user_id", "user_email", "user_name", "password"];

UserModel.save = async function save(value) {
  const { user_id, user_email, user_name, password } = value;
  if (await this.isUniqueEmail(user_email)) {
    throw new Error("this email already exists");
  }
  value = {
    user_id,
    user_email,
    user_name,
    password: await Bcrypt.hashIt(password),
  };
  this.initial("Users", this.userFields);
  const result = await this.insert(value);
  return result;
};

UserModel.isUniqueEmail = async function isUniqueEmail(email) {
  this.initial("Users", ["user_email"], null, ["user_email"]);
  const result = await this.selectWithOrderBy();
  const foundEmail = stringBinarySearch(result, email);
  if (!foundEmail) return false;
  return true;
};

export { UserModel };
