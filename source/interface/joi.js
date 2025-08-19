import Joi from "joi";

const Validator = {
  createObject(schema) {
    return Joi.object(schema);
  },

  string() {
    return Joi.string();
  },

  number() {
    return Joi.number();
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

  required() {
    return Joi.required();
  },
};
export { Validator };
