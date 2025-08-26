import Joi from "joi";

const JoiWrapper = {
  createObject(schema) {
    return Joi.object(schema);
  },

  string() {
    return Joi.string();
  },

  number() {
    return Joi.number();
  },
  boolean() {
    return Joi.boolean();
  },

  date() {
    return Joi.date();
  },

  email() {
    return Joi.string().email();
  },

  reference(column) {
    return Joi.ref(column);
  },

  stringBetween(min = 8, max = 32) {
    return Joi.string().min(min).max(max);
  },

  required() {
    return Joi.required();
  },
};
export { JoiWrapper };
