const express = require('express');
const fs = require('fs');

const users = JSON.parse(fs.readFileSync('./dev-data/data/users.json'));
const router = express.Router();

const getAllUsers = (req, res) => {
  res.status(200);
  res.json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};

const getUserByRole = (req, res) => {
  const role = req.params.role;
  console.log('role-->' + role);

  const user = users.find((el) => el.role === role);
  console.log('user-->' + user);
  if (!user) {
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
      user,
    },
  });
};

router.route('/').get(getAllUsers);
router.route('/:role').get(getUserByRole);

module.exports = router;
