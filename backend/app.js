const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');


//Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
/* app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
}); */
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);



app.all('*', (req, res, next) => {
  next(new AppError(`Can't fins ${req.originalUrl} on this server!`, 404))
});



app.use(globalErrorHandler);
module.exports = app;
