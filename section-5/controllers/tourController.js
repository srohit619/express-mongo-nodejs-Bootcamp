const fs = require('fs');
const utility = require('../../utility/func');
const config = utility.readConfig();
// console.log('config' + config);

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

exports.getAllTours = (req, res) => {
    console.log('logFilePath==>', config.logFilePath);
    utility.logger(config.logFilePath, JSON.stringify(tours));
    res.status(200);
    res.json({
        status: 'success',
        results: tours.length,
        data: {
            tours,
        },
    });
};

exports.checkId = (req, res, next, val) => {
    console.log('running only if URL Contains "ID"');
    console.log('id-->', val);
    if (req.params.id * 1 > tours.length) {
        // const id = req.params.id * 1;
        // if (!tour) {
        return res.status(404).json({
            status: 'failed',
            message: 'NO DATA FOUND!',
        });
    }
    next();
};

exports.getTourById = (req, res) => {
    const id = req.params.id * 1;

    const tour = tours.find((el) => el.id === id);
    // console.log('idd_-->', tour);

    res.status(200);
    res.json({
        status: 'success',
        // results:tours.length,
        data: {
            tour,
        },
    });
};

exports.checkPostData = (req, res, next) => {
    const data = req.body;
    console.log('inisde validation function of rpost!');
    if (!data.name || !data.price)
        return res.status(400).json({
            status: 'failed',
            message: 'Missing Request Body!',
        });

    next();
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