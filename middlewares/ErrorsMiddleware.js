import { ValidationError } from "../source/error/ValidationError.js";
import { MySQLError } from "../source/error/DatabaseErrorIndex.js";
import { ServerError } from "../source/error/ServerError.js";

function ErrorHandel(error, req, res, next) {
  console.log("error: ", error);
  const errorType = error.name;
  if (errorType == "ValidationError")
    return ValidationError.createErrorAndSend(error, res);

  if (errorType == "AppError") return error.send(res);

  //it's MySQLError
  if (Object.hasOwn(error, "errno") && Object.hasOwn(error, "sqlState"))
    return MySQLError.createErrorAndSend(res, error);

  ServerError.createErrorAndSend(res);
}

export { ErrorHandel };
