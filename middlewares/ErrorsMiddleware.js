function ErrorHandel(error, req, res, next) {
  console.log("error: ", error);
  // console.log("error message: ", error.message);
  // console.log("error code: ", error.code);
  // console.log("error errno: ", error.errno);
  res.status(400).send(error);
}

export { ErrorHandel };
