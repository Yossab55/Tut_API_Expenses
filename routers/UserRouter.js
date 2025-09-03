import express from "express";
import { UserController } from "../controllers/UserController.js";
import { tryCatchFunction } from "../middlewares/TryCatchAbstraction.js";
const UserRouter = express.Router();

//@ to delete account
UserRouter.delete("", tryCatchFunction(UserController.deleteUser));
UserRouter.patch("", tryCatchFunction(UserController.updateUser));

export { UserRouter };
