import { ExpenseModel } from "../models/ExpenseModel";
import {
  expenseValidator,
  expenseUpdateValidator,
} from "../source/validation/schema/ExpenseSchema.js";

const ExpenseController = {
  getExpenseId: function getExpenseId(req, res, next) {
    const expense_id = req.params.id;
    req.expense.expense_id = expense_id;
    next();
  },
  getAllTodayExpense: async function getAllTodayExpense(req, res, next) {
    const userId = req.user.id;
    const [rows] = await ExpenseModel.getTodayExpenses(userId);
    res.status(200).send(rows);
  },
  getLastPeriodExpense: async function getLastPeriodExpense(req, res) {
    const { last_period } = req.body;
    const userId = req.user.id;
    const [rows] = await ExpenseModel.getLastPeriodExpenses(
      userId,
      last_period
    );
    res.status(200).send(rows);
  },
  getLastPeriodExpenseGroupByCategory:
    async function getLastPeriodExpenseGroupByCategory(req, res) {
      const { last_period } = req.body;
      const userId = req.user.id;
      const [rows] = await ExpenseModel.getLastPeriodExpensesGroupByCategories(
        userId,
        last_period
      );
      res.status(200).send(rows);
    },
  getTotalTodayAmount: async function getTotalTodayAmount(req, res) {
    const userId = req.user.id;
    const [rows] = await ExpenseModel.getTodayTotalAmountGroupByCategory(
      userId
    );
    res.status(200).send(rows);
  },
  saveNewExpense: async function saveNewExpense(req, res) {
    const data = req.body;
    const userId = req.user.id;
    const { error } = expenseValidator(data);
    if (error) throw error;
    data.user_id = userId;
    const expenseData = ExpenseModel.saveNewExpense(data);
    res.status(200).send(expenseData);
  },
  deleteExpense: async function deleteExpense(req, res) {
    const expenseId = req.expense.id;
    const [rows] = await ExpenseModel.deleteExpense(expenseId);
    res.status(200).send(rows);
  },
  deleteAllExpense: async function deleteAllExpense(req, res) {
    const [rows] = await ExpenseModel.deleteAllExpense();
    res.status(200).send(rows);
  },
  updateExpense: async function updateExpense(req, res) {
    const dataToUpdate = req.body;
    const expenseId = req.expense.id;
    const { error } = expenseUpdateValidator(dataToUpdate);
    if (error) throw new Error("no data to update");
    dataToUpdate.expense_id = expenseId;
    const [rows] = await ExpenseModel.updateExpense(dataToUpdate);
    res.status(200).send(rows);
  },
};

export { ExpenseController };
