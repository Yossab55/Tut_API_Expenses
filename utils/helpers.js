import "util/promisify";

function env(field) {
  return process.env[field] || null;
}

export { env };

function makeItPromisify(fn) {
  return promisify(fn);
}

export { makeItPromisify };
