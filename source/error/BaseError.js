const BaseError = {
  init: function init(message, name, responseCode) {
    this.message = message || "something went wrong";
    this.name = name || "base Error";
    this.responseCode = responseCode || 400;
    this.stack = new Error().stack;
  },
  createErrorObjectToSend: function createErrorObjectToSend() {
    return {
      name: this.name, // type string
      message: this.message, //type array or strings
    };
  },
  sendResponse: function sendResponse(res) {
    return res.status(this.responseCode).send(this.createErrorObjectToSend);
  },
};

export { BaseError };
