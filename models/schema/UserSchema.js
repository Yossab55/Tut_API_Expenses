import { JoiWrapper } from "../../source/interface/joi.js";

const UserSchema = JoiWrapper.createObject({
  user_id: JoiWrapper.number().required(),
  user_email: JoiWrapper.email().required(),
  user_name: JoiWrapper.stringBetween(2, 70).required(),
  password: JoiWrapper.string(),
});

export { UserSchema };
