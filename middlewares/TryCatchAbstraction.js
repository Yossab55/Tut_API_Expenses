const tryCatchAbstraction = {
  tryCatchBlockWrapper: function tryCatchBlockWrapper(fn, next, ...args) {
    try {
      fn.call(null, args);
      return next();
    } catch (error) {
      return next(error);
    }
  },
  tryCatchFunctionWrapper: function tryCatchFunctionWrapper(callback) {
    return async function controllerWrapper(req, res, next) {
      try {
        await callback(req, res, next);
      } catch (error) {
        return next(error);
      }
    };
  },
};

export { tryCatchAbstraction };
