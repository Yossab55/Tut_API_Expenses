const tryCatchAbstraction = {
  tryCatchAbstractBlock: function tryCatchAbstractBlock(fn, next, ...args) {
    try {
      fn.call(null, args);
      return next();
    } catch (error) {
      return next(error);
    }
  },
};

export { tryCatchAbstraction };
