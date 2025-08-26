import joi from "joi";

const Joi = {
  createObject(schema) {
    return joi.object(schema);
  },

  string() {
    return joi.string();
  },

  number() {
    return joi.number();
  },
  boolean() {
    return joi.boolean();
  },

  date() {
    return joi.date();
  },

  email() {
    return joi.string().email();
  },

  reference(column) {
    return joi.ref(column);
  },

  stringBetween(min = 8, max = 32) {
    return joi.string().min(min).max(max);
  },

  required() {
    return joi.required();
  },
};
export { Joi };
