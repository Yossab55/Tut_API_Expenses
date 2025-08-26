import { Joi } from "../../source/interface/joi.js";

const UserSchema = Joi.createObject({
  user_id: Joi.number().required(),
  user_email: Joi.email().required(),
  user_name: Joi.stringBetween(2, 70).required(),
  password: Joi.string(),
});

export { UserSchema };
