import { Joi } from "../../interface/joi.js";

const UserSchema = Joi.createObject({
  user_email: Joi.email().required(),
  user_name: Joi.between(2, 70).required(),
  password: Joi.string(),
});
const userValidator = Joi.createValidator(UserSchema);
export { userValidator };
