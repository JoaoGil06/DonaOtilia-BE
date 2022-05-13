class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.message = message;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperation = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
