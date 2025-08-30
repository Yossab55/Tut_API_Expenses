import express from "express";
import { UserController } from "../controllers/UserController.js";
import { tryCatchAbstraction } from "../middlewares/TryCatchAbstraction.js";
const UserRouter = express.Router();

UserRouter.post(
  "/",
  tryCatchAbstraction.tryCatchFunctionWrapper(UserController.createUser)
);

export { UserRouter };
