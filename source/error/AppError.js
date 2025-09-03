import { BaseError } from "./BaseError.js";

const AppError = Object.create(BaseError);

AppError.setUp = function setUp(message) {
  const name = "AppError";
  const message = message;
  const response = 400;
  this.init(name, message, response);
};
AppError.send = function send(res) {
  return this.sendResponse(res);
};

export { AppError };
