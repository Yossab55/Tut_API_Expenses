import { MySQLManager } from "../source/database/MySQLManager.js";

const ExpenseModel = Object.create(MySQLManager);
const expenseFields = [
  "expense_category",
  "expense_amount",
  "expense_date",
  "user_id",
];
const tableName = "Expenses";
// req.user.id

//@ create
ExpenseModel.saveNewExpenses = async function saveNewExpenses(value) {
  //todo add to values user id in the controller
  this.initial(tableName, expenseFields);
  const { expense_category, expense_amount, expense_date, user_id } = value;
  value = {
    expense_category,
    expense_amount,
    expense_date,
    user_id,
  };
  const results = await this.insert(value);
  return results;
};

//@ Read
ExpenseModel.getTodayExpenses = async function getTodayExpenses(id) {
  const [rows] = await this.todayExpenses(id);
  return rows;
};

ExpenseModel.getLastPeriodExpenses = async function getLastPeriodExpenses(
  userId,
  lastPeriod
) {
  const filters = [
    "user_id",
    "=",
    userId,
    "AND",
    "expense_date",
    "BETWEEN",
    `'${lastPeriod}'`,
    "AND",
    "NOW()",
  ];
  const orderColumns = ["expense_date"];
  this.initial(tableName, expenseFields, filters, orderColumns);
  const [results] = await this.selectWithOrderBy();
  return results;
};

ExpenseModel.getLastPeriodExpensesGroupByCategories =
  async function getLastPeriodExpensesGroupByCategories(userId, lastPeriod) {
    const filters = [
      "user_id",
      "=",
      userId,
      "AND",
      "expense_date",
      "BETWEEN",
      `'${lastPeriod}'`,
      "AND",
      "NOW()",
    ];
    const orderColumns = ["expense_date"];
    const groupBy = ["expense_category"];
    this.initial(tableName, expenseFields, filters, orderColumns, groupBy);
    const [results] = await this.customQuery("select", "orderBy", "groupBy");
    return results;
  };

ExpenseModel.todayTotalAmountGroupByCategory =
  async function todayTotalAmountGroupByCategory(userId) {
    const filters = [
      "user_id",
      "=",
      userId,
      "AND",
      "expense_date",
      "=",
      "NOW()",
    ];
    const groupBy = ["expense_category"];
    this.initial(tableName, expenseFields, filters, null, groupBy);
    const [results] = await this.customQuery("select", "groupBy");
    return results;
  };

//@ delete
ExpenseModel.deleteExpense = async function deleteExpense(expense_id) {
  const filters = ["expense_id", "=", expense_id];
  this.initial(tableName, null, filters);
  const [results] = await this.deleteOne();
  return results;
};

ExpenseModel.deleteAllExpense = async function deleteExpense() {
  this.initial(tableName);
  const [results] = await this.deleteAll();
  return results;
};

// @update
ExpenseModel.updateExpense = async function updateExpense(dataToUpdate) {
  const {
    expense_category,
    expense_amount,
    expense_date,
    user_id,
    expense_id,
  } = dataToUpdate;
  const fieldsToChick = [
    expense_category,
    expense_amount,
    expense_date,
    user_id,
  ];
  const fields = fieldsToChickUndefined(fieldsToChick);
  const filters = ["expense_id", "=", expense_id];
  this.initial("Expense", fields, filters);
  const [results] = await this.update(fields);
  return fields;
};

export { ExpenseModel };
