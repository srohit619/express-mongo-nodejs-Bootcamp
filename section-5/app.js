const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');

const port = 8000;
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

//MIDDLEWARE
app.use(express.json());
app.use(morgan('dev'));

const myMiddleware = (req, res, next) => {
  console.log('requestbody-->' + JSON.stringify(req.body));
  console.log('Middleware ---> 01');
  next();
};

app.use(myMiddleware);

const getAllTours = (req, res) => {
  res.status(200);
  res.json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTourById = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'NO DATA FOUND!',
    });
  }

  res.status(200);
  res.json({
    status: 'success',
    // results:tours.length,
    data: {
      tour,
    },
  });
};

const addNewTour = (req, res) => {
  console.log('Inside Post Request');
  console.log('req.body-->' + JSON.stringify(req.body));

  const newId = tours[tours.length - 1].id + 1;
  console.log('tours--newId>' + newId);
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err, data) => {
      // res.status(201)
      res.json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
};

app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTourById);
app.post('/api/v1/tours', addNewTour);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
