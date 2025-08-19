import util from "util";

function env(field) {
  return process.env[field] || null;
}

export { env };

function makeItPromisify(fn) {
  return util.promisify(fn);
}

export { makeItPromisify };

function getCurrentDate() {
  /**
   * because JS date format defers from MySQL date format
   * so I'm modifying it to fit the validation
   */
  const date = new Date(Date.now());

  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${
    date.toTimeString().split(" ")[0]
  }`;
}

export { getCurrentDate };
