import express from "express";
import { UserController } from "../controllers/UserController.js";
import { tryCatchFunctionWrapper } from "../middlewares/TryCatchAbstraction.js";
const UserRouter = express.Router();

UserRouter.delete("", tryCatchFunctionWrapper(UserController.deleteUser));
UserRouter.patch("", tryCatchFunctionWrapper(UserController.updateUser));

export { UserRouter };
