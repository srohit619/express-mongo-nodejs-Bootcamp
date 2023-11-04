const fs = require('fs');

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

exports.getAllTours = (req, res) => {
  res.status(200);
  res.json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTourById = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);
  console.log('idd_-->', tour);
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

exports.addNewTour = (req, res) => {
  console.log('Inside Post Request');
  console.log('req.body-->' + JSON.stringify(req.body));

  const newId = tours[tours.length - 1].id + 1;
  console.log('tours--newId>' + newId);
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    '../dev-data/data/tours-simple.json',
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
