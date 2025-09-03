import express from "express";
import { ExpenseController } from "../controllers/ExpenseController.js";
import { tryCatchFunction } from "../middlewares/TryCatchAbstraction.js";
import { requiredAuth } from "../middlewares/AuthMiddlewares.js";

const ExpenseRouter = express.Router();
ExpenseRouter.get(
  "",
  tryCatchFunction(requiredAuth),
  tryCatchFunction(ExpenseController.getExpense)
);

ExpenseRouter.post(
  "",
  tryCatchFunction(requiredAuth),
  tryCatchFunction(ExpenseController.saveNewExpense)
);

ExpenseRouter.delete(
  "/:expenseId",
  tryCatchFunction(requiredAuth),
  tryCatchFunction(ExpenseController.deleteExpense)
);

ExpenseRouter.delete(
  "",
  tryCatchFunction(requiredAuth),
  tryCatchFunction(ExpenseController.deleteAllExpense)
);

ExpenseRouter.patch(
  "/:expenseId",
  tryCatchFunction(requiredAuth),
  tryCatchFunction(ExpenseController.updateExpense)
);

export { ExpenseRouter };
