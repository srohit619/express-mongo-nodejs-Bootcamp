const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

//param function check the specific value and has a extra parameter like next()
router.param('id', tourController.checkId);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkPostData, tourController.addNewTour);

router.route('/:id').get(tourController.getTourById);

module.exports = router;