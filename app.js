const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const wineRouter = require('./routes/winesCategoryRoutes');
const userRouter = require('./routes/userRoutes');
const winesCategoryRouter = require('./routes/winesCategoryRoutes');

const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Security HTTP Headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitazation against NoSQL query injection
app.use(mongoSanitize());

// Data sanitazation against XSS
app.use(xss());

// Prevent parameter polution
app.use(hpp());

// Routes
app.use('/api/v1/wines', wineRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', winesCategoryRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Não é possível encontrar ${req.originalUrl} neste servidor!`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
