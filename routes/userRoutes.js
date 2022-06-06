const express = require('express');
const {
  getAllUsers,
  getUser,
  deleteUser,
  getMe,
} = require('./../controllers/userController');
const {
  signup,
  login,
  protect,
  restrictTo,
} = require('./../controllers/authController');

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);

router.route('/').get(getAllUsers);

router.route('/me').get(protect, getMe, getUser);

router
  .route('/:id')
  .get(protect, restrictTo('admin'), getUser)
  .delete(protect, restrictTo('admin'), deleteUser);

module.exports = router;
