const express = require('express');
const morgan = require('morgan');

const app = express();
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

console.log('node_env->' + process.env.NODE_ENV);
//Midlleware morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// console.log('process.env.NODE_ENV-->' + process.env.NODE_ENV);

//MIDDLEWARE
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// console.log(process.env);

//USING EXPRESS ROUTERS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const myMiddleware = (req, res, next) => {
  console.log('requestbody-->' + JSON.stringify(req.body));
  console.log('Middleware ---> 01');
  next();
};

// app.use(myMiddleware);

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTourById);
// app.post('/api/v1/tours', addNewTour);

//STARTING SERVER & LISTENING TO PORT IS NOW EXPORTED TO SERVER.JS FILE
module.exports = app;
