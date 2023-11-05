const express = require('express');
const tourRouter = require('./routes/tourRouter');
const app = express();
const userRouter = require('./routes/userRouter');
//Midlleware morgan
const morgan = require('morgan');

//MIDDLEWARE
app.use(express.json());
app.use(morgan('dev'));



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