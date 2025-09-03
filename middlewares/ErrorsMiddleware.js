import { ValidationError } from "../source/error/ValidationError.js";
import { MySQLError } from "../source/error/DatabaseErrorIndex.js";
import { AppError } from "../source/error/AppError.js";
import { ServerError } from "../source/error/ServerError.js";
import { NOT_FOUND } from "../utils/constants/ResponseCode.js";

function ErrorHandel(error, req, res, next) {
  console.log("error: ", error);
  //Url is wrong
  if (!error) {
    AppError.setUp("404, page not found", NOT_FOUND);
    return AppError.sendRes(res);
  }
  const errorType = error.name;
  if (errorType == "ValidationError")
    return ValidationError.createErrorAndSend(error, res);

  if (errorType == "AppError") return error.sendRes(res);

  //it's MySQLError
  if (Object.hasOwn(error, "errno") && Object.hasOwn(error, "sqlState"))
    return MySQLError.createErrorAndSend(res, error);

  ServerError.createErrorAndSend(res);
}

export { ErrorHandel };
