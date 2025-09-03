import { BaseError } from "./BaseError.js";
import { BAD_REQUEST } from "../../utils/constants/ResponseCode.js";

function AppError(message, responseCode = BAD_REQUEST) {
  const error = Object.create(BaseError);
  error.init("AppError", message, responseCode);
  return error;
}

export { AppError };
