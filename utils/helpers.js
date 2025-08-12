import util from "util";

function env(field) {
  return process.env[field] || null;
}

export { env };

function makeItPromisify(fn) {
  return util.promisify(fn);
}

export { makeItPromisify };
