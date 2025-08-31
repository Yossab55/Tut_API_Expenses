import { MySQLManager } from "../source/database/MySQLManager.js";
import { stringBinarySearch } from "../utils/helpers.js";
import { Bcrypt } from "../source/interface/bcrypt.js";

const UserModel = Object.create(MySQLManager);

UserModel.userFields = ["user_email", "user_name", "password"];

UserModel.save = async function save(value) {
  const { user_email, user_name, password } = value;
  if (await this.isUniqueEmail(user_email)) {
    //todo create custom error
    throw new Error("this email already exists");
  }
  value = {
    user_email,
    user_name,
    password: await Bcrypt.hashIt(password),
  };
  this.initial("Users", this.userFields);
  const result = await this.insert(value);
  return await UserModel.getUserWith(["user_email", "=", `'${user_email}'`]);
};

UserModel.isUniqueEmail = async function isUniqueEmail(email) {
  this.initial("Users", ["user_email"], null, ["user_email"]);
  const result = await this.selectWithOrderBy();
  const foundEmail = stringBinarySearch(result, email);
  if (!foundEmail) return false;
  return true;
};

UserModel.getUser = async function getUser(id) {
  const user = await this.getOneUser(id);
  return user;
};

UserModel.getUserWith = async function getUserWith(filters) {
  if (!filters) throw new Error(" you need filters to use this function");
  this.initial("Users", ["user_id"].concat(this.userFields), filters);
  const [rows] = await this.select();
  return rows;
};

export { UserModel };
