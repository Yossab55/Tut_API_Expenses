import { BaseError } from "./BaseError.js";

const ServerError = Object.create(BaseError);

ServerError.createErrorAndSend = function createErrorAndSend(res) {
  const message = "500 server down, please try later";
  const name = "server down";
  this.init(message, name, 500);
  return this.sendResponse(res);
};

export { ServerError };
