const AppError = require('./../utils/appError');

const handleValidationErrorDB = (error) => {
  const errors = Object.values(error.errors).map((err) => err.message);

  const message = `Duplicate field value: ${errors.join(
    '. '
  )}. Please use antoher value!`;

  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = (error) =>
  new AppError('Your token has expired. Please log in again!', 401);

const handleDuplicateFieldsDB = (error) => {
  const value = error.errmsg.match(/(["'])(\\?.)*?\1/);

  const message = `Duplicate field value: ${value}. Please use antoher value!`;

  return new AppError(message, 400);
};

const handleCastErrorDB = (error) => {
  const message = `Invalid ${error.path}: ${error.value}`;

  return new AppError(message, 400);
};

const sendErrorDev = (error, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(error.statusCode).json({
      status: error.status,
      error,
      message: error.message,
      stack: error.stack,
    });
  } else {
    // RENDERED WEBSITE
    return res.status(error.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: error.message,
    });
  }
};

const sendErrorProd = (error, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    if (error.isOperational) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  } else {
    // RENDERED WEBSITE
    if (error.isOperational) {
      return res.status(error.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: error.message,
      });
    }
    return res.status(error.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: 'Please try again later.',
    });
  }
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let err = { ...error };

    if (error.name === 'CastError') err = handleCastErrorDB(err);
    if (error.code === 11000) err = handleDuplicateFieldsDB(err);
    if (error.name === 'ValidationError') err = handleValidationErrorDB(err);
    if (error.name === 'JsonWebTokenError') err = handleJWTError(error);
    if (error.name === 'TokenExpiredError') err = handleJWTExpiredError(error);

    sendErrorProd(error, req, res);
  }
};
