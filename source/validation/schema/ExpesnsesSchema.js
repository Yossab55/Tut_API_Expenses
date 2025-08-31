import { Joi } from "../../interface/joi.js";
import { getCurrentDate } from "../../../utils/helpers.js";

const ExpenseSchema = Joi.createObject({
  expense_category: Joi.between(2, 70).required(),
  expense_amount: Joi.between(5, 70).required(),
  expense_date: Joi.date().default(getCurrentDate()),
  user_id: Joi.number().required(),
});

const ExpenseUpdateSchema = Joi.createObject({
  expense_category: Joi.between(2, 70),
  expense_amount: Joi.between(5, 70),
  expense_date: Joi.number(),
  user_id: Joi.number(),
}).min(1);

const expenseValidator = Joi.createValidator(ExpenseSchema);

const expenseUpdateValidator = Joi.createValidator(ExpenseUpdateSchema);

export { expenseValidator, expenseUpdateValidator };
