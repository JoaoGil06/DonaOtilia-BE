const express = require('express');

const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const wineRouter = require('./routes/wineRoutes');
const userRouter = require('./routes/userRoutes');
const winesCategoryRouter = require('./routes/winesCategoryRoutes');
const brandRouter = require('./routes/brandRoutes');
const cocktailRouter = require('./routes/cocktailRoutes');
const awardRouter = require('./routes/awardRoutes');
const galleryImageRouter = require('./routes/galleryImageRoutes');
const footerRouter = require('./routes/footerRoutes');

//Pages
const homePageRouter = require('./routes/pages/homePageRoutes');
const winesCategoryPageRouter = require('./routes/pages/winesCategoryPageRoutes');
const galleryPageRouter = require('./routes/pages/galleryPageRoutes');
const awardsPageRouter = require('./routes/pages/awardsPageRoute');
const cocktailsPageRouter = require('./routes/pages/cocktailsPageRoute');

const app = express();

// Security HTTP Headers
app.use(helmet());

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

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

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
app.use('/api/v1/brands', brandRouter);
app.use('/api/v1/cocktails', cocktailRouter);
app.use('/api/v1/awards', awardRouter);
app.use('/api/v1/galleryImage', galleryImageRouter);
app.use('/api/v1/footer', footerRouter);

// Pages
app.use('/api/v1/homePage', homePageRouter);
app.use('/api/v1/winesCategoryPage', winesCategoryPageRouter);
app.use('/api/v1/galleryPage', galleryPageRouter);
app.use('/api/v1/awardsPage', awardsPageRouter);
app.use('/api/v1/cocktailsPage', cocktailsPageRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
