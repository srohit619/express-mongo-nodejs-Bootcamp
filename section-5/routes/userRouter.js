const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

router.route('/').get(userController.getAllUsers);
router.route('/:role').get(userController.getUserByRole);

module.exports = router;
