import { BaseError } from "./BaseError.js";
import { BAD_REQUEST } from "../../utils/constants/ResponseCode.js";

const AppError = Object.create(BaseError);

AppError.setUp = function setUp(message, responseCode) {
  const name = "AppError";
  const errorMessage = message;
  const resCode = responseCode || BAD_REQUEST;
  this.init(name, errorMessage, resCode);
};
AppError.sendRes = function sendRes(res) {
  return this.sendResponse(res);
};

export { AppError };
